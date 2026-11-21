// algebraSolver.js — Motor algébrico passo-a-passo para o Conversor Universal
// Usa math.js (já carregado como global `math`) para parsing e manipulação de AST.

class AlgebraSolver {
    constructor() {
        // Constantes físicas (espelha FormulaEngine)
        this.constants = {
            g: 9.8,
            G: 6.674e-11,
            c: 3.00e8,
            e: 1.602e-19,
            ke: 8.99e9,
            Rg: 8.314,
            kB: 1.381e-23,
            h: 6.626e-34,
            eps0: 8.854e-12,
            mu0: 1.257e-6,
            sigma: 5.670e-8,
            I0: 1e-12
        };

        // Nomes legíveis das constantes em português
        this.constantNames = {
            g: 'g (aceleração da gravidade)',
            G: 'G (constante gravitacional)',
            c: 'c (velocidade da luz)',
            e: 'e (carga elementar)',
            ke: 'k_e (constante de Coulomb)',
            Rg: 'R (constante dos gases)',
            kB: 'k_B (constante de Boltzmann)',
            h: 'h (constante de Planck)',
            eps0: 'ε₀ (permissividade do vácuo)',
            mu0: 'μ₀ (permeabilidade do vácuo)',
            sigma: 'σ (Stefan-Boltzmann)',
            I0: 'I₀ (intensidade de referência)'
        };

        // Funções que não podemos resolver algebricamente (por enquanto)
        this.unsupportedFunctions = [
            'sin', 'cos', 'tan', 'asin', 'acos', 'atan',
            'log', 'log2', 'log10', 'ln',
            'exp', 'abs',
            'polyval', 'sum_inv'
        ];
    }

    // =========================================================================
    // PUBLIC API
    // =========================================================================

    /**
     * Resolve uma fórmula passo-a-passo.
     * @param {object} formula - Objeto completo da fórmula do catálogo
     * @param {string} targetVar - Variável a isolar
     * @param {object} inputs - { varName: { value: number, unit: string } }
     * @returns {{
     *   steps: Array<{stepNumber: number, operation: string, description: string, latexBefore: string, latexAfter: string}>,
     *   result: { value: number, unit: string },
     *   originalLatex: string,
     *   rearrangedLatex: string,
     *   success: boolean,
     *   error: string|null
     * }}
     */
    solve(formula, targetVar, inputs, targetUnit = null) {
        try {
            // — Validação —
            const validationError = this._validate(formula, targetVar, inputs);
            if (validationError) {
                return this._errorResult(validationError);
            }

            // — Identificar equação original e expressão alvo —
            const compKeys = Object.keys(formula.computable);
            const originalVar = compKeys[0]; // LHS da equação original
            const originalExpr = formula.computable[originalVar]; // RHS da equação original
            const targetExpr = formula.computable[targetVar]; // expressão rearranjada

            if (!targetExpr) {
                return this._errorResult(`Não é possível calcular "${targetVar}" nesta fórmula.`);
            }

            // LaTeX original (da fórmula)
            const originalLatex = this._cleanLatex(formula.latex || (this._varToLatex(originalVar) + ' = ' + this._nodeToLatex(math.parse(originalExpr))));

            // LaTeX rearranjada
            let rearrangedLatex;
            if (formula.latex_rearranged && formula.latex_rearranged[targetVar]) {
                rearrangedLatex = this._cleanLatex(formula.latex_rearranged[targetVar]);
            } else {
                rearrangedLatex = this._cleanLatex(this._varToLatex(targetVar) + ' = ' + this._nodeToLatex(math.parse(targetExpr)));
            }

            // — Se target é a própria variável original, passos triviais —
            const steps = [];
            if (targetVar === originalVar) {
                steps.push({
                    stepNumber: 1,
                    operation: 'original_formula',
                    description: 'Partimos da fórmula original — a variável desejada já está isolada.',
                    latexBefore: originalLatex,
                    latexAfter: originalLatex
                });
            } else {
                // — Derivação algébrica passo-a-passo —
                const derivationSteps = this._deriveSteps(formula, originalVar, originalExpr, targetVar);
                steps.push(...derivationSteps);
            }

            // — Conversão de unidades de entrada para SI (se houver unidades não-SI inseridas) —
            const unitConvParts = [];
            for (const [vName, data] of Object.entries(inputs)) {
                if (data && data.rawUnit && data.unit && data.rawUnit !== data.unit && data.rawValue !== undefined) {
                    unitConvParts.push(`${this._varToLatex(vName)} = ${this._formatNumber(data.rawValue)}\\;${this._unitToLatex(data.rawUnit)} = ${this._formatNumber(data.value)}\\;${this._unitToLatex(data.unit)}`);
                }
            }
            if (unitConvParts.length > 0) {
                const convLatex = unitConvParts.join(', \\quad ');
                steps.push({
                    stepNumber: steps.length + 1,
                    operation: 'convert_units_si',
                    description: 'Convertemos os valores inseridos para o Sistema Internacional (SI):',
                    latexBefore: '',
                    latexAfter: convLatex
                });
            }

            // — Substituição numérica —
            const scope = this._buildScope(formula, inputs);
            const substitutionSteps = this._buildSubstitutionSteps(
                formula, targetVar, targetExpr, inputs, scope, steps.length
            );
            steps.push(...substitutionSteps);

            // — Cálculo numérico —
            let resultValue;
            try {
                resultValue = math.evaluate(targetExpr, scope);
            } catch (e) {
                return this._errorResult('Erro ao calcular expressão: ' + e.message);
            }

            if (typeof resultValue !== 'number' || !isFinite(resultValue)) {
                if (isNaN(resultValue)) {
                    return this._errorResult('Resultado indefinido (NaN). Verifique os valores de entrada.');
                }
                if (!isFinite(resultValue)) {
                    return this._errorResult('Resultado infinito. Possível divisão por zero.');
                }
            }

            const resultUnit = formula.variables[targetVar] ? formula.variables[targetVar].si_unit : '';
            const unitTex = this._unitToLatex(resultUnit);

            // Step: resultado numérico final em SI
            const lastStep = steps.length + 1;
            steps.push({
                stepNumber: lastStep,
                operation: 'compute_result',
                description: 'Calculamos o resultado numérico.',
                latexBefore: steps[steps.length - 1].latexAfter,
                latexAfter: this._cleanLatex(this._varToLatex(targetVar) + ' = ' +
                    this._formatNumber(resultValue) +
                    (unitTex ? '\\;' + unitTex : ''))
            });

            // Se o usuário selecionou uma unidade de destino diferente da base SI
            let finalValue = resultValue;
            let finalUnit = resultUnit;
            if (targetUnit && targetUnit !== resultUnit && typeof unitSystem !== 'undefined') {
                try {
                    finalValue = unitSystem.fromBaseUnit(resultValue, targetUnit, resultUnit);
                    finalUnit = targetUnit;
                    const finalUnitTex = this._unitToLatex(targetUnit);
                    steps.push({
                        stepNumber: steps.length + 1,
                        operation: 'convert_result_unit',
                        description: `Convertemos o resultado para a unidade selecionada (${targetUnit}):`,
                        latexBefore: steps[steps.length - 1].latexAfter,
                        latexAfter: this._cleanLatex(this._varToLatex(targetVar) + ' = ' +
                            this._formatNumber(finalValue) +
                            (finalUnitTex ? '\\;' + finalUnitTex : ''))
                    });
                } catch (_) {}
            }

            // Sanitiza todos os passos gerados para KaTeX
            steps.forEach(s => {
                if (s.latexBefore) s.latexBefore = this._cleanLatex(s.latexBefore);
                if (s.latexAfter) s.latexAfter = this._cleanLatex(s.latexAfter);
            });

            // — Verificação: plug-back —
            const verifyError = this._verifyResult(formula, originalVar, originalExpr, targetVar, resultValue, inputs, scope);

            // — Validar restrições —
            const constraintError = this._checkConstraints(formula, scope, targetVar, resultValue);

            if (constraintError) {
                return this._errorResult(constraintError);
            }

            return {
                steps,
                result: { value: finalValue, unit: finalUnit, siValue: resultValue, siUnit: resultUnit },
                originalLatex,
                rearrangedLatex,
                success: true,
                error: verifyError // null se tudo certo, aviso se verificação falhou
            };

        } catch (e) {
            return this._errorResult('Erro inesperado: ' + e.message);
        }
    }

    // =========================================================================
    // VALIDATION
    // =========================================================================

    _validate(formula, targetVar, inputs) {
        if (!formula || !formula.computable || !formula.variables) {
            return 'Fórmula inválida ou incompleta.';
        }
        if (!targetVar) {
            return 'Variável alvo não especificada.';
        }
        if (!formula.variables[targetVar]) {
            return `A variável "${targetVar}" não existe nesta fórmula.`;
        }
        if (!formula.computable[targetVar]) {
            return `Não há expressão computável para "${targetVar}" nesta fórmula.`;
        }

        // Verificar se a expressão contém funções não suportadas para derivação
        const expr = formula.computable[targetVar];
        // (Não bloqueia cálculo, apenas derivação — será tratado na derivação)

        // Verificar entradas
        const compKeys = Object.keys(formula.computable);
        const neededVars = Object.keys(formula.variables).filter(v => v !== targetVar);
        for (const v of neededVars) {
            // Constantes não precisam de input
            if (this.constants[v] !== undefined) continue;
            if (!inputs[v] || inputs[v].value === undefined || inputs[v].value === null || inputs[v].value === '') {
                return `Valor de "${formula.variables[v] ? formula.variables[v].name : v}" não fornecido.`;
            }
        }

        return null;
    }

    _checkConstraints(formula, scope, targetVar, resultValue) {
        if (!formula.constraints || formula.constraints.length === 0) return null;
        const fullScope = { ...scope, [targetVar]: resultValue };
        for (const constraint of formula.constraints) {
            try {
                const isValid = math.evaluate(constraint, fullScope);
                if (!isValid) {
                    return `Restrição violada: ${constraint}. O resultado é matematicamente impossível com esses valores.`;
                }
            } catch (e) {
                // Ignora restrições que não puderam ser avaliadas
            }
        }
        return null;
    }

    _verifyResult(formula, originalVar, originalExpr, targetVar, resultValue, inputs, scope) {
        try {
            const verifyScope = { ...scope, [targetVar]: resultValue };
            const computedOriginal = math.evaluate(originalExpr, verifyScope);
            const expectedOriginal = verifyScope[originalVar];

            if (expectedOriginal !== undefined && typeof computedOriginal === 'number' && typeof expectedOriginal === 'number') {
                const relError = Math.abs(computedOriginal - expectedOriginal) / (Math.abs(expectedOriginal) || 1);
                if (relError > 1e-6) {
                    return `Aviso: verificação detectou discrepância (erro relativo: ${(relError * 100).toFixed(4)}%). Resultado pode ser impreciso.`;
                }
            }
        } catch (e) {
            // Verificação não obrigatória
        }
        return null;
    }

    // =========================================================================
    // STEP-BY-STEP DERIVATION ENGINE
    // =========================================================================

    /**
     * Gera os passos algébricos de derivação a partir da equação original.
     * Estratégia: usa a expressão já rearranjada do catálogo e reconstrói os passos.
     */
    _deriveSteps(formula, originalVar, originalExpr, targetVar) {
        const steps = [];
        let stepNum = 0;

        // Parse da expressão original (RHS)
        let rhsNode;
        try {
            rhsNode = math.parse(originalExpr);
        } catch (e) {
            steps.push({
                stepNumber: 1,
                operation: 'original_formula',
                description: 'Partimos da fórmula original.',
                latexBefore: formula.latex || '',
                latexAfter: formula.latex || ''
            });
            return steps;
        }

        // Verificar se targetVar aparece na expressão original
        const varsInExpr = this._collectVariables(rhsNode);
        const targetInOriginalRHS = varsInExpr.has(targetVar);
        const targetIsOriginalLHS = (targetVar === originalVar);

        // Se a variável alvo NÃO aparece na RHS original, tentar via equação completa
        // Equação original: originalVar = originalExpr
        // Se targetVar == originalVar => trivial (já tratado fora)
        // Se targetVar está na RHS => isolar por inversão

        // Passo 1: mostrar equação original
        stepNum++;
        const origLatex = formula.latex || (this._varToLatex(originalVar) + ' = ' + this._nodeToLatex(rhsNode));
        steps.push({
            stepNumber: stepNum,
            operation: 'original_formula',
            description: 'Partimos da fórmula original.',
            latexBefore: origLatex,
            latexAfter: origLatex
        });

        // Verificar funções não suportadas
        if (this._hasUnsupportedFunction(rhsNode)) {
            // Não conseguimos derivar passo-a-passo, mas temos a expressão rearranjada
            stepNum++;
            const rearrangedLatex = this._getRearrangedLatex(formula, targetVar);
            steps.push({
                stepNumber: stepNum,
                operation: 'algebraic_rearrangement',
                description: 'Rearranjamos algebricamente para isolar $' + this._varToLatex(targetVar) + '$.',
                latexBefore: origLatex,
                latexAfter: rearrangedLatex
            });
            return steps;
        }

        // Se targetVar aparece múltiplas vezes na RHS
        const occurrences = this._countOccurrences(rhsNode, targetVar);
        if (occurrences > 1) {
            stepNum++;
            const rearrangedLatex = this._getRearrangedLatex(formula, targetVar);
            steps.push({
                stepNumber: stepNum,
                operation: 'algebraic_rearrangement',
                description: `A variável $${this._varToLatex(targetVar)}$ aparece múltiplas vezes. Rearranjamos algebricamente.`,
                latexBefore: origLatex,
                latexAfter: rearrangedLatex
            });
            return steps;
        }

        // Derivação passo-a-passo: isolar targetVar da equação originalVar = originalExpr
        // lhs = originalVar, rhs = rhsNode contendo targetVar
        if (targetInOriginalRHS) {
            const derivedSteps = this._isolateVariable(originalVar, rhsNode, targetVar, stepNum);
            steps.push(...derivedSteps);
        } else {
            // targetVar não está na expressão (caso raro — talvez esteja implícita ou é a própria LHS)
            stepNum++;
            const rearrangedLatex = this._getRearrangedLatex(formula, targetVar);
            steps.push({
                stepNumber: stepNum,
                operation: 'algebraic_rearrangement',
                description: 'Rearranjamos a equação para isolar $' + this._varToLatex(targetVar) + '$.',
                latexBefore: origLatex,
                latexAfter: rearrangedLatex
            });
        }

        return steps;
    }

    /**
     * Isola `targetVar` da equação `lhsVar = rhsNode` passo-a-passo.
     * Retorna array de step objects.
     *
     * Estratégia: enquanto rhs não for apenas targetVar,
     * identificar a operação mais externa envolvendo targetVar e aplicar a inversa.
     */
    _isolateVariable(lhsVar, rhsNode, targetVar, startStep) {
        const steps = [];
        let stepNum = startStep;

        // Estado atual: lhs = rhs (como nodes)
        let lhs = math.parse(lhsVar); // SymbolNode
        let rhs = rhsNode;

        // Limite de iterações para evitar loop infinito
        const MAX_ITERATIONS = 20;
        let iterations = 0;

        while (iterations < MAX_ITERATIONS) {
            iterations++;

            // Verificar se rhs já é o targetVar
            if (this._isSymbol(rhs, targetVar)) {
                break; // Pronto!
            }

            // Identificar a operação mais externa que envolve targetVar
            const action = this._identifyAction(rhs, targetVar);

            if (!action) {
                // Não conseguimos mais isolar — usar fallback
                stepNum++;
                const rearrangedLatex = this._varToLatex(targetVar) + ' = ' + this._nodeToLatex(lhs);
                steps.push({
                    stepNumber: stepNum,
                    operation: 'algebraic_rearrangement',
                    description: 'Rearranjamos para isolar $' + this._varToLatex(targetVar) + '$.',
                    latexBefore: this._nodeToLatex(lhs) + ' = ' + this._nodeToLatex(rhs),
                    latexAfter: rearrangedLatex
                });
                break;
            }

            // Aplicar a ação inversa
            const latexBefore = this._nodeToLatex(lhs) + ' = ' + this._nodeToLatex(rhs);
            const result = this._applyInverse(lhs, rhs, action, targetVar);
            lhs = result.newLhs;
            rhs = result.newRhs;
            const latexAfter = this._nodeToLatex(lhs) + ' = ' + this._nodeToLatex(rhs);

            stepNum++;
            steps.push({
                stepNumber: stepNum,
                operation: action.operation,
                description: action.description,
                latexBefore,
                latexAfter
            });
        }

        // Se rhs == targetVar mas lhs != targetVar, inverter a equação
        if (this._isSymbol(rhs, targetVar) && !this._isSymbol(lhs, targetVar)) {
            const latexBefore = this._nodeToLatex(lhs) + ' = ' + this._nodeToLatex(rhs);
            // Inverter: targetVar = lhs
            const temp = lhs;
            lhs = rhs;
            rhs = temp;
            const latexAfter = this._nodeToLatex(lhs) + ' = ' + this._nodeToLatex(rhs);

            stepNum++;
            steps.push({
                stepNumber: stepNum,
                operation: 'swap_sides',
                description: 'Invertemos os lados da equação.',
                latexBefore,
                latexAfter
            });
        }

        return steps;
    }

    /**
     * Identifica a operação mais externa na árvore que contém targetVar.
     * Retorna um objeto de ação { operation, description, ... } ou null.
     */
    _identifyAction(node, targetVar) {
        if (!node) return null;

        // OperatorNode: +, -, *, /, ^
        if (node.type === 'OperatorNode') {
            const op = node.op;
            const args = node.args;

            if (op === '+' && args.length === 2) {
                // a + b: se targetVar está em um dos lados
                const inLeft = this._containsVar(args[0], targetVar);
                const inRight = this._containsVar(args[1], targetVar);

                if (inLeft && !inRight) {
                    return {
                        operation: 'subtract_both_sides',
                        description: 'Subtraímos $' + this._nodeToLatex(args[1]) + '$ de ambos os lados.',
                        type: 'add',
                        side: 'left', // targetVar está à esquerda
                        otherNode: args[1],
                        targetSideNode: args[0]
                    };
                }
                if (inRight && !inLeft) {
                    return {
                        operation: 'subtract_both_sides',
                        description: 'Subtraímos $' + this._nodeToLatex(args[0]) + '$ de ambos os lados.',
                        type: 'add',
                        side: 'right',
                        otherNode: args[0],
                        targetSideNode: args[1]
                    };
                }
            }

            if (op === '-' && args.length === 2) {
                const inLeft = this._containsVar(args[0], targetVar);
                const inRight = this._containsVar(args[1], targetVar);

                if (inLeft && !inRight) {
                    // a - b, target em a: somar b de ambos os lados
                    return {
                        operation: 'add_both_sides',
                        description: 'Somamos $' + this._nodeToLatex(args[1]) + '$ a ambos os lados.',
                        type: 'sub_left',
                        otherNode: args[1],
                        targetSideNode: args[0]
                    };
                }
                if (inRight && !inLeft) {
                    // a - target: somar target, subtrair lhs
                    // a - x = lhs => -x = lhs - a => x = a - lhs
                    return {
                        operation: 'isolate_subtracted_variable',
                        description: 'Isolamos $' + this._varToLatex(targetVar) + '$ que está sendo subtraída.',
                        type: 'sub_right',
                        otherNode: args[0],
                        targetSideNode: args[1]
                    };
                }
            }

            // Unary minus: -x
            if (op === '-' && args.length === 1) {
                if (this._containsVar(args[0], targetVar)) {
                    return {
                        operation: 'multiply_both_sides_neg1',
                        description: 'Multiplicamos ambos os lados por -1.',
                        type: 'unary_minus',
                        targetSideNode: args[0]
                    };
                }
            }

            if (op === '*' && args.length === 2) {
                const inLeft = this._containsVar(args[0], targetVar);
                const inRight = this._containsVar(args[1], targetVar);

                if (inLeft && !inRight) {
                    return {
                        operation: 'divide_both_sides',
                        description: 'Dividimos ambos os lados por $' + this._nodeToLatex(args[1]) + '$.',
                        type: 'mul',
                        side: 'left',
                        otherNode: args[1],
                        targetSideNode: args[0]
                    };
                }
                if (inRight && !inLeft) {
                    return {
                        operation: 'divide_both_sides',
                        description: 'Dividimos ambos os lados por $' + this._nodeToLatex(args[0]) + '$.',
                        type: 'mul',
                        side: 'right',
                        otherNode: args[0],
                        targetSideNode: args[1]
                    };
                }
            }

            if (op === '/' && args.length === 2) {
                const inLeft = this._containsVar(args[0], targetVar);
                const inRight = this._containsVar(args[1], targetVar);

                if (inLeft && !inRight) {
                    // a / b, target em a: multiplicar ambos os lados por b
                    return {
                        operation: 'multiply_both_sides',
                        description: 'Multiplicamos ambos os lados por $' + this._nodeToLatex(args[1]) + '$.',
                        type: 'div_numerator',
                        otherNode: args[1],
                        targetSideNode: args[0]
                    };
                }
                if (inRight && !inLeft) {
                    // a / x: variável no denominador
                    // a / x = lhs => a = lhs * x => x = a / lhs
                    return {
                        operation: 'variable_in_denominator',
                        description: 'A variável $' + this._varToLatex(targetVar) + '$ está no denominador. Multiplicamos ambos os lados por $' + this._nodeToLatex(args[1]) + '$.',
                        type: 'div_denominator',
                        numeratorNode: args[0],
                        targetSideNode: args[1]
                    };
                }
            }

            if (op === '^' && args.length === 2) {
                const inBase = this._containsVar(args[0], targetVar);
                const inExponent = this._containsVar(args[1], targetVar);

                if (inBase && !inExponent) {
                    // x^n: extrair raiz n-ésima
                    const exponent = args[1];
                    let expStr;
                    try {
                        expStr = exponent.toString();
                    } catch (_) {
                        expStr = 'n';
                    }

                    // Verificar se é quadrado (n=2)
                    const expValue = this._getConstantValue(exponent);
                    if (expValue === 2) {
                        return {
                            operation: 'take_sqrt',
                            description: 'Extraímos a raiz quadrada de ambos os lados.',
                            type: 'power',
                            exponentNode: exponent,
                            targetSideNode: args[0]
                        };
                    } else if (expValue === 3) {
                        return {
                            operation: 'take_cbrt',
                            description: 'Extraímos a raiz cúbica de ambos os lados.',
                            type: 'power',
                            exponentNode: exponent,
                            targetSideNode: args[0]
                        };
                    } else {
                        return {
                            operation: 'take_nth_root',
                            description: 'Extraímos a raiz de expoente ' + expStr + ' de ambos os lados.',
                            type: 'power',
                            exponentNode: exponent,
                            targetSideNode: args[0]
                        };
                    }
                }
                if (inExponent && !inBase) {
                    // b^x: logaritmo — não suportado atualmente
                    return null;
                }
            }
        }

        // FunctionNode: sqrt(), cbrt(), abs(), etc.
        if (node.type === 'FunctionNode') {
            const fnName = node.fn.name || node.fn;
            const fnArgs = node.args;

            if (fnName === 'sqrt' && fnArgs.length === 1 && this._containsVar(fnArgs[0], targetVar)) {
                return {
                    operation: 'square_both_sides',
                    description: 'Elevamos ambos os lados ao quadrado para eliminar a raiz.',
                    type: 'sqrt',
                    targetSideNode: fnArgs[0]
                };
            }
            if (fnName === 'cbrt' && fnArgs.length === 1 && this._containsVar(fnArgs[0], targetVar)) {
                return {
                    operation: 'cube_both_sides',
                    description: 'Elevamos ambos os lados ao cubo para eliminar a raiz cúbica.',
                    type: 'cbrt',
                    targetSideNode: fnArgs[0]
                };
            }

            // Funções não suportadas
            return null;
        }

        // ParenthesisNode: passthrough
        if (node.type === 'ParenthesisNode') {
            return this._identifyAction(node.content, targetVar);
        }

        return null;
    }

    /**
     * Aplica a operação inversa identificada.
     * Retorna { newLhs, newRhs } como nós AST.
     */
    _applyInverse(lhs, rhs, action, targetVar) {
        switch (action.type) {
            case 'add': {
                // rhs = a + b, target no lado indicado. Subtrair otherNode de ambos.
                const newLhs = new math.OperatorNode('-', 'subtract', [lhs, action.otherNode]);
                const newRhs = action.targetSideNode;
                return { newLhs, newRhs };
            }

            case 'sub_left': {
                // rhs = target_side - other. Somar other a ambos.
                const newLhs = new math.OperatorNode('+', 'add', [lhs, action.otherNode]);
                const newRhs = action.targetSideNode;
                return { newLhs, newRhs };
            }

            case 'sub_right': {
                // rhs = other - target_side.
                // lhs = other - target => target = other - lhs
                const newLhs = new math.OperatorNode('-', 'subtract', [action.otherNode, lhs]);
                const newRhs = action.targetSideNode;
                return { newLhs, newRhs };
            }

            case 'unary_minus': {
                // rhs = -target_side. Multiplicar ambos por -1.
                const neg1 = new math.ConstantNode(-1);
                const newLhs = new math.OperatorNode('*', 'multiply', [neg1, lhs]);
                const newRhs = action.targetSideNode;
                return { newLhs, newRhs };
            }

            case 'mul': {
                // rhs = a * b. Dividir ambos por otherNode.
                const newLhs = new math.OperatorNode('/', 'divide', [lhs, action.otherNode]);
                const newRhs = action.targetSideNode;
                return { newLhs, newRhs };
            }

            case 'div_numerator': {
                // rhs = target_side / other. Multiplicar ambos por other.
                const newLhs = new math.OperatorNode('*', 'multiply', [lhs, action.otherNode]);
                const newRhs = action.targetSideNode;
                return { newLhs, newRhs };
            }

            case 'div_denominator': {
                // rhs = numerator / target_side. Variável no denominador.
                // lhs = num / target => lhs * target = num => target = num / lhs
                const newLhs = new math.OperatorNode('/', 'divide', [action.numeratorNode, lhs]);
                const newRhs = action.targetSideNode;
                return { newLhs, newRhs };
            }

            case 'power': {
                // rhs = target_side^n. Extrair raiz n-ésima.
                const expValue = this._getConstantValue(action.exponentNode);
                let newLhs;
                if (expValue === 2) {
                    newLhs = new math.FunctionNode(
                        new math.SymbolNode('sqrt'), [lhs]
                    );
                } else if (expValue === 3) {
                    newLhs = new math.FunctionNode(
                        new math.SymbolNode('cbrt'), [lhs]
                    );
                } else {
                    // raiz n-ésima: lhs^(1/n)
                    const reciprocal = new math.OperatorNode('/', 'divide', [
                        new math.ConstantNode(1),
                        action.exponentNode
                    ]);
                    newLhs = new math.OperatorNode('^', 'pow', [lhs, reciprocal]);
                }
                const newRhs = action.targetSideNode;
                return { newLhs, newRhs };
            }

            case 'sqrt': {
                // rhs = sqrt(target_side). Elevar ao quadrado.
                const two = new math.ConstantNode(2);
                const newLhs = new math.OperatorNode('^', 'pow', [lhs, two]);
                const newRhs = action.targetSideNode;
                return { newLhs, newRhs };
            }

            case 'cbrt': {
                // rhs = cbrt(target_side). Elevar ao cubo.
                const three = new math.ConstantNode(3);
                const newLhs = new math.OperatorNode('^', 'pow', [lhs, three]);
                const newRhs = action.targetSideNode;
                return { newLhs, newRhs };
            }

            default:
                return { newLhs: lhs, newRhs: rhs };
        }
    }

    // =========================================================================
    // SUBSTITUTION & NUMERICAL STEPS
    // =========================================================================

    _buildScope(formula, inputs) {
        const scope = { ...this.constants };
        for (const [varName, data] of Object.entries(inputs)) {
            if (formula.variables[varName]) {
                scope[varName] = data.value;
            }
        }
        // Incluir funções auxiliares
        scope.polyval = function (coefs, exps, x) {
            let sum = 0;
            for (let i = 0; i < coefs.length; i++) {
                sum += coefs[i] * Math.pow(x, exps[i]);
            }
            return sum;
        };
        scope.sum_inv = function (arr) {
            return arr.reduce((acc, val) => acc + (1 / val), 0);
        };
        return scope;
    }

    _buildSubstitutionSteps(formula, targetVar, targetExpr, inputs, scope, currentStepCount) {
        const steps = [];
        let stepNum = currentStepCount;

        // Parse the target expression for LaTeX rendering
        let targetNode;
        try {
            targetNode = math.parse(targetExpr);
        } catch (e) {
            return steps;
        }

        const rearrangedLatex = this._varToLatex(targetVar) + ' = ' + this._nodeToLatex(targetNode);

        // Build substitution line
        const substitutionParts = [];
        const inputVarsUsed = {};

        // Collect variables used in the target expression
        const exprVars = this._collectVariables(targetNode);

        for (const varName of exprVars) {
            if (varName === targetVar) continue;
            if (inputs[varName] && inputs[varName].value !== undefined) {
                substitutionParts.push(`${this._varToLatex(varName)} = ${this._formatNumber(inputs[varName].value)}`);
                inputVarsUsed[varName] = inputs[varName].value;
            } else if (this.constants[varName] !== undefined) {
                substitutionParts.push(`${this._varToLatex(varName)} = ${this._formatNumber(this.constants[varName])}`);
            }
        }

        if (substitutionParts.length > 0) {
            // Substituir valores na expressão para mostrar
            let substitutedExpr = targetExpr;
            const subScope = {};

            for (const varName of exprVars) {
                if (varName === targetVar) continue;
                if (inputs[varName] && inputs[varName].value !== undefined) {
                    subScope[varName] = inputs[varName].value;
                } else if (this.constants[varName] !== undefined) {
                    subScope[varName] = this.constants[varName];
                }
            }

            // Gerar LaTeX com valores substituídos
            let substitutedLatex;
            try {
                const substitutedNode = this._substituteValues(targetNode, subScope);
                substitutedLatex = this._varToLatex(targetVar) + ' = ' + this._nodeToLatex(substitutedNode);
            } catch (e) {
                substitutedLatex = rearrangedLatex;
            }

            stepNum++;
            steps.push({
                stepNumber: stepNum,
                operation: 'substitute_values',
                description: 'Substituímos os valores conhecidos na equação:',
                latexBefore: rearrangedLatex,
                latexAfter: substitutedLatex
            });
        }

        return steps;
    }

    /**
     * Substitui variáveis por valores numéricos no nó AST.
     */
    _substituteValues(node, scope) {
        return node.transform(function (n) {
            if (n.type === 'SymbolNode' && scope[n.name] !== undefined) {
                return new math.ConstantNode(scope[n.name]);
            }
            return n;
        });
    }

    // =========================================================================
    // LaTeX GENERATION
    // =========================================================================

    /**
     * Converte um nó AST de math.js para uma string LaTeX limpa.
     */
    _nodeToLatex(node) {
        if (!node) return '';

        try {
            // Usar toTex() do math.js com handler customizado para variáveis
            const self = this;
            let tex = node.toTex({
                parenthesis: 'auto',
                implicit: 'hide',
                handler: (n) => {
                    if (n.type === 'SymbolNode') {
                        return ' ' + self._varToLatex(n.name) + ' ';
                    }
                }
            });

            // Limpar saída do math.js
            tex = this._cleanLatex(tex);

            return tex;
        } catch (e) {
            // Fallback: toString
            return node.toString();
        }
    }

    /**
     * Converte símbolo de unidade para KaTeX profissional sem quebrar sintaxe.
     */
    _unitToLatex(unit) {
        if (!unit) return '';
        if (typeof unitSystem !== 'undefined' && unitSystem.unitToLatex) {
            return unitSystem.unitToLatex(unit);
        }
        if (unit === '%') return '\\%';
        if (unit === 'Ω' || unit === 'ohm') return '\\Omega';
        if (unit === '°' || unit === 'graus' || unit === 'grau') return '{}^\\circ';
        if (unit === '$') return '\\$';

        let s = unit.replace(/Ω/g, '__OMEGA__')
                    .replace(/%/g, '\\%')
                    .replace(/períodos/g, '\\text{períodos}')
                    .replace(/espiras\/m/g, '\\text{espiras/m}');

        const res = s.split('·').map(part => {
            return part.split('/').map((subPart, idx) => {
                const prefix = idx > 0 ? '/' : '';
                const match = subPart.match(/^([a-zA-Z_°\$\\%μ]+)\^?(-?\d+)?$/);
                if (match) {
                    const token = match[1];
                    let base;
                    if (token === '__OMEGA__' || token === 'Ω') {
                        base = '\\Omega';
                    } else if (token.endsWith('__OMEGA__')) {
                        const p = token.slice(0, -9);
                        if (p === 'μ') {
                            base = '\\mu\\Omega';
                        } else if (p.startsWith('μ')) {
                            base = '\\mu\\text{' + p.slice(1) + '}\\Omega';
                        } else {
                            base = '\\text{' + p + '}\\Omega';
                        }
                    } else if (token === '°') {
                        base = '^\\circ';
                    } else if (token === '\\%' || token === '%') {
                        base = '\\%';
                    } else if (token === 'μ') {
                        base = '\\mu';
                    } else if (token.startsWith('μ')) {
                        base = '\\mu\\text{' + token.slice(1) + '}';
                    } else {
                        base = '\\text{' + token + '}';
                    }
                    const exp = match[2] ? '^{' + match[2] + '}' : '';
                    return prefix + base + exp;
                }
                return prefix + '\\text{' + subPart.replace(/\^(\d+)/g, '}^{$1}') + '}';
            }).join('');
        }).join(' \\cdot ');

        return res.replace(/__OMEGA__/g, '\\Omega');
    }

    /**
     * Limpa e melhora a saída LaTeX do math.js, garantindo compatibilidade estrita com KaTeX.
     */
    _cleanLatex(tex) {
        if (!tex) return '';

        // 1. Separar \cdot de qualquer caractere seguinte (evita erros como \cdotv, \cdotB, \cdott)
        tex = tex.replace(/\\cdot([a-zA-Z0-9_\{\\])/g, '\\cdot $1');
        tex = tex.replace(/([a-zA-Z0-9_\}])\\cdot/g, '$1 \\cdot ');

        // 2. Separar comandos de funções e letras gregas de variáveis coladas
        tex = tex.replace(/\\(sin|cos|tan|arcsin|arccos|arctan|sinh|cosh|tanh|ln|log|exp|sqrt|theta|alpha|beta|gamma|delta|epsilon|omega|lambda|mu|pi|rho|sigma|tau|phi|psi|Delta|Phi|Omega|Theta|Lambda)([a-zA-Z0-9])/g, '\\$1 $2');

        // 3. Substituir `~` (usado pelo math.js em toTex) por espaço
        tex = tex.replace(/~/g, ' ');

        // 4. Normalizar espaços
        tex = tex.replace(/\s+/g, ' ').trim();

        // 5. Normalizar espaçamento ao redor de \cdot
        tex = tex.replace(/\s*\\cdot\s*/g, ' \\cdot ');

        return tex;
    }

    /**
     * Converte nome de variável para LaTeX legível e rigoroso.
     */
    _varToLatex(varName) {
        // Mapeamento amplo de variáveis científicas conhecidas
        const latexMap = {
            'dx': '\\Delta x', 'dy': '\\Delta y', 'dz': '\\Delta z', 'dt': '\\Delta t',
            'dv': '\\Delta v', 'dp': '\\Delta p', 'dU': '\\Delta U', 'dE': '\\Delta E',
            'dS': '\\Delta S', 'dV': '\\Delta V', 'dP': '\\Delta P', 'dT': '\\Delta T',
            'dQ': '\\Delta Q', 'dtheta': '\\Delta \\theta', 'dphi': '\\Delta \\Phi',
            'dphiB': '\\Delta \\Phi_B', 'd_total': 'd_{\\text{total}}',
            'v0': 'v_0', 'x0': 'x_0', 'y0': 'y_0', 'z0': 'z_0',
            'v0x': 'v_{0x}', 'v0y': 'v_{0y}', 'vf': 'v_f', 'vi': 'v_i',
            'xi': 'x_i', 'xf': 'x_f', 'yi': 'y_i', 'yf': 'y_f',
            'vm': 'v_m', 'am': 'a_m', 'um': 'u_m', 'vx': 'v_x', 'vy': 'v_y',
            'vA': 'v_A', 'vB': 'v_B', 'xA0': 'x_{A0}', 'xB0': 'x_{B0}',
            'v_rel': 'v_{A/B}', 't_enc': 't_{\\text{enc}}', 'tsub': 't_{\\text{sub}}',
            'Hmax': 'H_{\\max}',
            'Ec': 'E_c', 'Ep': 'E_p', 'Em': 'E_m', 'EL': 'E_L', 'Epg': 'E_{pg}', 'Epe': 'E_{pe}',
            'E_emf': '|\\mathcal{E}|',
            'Fm': 'F_m', 'Fe': 'F_e', 'Fg': 'F_g', 'Fat': 'F_{\\text{at}}', 'Fn': 'F_n',
            'Fcp': 'F_{\\text{cp}}', 'Fr': 'F_r', 'F1': 'F_1', 'F2': 'F_2',
            'Up': 'U_p', 'Us': 'U_s', 'Np': 'N_p', 'Ns': 'N_s', 'Ip': 'I_p', 'Is': 'I_s',
            'Re': 'R_e', 'Ne': 'N_e', 'ne': 'n_e', 'Li': 'L_i', 'phiB': '\\Phi_B',
            'Ppar': 'P_{\\parallel}', 'Pperp': 'P_{\\perp}',
            'Sn': 'S_n', 'Si': 'S_i', 'Ab': 'A_b', 'Al': 'A_l', 'At': 'A_t',
            'eps0': '\\varepsilon_0', 'mu0': '\\mu_0', 'kB': 'k_B', 'ke': 'k_e',
            'Rg': 'R', 'I0': 'I_0', 'rhoe': '\\rho_e',
            'alpha': '\\alpha', 'beta': '\\beta', 'gamma': '\\gamma', 'delta': '\\delta',
            'epsilon': '\\varepsilon', 'theta': '\\theta', 'lambda': '\\lambda',
            'mu': '\\mu', 'pi': '\\pi', 'rho': '\\rho', 'sigma': '\\sigma',
            'tau': '\\tau', 'phi': '\\phi', 'psi': '\\psi', 'omega': '\\omega',
            'theta0': '\\theta_0', 'theta1': '\\theta_1', 'theta2': '\\theta_2', 'thetac': '\\theta_c',
            'omega0': '\\omega_0', 'alpha0': '\\alpha_0', 'lambda_max': '\\lambda_{\\max}'
        };

        if (latexMap[varName]) return latexMap[varName];

        // Se tem underscore, tratar como subscrito
        if (varName.includes('_')) {
            const parts = varName.split('_');
            return parts[0] + '_{' + parts.slice(1).join('\\_') + '}';
        }

        // Variável de uma letra seguida de dígitos (ex: m1, r2, q1, k3)
        let m = varName.match(/^([a-zA-Z])(\d+)$/);
        if (m) return m[1] + '_{' + m[2] + '}';

        // Letra maiúscula seguida de minúsculas (ex: Fm, Ec, Vp, Np)
        m = varName.match(/^([A-Z])([a-z]+)$/);
        if (m) return m[1] + '_{' + m[2] + '}';

        // Letra minúscula seguida de um dígito ou letra (ex: v0, x0, t0, vf, vi)
        m = varName.match(/^([a-z])([0-9a-z])$/);
        if (m) return m[1] + '_{' + m[2] + '}';

        // Variável de uma letra — usar direto
        if (varName.length === 1) return varName;

        // Multicaractere sem mapeamento — usar \text{}
        return '\\text{' + varName + '}';
    }

    /**
     * Formata número para exibição LaTeX.
     */
    _formatNumber(num) {
        if (typeof num !== 'number') return String(num);
        if (!isFinite(num)) return num > 0 ? '+\\infty' : '-\\infty';
        if (isNaN(num)) return '\\text{NaN}';

        // Notação científica para números muito grandes ou muito pequenos
        const absNum = Math.abs(num);
        if (absNum !== 0 && (absNum >= 1e6 || absNum < 1e-3)) {
            const exp = Math.floor(Math.log10(absNum));
            const mantissa = num / Math.pow(10, exp);
            const mantissaStr = this._roundDisplay(mantissa);
            if (exp === 0) return mantissaStr;
            return mantissaStr + ' \\times 10^{' + exp + '}';
        }

        return this._roundDisplay(num);
    }

    /**
     * Arredonda para exibição (até 6 casas significativas).
     */
    _roundDisplay(num) {
        if (Number.isInteger(num)) return String(num);
        // Até 6 decimais significativas
        const str = num.toPrecision(6);
        // Remover zeros à direita
        return parseFloat(str).toString();
    }

    // =========================================================================
    // AST UTILITY FUNCTIONS
    // =========================================================================

    /**
     * Verifica se um nó é um SymbolNode com o nome dado.
     */
    _isSymbol(node, name) {
        if (!node) return false;
        if (node.type === 'SymbolNode') return node.name === name;
        if (node.type === 'ParenthesisNode') return this._isSymbol(node.content, name);
        return false;
    }

    /**
     * Verifica se um nó contém a variável dada.
     */
    _containsVar(node, varName) {
        if (!node) return false;
        if (node.type === 'SymbolNode') return node.name === varName;
        if (node.type === 'ConstantNode') return false;
        if (node.type === 'ParenthesisNode') return this._containsVar(node.content, varName);
        if (node.type === 'OperatorNode' || node.type === 'FunctionNode') {
            return node.args.some(arg => this._containsVar(arg, varName));
        }
        if (node.type === 'AccessorNode') {
            return this._containsVar(node.object, varName);
        }
        // Para ArrayNode, ConditionalNode, etc.
        if (node.args) return node.args.some(arg => this._containsVar(arg, varName));
        return false;
    }

    /**
     * Coleta todas as variáveis (SymbolNode) em um nó.
     */
    _collectVariables(node) {
        const vars = new Set();
        node.traverse(function (n) {
            if (n.type === 'SymbolNode') {
                // Excluir nomes de funções conhecidas do math.js
                const mathFunctions = [
                    'sqrt', 'cbrt', 'abs', 'sin', 'cos', 'tan',
                    'asin', 'acos', 'atan', 'log', 'log2', 'log10', 'ln',
                    'exp', 'ceil', 'floor', 'round', 'sign', 'min', 'max',
                    'pi', 'PI', 'E', 'Infinity',
                    'polyval', 'sum_inv'
                ];
                if (!mathFunctions.includes(n.name)) {
                    vars.add(n.name);
                }
            }
        });
        return vars;
    }

    /**
     * Conta quantas vezes targetVar aparece em node.
     */
    _countOccurrences(node, varName) {
        let count = 0;
        node.traverse(function (n) {
            if (n.type === 'SymbolNode' && n.name === varName) {
                count++;
            }
        });
        return count;
    }

    /**
     * Verifica se o nó contém funções não suportadas para derivação passo-a-passo.
     */
    _hasUnsupportedFunction(node) {
        let found = false;
        node.traverse((n) => {
            if (n.type === 'FunctionNode') {
                const fnName = n.fn.name || n.fn;
                if (this.unsupportedFunctions.includes(fnName) && fnName !== 'sqrt' && fnName !== 'cbrt') {
                    found = true;
                }
            }
        });
        return found;
    }

    /**
     * Extrai o valor constante numérico de um nó, ou null se não for constante.
     */
    _getConstantValue(node) {
        if (!node) return null;
        if (node.type === 'ConstantNode') return node.value;
        if (node.type === 'ParenthesisNode') return this._getConstantValue(node.content);
        // Tentar avaliar
        try {
            const val = node.evaluate();
            if (typeof val === 'number' && isFinite(val)) return val;
        } catch (_) { }
        return null;
    }

    /**
     * Obtém o LaTeX rearranjado do catálogo ou gera um.
     */
    _getRearrangedLatex(formula, targetVar) {
        if (formula.latex_rearranged && formula.latex_rearranged[targetVar]) {
            return formula.latex_rearranged[targetVar];
        }
        // Gerar a partir da expressão computável
        const expr = formula.computable[targetVar];
        if (!expr) return this._varToLatex(targetVar) + ' = \\;?';
        try {
            const node = math.parse(expr);
            return this._varToLatex(targetVar) + ' = ' + this._nodeToLatex(node);
        } catch (e) {
            return this._varToLatex(targetVar) + ' = ' + expr;
        }
    }

    // =========================================================================
    // HELPERS
    // =========================================================================

    _errorResult(message) {
        return {
            steps: [],
            result: { value: null, unit: '' },
            originalLatex: '',
            rearrangedLatex: '',
            success: false,
            error: message
        };
    }
}

// Instância global
const algebraSolver = new AlgebraSolver();
