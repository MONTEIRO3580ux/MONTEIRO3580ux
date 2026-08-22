// formulaEngine.js

class FormulaEngine {
    constructor() {
        this.formulas = [];
    }

    registerFormula(formulaObj) {
        this.formulas.push(formulaObj);
    }

    registerCatalog(catalogArray) {
        catalogArray.forEach(f => this.registerFormula(f));
    }

    getAllFormulas() {
        return this.formulas;
    }

    // Retorna as fórmulas agrupadas por categoria
    getCategories() {
        const catMap = {};
        this.formulas.forEach(f => {
            if (!catMap[f.category]) catMap[f.category] = [];
            catMap[f.category].push(f);
        });
        return catMap;
    }

    calculate(formulaId, inputs, targetVar) {
        const formula = this.formulas.find(f => f.id === formulaId);
        if (!formula) throw new Error("Fórmula não encontrada: " + formulaId);

        const computableExpr = formula.computable[targetVar];
        if (!computableExpr) throw new Error("Não é possível calcular " + targetVar + " nesta fórmula.");

        const scope = {};
        for (const [varName, data] of Object.entries(inputs)) {
            const varDef = formula.variables[varName];
            if (!varDef) continue;
            scope[varName] = data.value; 
        }

        try {
            const result = math.evaluate(computableExpr, scope);
            
            // Adiciona o resultado no scope para validar restrições em conjunto
            scope[targetVar] = result;
            
            if (formula.constraints) {
                for (const constraint of formula.constraints) {
                    const isValid = math.evaluate(constraint, scope);
                    if (!isValid) throw new Error("Matematicamente impossível (Restrição violada: " + constraint + ")");
                }
            }

            return {
                value: result,
                unit: formula.variables[targetVar].si_unit
            };
        } catch (e) {
            throw new Error("Erro no cálculo: " + e.message);
        }
    }

    runLaboratory(knownVars) {
        let changed = true;
        let iteration = 0;
        const maxIterations = 5;
        const discovered = [];

        const state = {};
        for (const [k, v] of Object.entries(knownVars)) {
            state[k] = v.value;
        }

        while (changed && iteration < maxIterations) {
            changed = false;
            iteration++;

            for (const formula of this.formulas) {
                const formulaVarNames = Object.keys(formula.variables);
                const missingVars = formulaVarNames.filter(v => state[v] === undefined);

                if (missingVars.length === 1) {
                    const targetVar = missingVars[0];
                    if (formula.computable[targetVar]) {
                        try {
                            const res = this.calculate(formula.id, knownVars, targetVar);
                            
                            state[targetVar] = res.value;
                            knownVars[targetVar] = {
                                value: res.value,
                                unit: res.unit
                            };

                            discovered.push({
                                formulaName: formula.name,
                                variable: targetVar,
                                variableName: formula.variables[targetVar].name,
                                value: res.value,
                                unit: res.unit
                            });

                            changed = true;
                        } catch (e) {
                            console.warn(e);
                        }
                    }
                }
            }
        }

        return discovered;
    }
}

const engine = new FormulaEngine();
