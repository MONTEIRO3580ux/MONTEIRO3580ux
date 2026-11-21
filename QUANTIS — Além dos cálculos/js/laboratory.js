// laboratory.js

let labInputsList = [];

function addLabInput() {
    const container = document.getElementById("labInputs");
    const row = document.createElement("div");
    row.className = "lab-input-row";
    row.style = "display:flex; gap:10px; margin-bottom:10px;";
    
    row.innerHTML = `
        <input type="text" class="lab-var" placeholder="Var (ex: m)" style="flex:1; margin:0;" />
        <input type="number" class="lab-val" placeholder="Valor (ex: 65)" style="flex:2; margin:0;" />
        <input type="text" class="lab-unit" placeholder="Unidade (ex: kg)" style="flex:1; margin:0;" />
        <button onclick="removeLabInput(this)" class="btn-remove" style="width:auto; padding:0 15px; background-color:#dc3545;">X</button>
    `;
    container.appendChild(row);
}

function removeLabInput(btn) {
    btn.parentElement.remove();
}

function runLaboratory() {
    const rows = document.querySelectorAll(".lab-input-row");
    const knownVars = {};
    
    rows.forEach(row => {
        const v = row.querySelector(".lab-var").value.trim();
        const val = parseFloat(row.querySelector(".lab-val").value);
        const unit = row.querySelector(".lab-unit").value.trim();
        
        if (v && !isNaN(val)) {
            // Conversão automática para SI se unitSystem estiver disponível
            let siVal = val;
            let baseUnit = unit;
            if (typeof unitSystem !== 'undefined' && unit) {
                const qty = unitSystem.getQuantity(unit);
                if (qty) {
                    siVal = unitSystem.toBaseUnit(val, unit, qty.siBaseUnit);
                    baseUnit = qty.siBaseUnit;
                }
            }
            knownVars[v] = { value: siVal, unit: baseUnit, originalValue: val, originalUnit: unit };
        }
    });

    const resultsContainer = document.getElementById("labResults");
    resultsContainer.innerHTML = "<p>Calculando...</p>";

    try {
        const discovered = engine.runLaboratory(knownVars);
        
        if (discovered.length === 0) {
            resultsContainer.innerHTML = "<p>Nenhuma nova variável pôde ser deduzida com os dados fornecidos.</p>";
            return;
        }

        let html = "<h4>Descobertas do Laboratório:</h4><ul style='list-style:none; padding:0;'>";
        discovered.forEach(d => {
            const formattedVal = Number.isInteger(d.value) ? d.value : parseFloat(d.value.toFixed(4));
            html += `<li style="background:var(--history-bg); padding:10px; border-radius:5px; margin-bottom:5px; border:1px solid var(--border-color);">
                <strong>${d.variable}</strong> (${d.variableName}): 
                <span style="color:var(--primary-color); font-weight:bold;">${formattedVal} ${d.unit}</span> 
                <br><small style="color:var(--secondary-text);">Via: ${d.formulaName}</small>
            </li>`;
        });
        html += "</ul>";
        resultsContainer.innerHTML = html;
        
    } catch (e) {
        resultsContainer.innerHTML = `<p style="color:red;">Erro: ${e.message}</p>`;
    }
}

// ==========================================
// ENGINEERING TOOLKIT UI
// ==========================================

function updateFormulaList() {
    const categorySel = document.getElementById("formulaCategory");
    const formulaSel = document.getElementById("formulaSelect");
    
    formulaSel.innerHTML = "";
    
    const cat = categorySel.value;
    const all = engine.getAllFormulas();
    const filtered = cat === "all" ? all : all.filter(f => f.category === cat);
    
    filtered.forEach(f => {
        formulaSel.appendChild(new Option(f.name, f.id));
    });
    
    renderFormula();
}

function renderFormula() {
    const id = document.getElementById("formulaSelect").value;
    const formula = engine.getAllFormulas().find(f => f.id === id);
    if (!formula) return;
    
    const viewer = document.getElementById("formulaViewer");
    katex.render(formula.latex, viewer, { throwOnError: false, displayMode: true });
    
    const inputsContainer = document.getElementById("formulaSolverInputs");
    let html = '';

    if (formula.type === 'DYNAMIC_LIST') {
        html += `<p style="text-align:center; font-size:14px;">Preencha a lista de valores e calcule o resultado (Cálculo unidirecional).</p>`;
        
        // Variaveis "fixas" (ex: o 'x' do polinomio)
        for (const [varKey, varDef] of Object.entries(formula.variables)) {
            if (varKey === formula.listVariable || varKey === formula.targetVariable) continue;
            html += `
                <div style="display:flex; align-items:center; margin-bottom:10px;">
                    <label style="width:120px; margin:0;">${varDef.name} (<strong>${varKey}</strong>):</label>
                    <input type="number" id="formInp_${varKey}" placeholder="Valor" style="flex:1; margin:0 10px;" />
                    <span style="width:60px; text-align:left;">${varDef.si_unit}</span>
                </div>
            `;
        }

        // Area da lista dinâmica
        html += `<div style="border:1px solid var(--border-color); padding:10px; border-radius:5px; margin-bottom:10px; background: var(--history-bg);">`;
        html += `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <strong>Itens (${formula.variables[formula.listVariable].name})</strong>
                    <button onclick="addFormulaListItem('${id}')" style="width:auto; padding:5px 15px;">+ Adicionar</button>
                 </div>`;
        html += `<div id="dynamicListContainer"></div>`;
        html += `</div>`;
        
        html += `<button onclick="solveFormula('${id}')" style="margin-top:15px;">Calcular ${formula.variables[formula.targetVariable].name}</button>`;
        inputsContainer.innerHTML = html;
        
        // Adiciona 2 itens iniciais
        addFormulaListItem(id);
        addFormulaListItem(id);
    } else {
        html += `<p style="text-align:center; font-size:14px;">Preencha os valores conhecidos. Deixe <strong>um</strong> em branco para calcular.</p>`;
        
        const constDefaults = {
            'g': '9.8',
            'G': '6.674e-11',
            'c': '3e8',
            'e': '1.602e-19',
            'ke': '8.99e9',
            'Rg': '8.314',
            'kB': '1.381e-23',
            'h': '6.626e-34',
            'eps0': '8.854e-12',
            'mu0': '1.257e-6',
            'I0': '1e-12'
        };

        for (const [varKey, varDef] of Object.entries(formula.variables)) {
            let defaultVal = constDefaults[varKey] || '';
            let extraControls = '';
            if (varKey === 'g') {
                extraControls = `
                    <button type="button" style="width:auto; padding:2px 8px; font-size:11px; margin-left:4px;" onclick="document.getElementById('formInp_g').value='9.8'">9.8</button>
                    <button type="button" style="width:auto; padding:2px 8px; font-size:11px; margin-left:4px;" onclick="document.getElementById('formInp_g').value='10'">10</button>
                `;
            }

            // Unidades compatíveis agrupadas via Sistema Universal de Unidades
            const groupedUnits = (typeof unitSystem !== 'undefined' && unitSystem.getGroupedCompatibleUnits)
                ? unitSystem.getGroupedCompatibleUnits(varDef.si_unit, varKey, formula)
                : [{ name: "Unidades", units: (typeof unitSystem !== 'undefined' ? unitSystem.getCompatibleUnits(varDef.si_unit, varKey, formula) : [{ symbol: varDef.si_unit, name: varDef.si_unit }]) }];

            const quickUnits = (typeof unitSystem !== 'undefined' && unitSystem.getQuickUnits)
                ? unitSystem.getQuickUnits(varDef.si_unit, varKey, formula, 5)
                : [];

            let unitOptionsHtml = '';
            if (groupedUnits.length === 1 && groupedUnits[0].name === "Unidades") {
                groupedUnits[0].units.forEach(u => {
                    const isSelected = (u.symbol === varDef.si_unit);
                    const displayLabel = u.symbol ? `${u.symbol} — ${u.name}` : '(adimensional / puro)';
                    unitOptionsHtml += `<option value="${u.symbol}" ${isSelected ? 'selected' : ''} title="${u.name}">${displayLabel}</option>`;
                });
            } else {
                groupedUnits.forEach(grp => {
                    unitOptionsHtml += `<optgroup label="${grp.name}">`;
                    grp.units.forEach(u => {
                        const isSelected = (u.symbol === varDef.si_unit);
                        const displayLabel = u.symbol ? `${u.symbol} — ${u.name}` : '(adimensional / puro)';
                        unitOptionsHtml += `<option value="${u.symbol}" ${isSelected ? 'selected' : ''} title="${u.name}">${displayLabel}</option>`;
                    });
                    unitOptionsHtml += `</optgroup>`;
                });
            }

            let quickChipsHtml = '';
            if (quickUnits && quickUnits.length > 1) {
                let chipsButtons = '';
                quickUnits.forEach(qu => {
                    const isActive = (qu.symbol === varDef.si_unit);
                    chipsButtons += `
                        <button type="button" 
                                class="unit-chip ${isActive ? 'active' : ''}" 
                                data-var="${varKey}" 
                                data-unit="${qu.symbol}" 
                                onclick="selectFormulaUnit('${id}', '${varKey}', '${qu.symbol}')"
                                title="${qu.name}">
                            ${qu.symbol || 'puro'}
                        </button>
                    `;
                });
                quickChipsHtml = `
                    <div class="formula-unit-chips" id="unitChips_${varKey}">
                        <span class="unit-chips-label">Atalhos:</span>
                        <div class="unit-chips-container">
                            ${chipsButtons}
                        </div>
                    </div>
                `;
            }

            html += `
                <div class="formula-var-card" data-var="${varKey}">
                    <div class="formula-var-row">
                        <label class="formula-var-label" for="formInp_${varKey}">
                            <span>${varDef.name}</span>
                            <span class="formula-var-badge">${varKey}</span>
                        </label>
                        <div class="formula-var-inputs-wrapper">
                            <input type="number" id="formInp_${varKey}" value="${defaultVal}" placeholder="Valor (ou deixe vazio)" 
                                   class="formula-var-input" step="any" />
                            <select id="formUnit_${varKey}" class="formula-unit-select"
                                    onchange="onFormulaUnitChange('${id}', '${varKey}')"
                                    title="Selecione a unidade de ${varDef.name}">
                                ${unitOptionsHtml}
                            </select>
                            ${extraControls}
                        </div>
                    </div>
                    ${quickChipsHtml}
                </div>
            `;
        }
        html += `<button onclick="solveFormula('${id}')" style="margin-top:15px;">Calcular Variável Ausente</button>`;
        inputsContainer.innerHTML = html;
    }
    
    document.getElementById("formulaResult").innerHTML = "";
    const derivBox = document.getElementById("formulaDerivation");
    if (derivBox) {
        derivBox.innerHTML = "";
        delete derivBox.dataset.lastInputs;
    }
}

function selectFormulaUnit(formulaId, varKey, unitSymbol) {
    const selectEl = document.getElementById(`formUnit_${varKey}`);
    if (!selectEl) return;
    selectEl.value = unitSymbol;
    updateUnitChipsState(varKey, unitSymbol);
    onFormulaUnitChange(formulaId, varKey);
}

function updateUnitChipsState(varKey, currentUnit) {
    const chips = document.querySelectorAll(`.unit-chip[data-var="${varKey}"]`);
    chips.forEach(chip => {
        if (chip.getAttribute('data-unit') === currentUnit) {
            chip.classList.add('active');
        } else {
            chip.classList.remove('active');
        }
    });
}

function onFormulaUnitChange(formulaId, varKey) {
    const selectEl = document.getElementById(`formUnit_${varKey}`);
    if (selectEl) {
        updateUnitChipsState(varKey, selectEl.value);
    }
    const resDiv = document.getElementById("formulaResult");
    if (!resDiv) return;
    const targetVar = resDiv.dataset.targetVar;
    if (targetVar === varKey && resDiv.dataset.siValue !== undefined) {
        const siVal = parseFloat(resDiv.dataset.siValue);
        const formula = engine.getAllFormulas().find(f => f.id === formulaId);
        if (!formula) return;
        const targetDef = formula.variables[varKey];
        const newUnit = document.getElementById(`formUnit_${varKey}`).value;
        const converted = (typeof unitSystem !== 'undefined')
            ? unitSystem.fromBaseUnit(siVal, newUnit, targetDef.si_unit)
            : siVal;
        const formatted = formatarNumero(converted);

        document.getElementById(`formInp_${varKey}`).value = formatted;
        const varName = targetDef ? targetDef.name : varKey;
        let html = `<span style="color:var(--primary-color); font-weight:bold; font-size:18px;">${varName} (${varKey}) = ${formatted} ${newUnit}</span>`;
        if (newUnit !== targetDef.si_unit) {
            html += `<br><small style="color:var(--secondary-text); font-size:13px;">(Equivale a ${formatarNumero(siVal)} ${targetDef.si_unit})</small>`;
        }
        resDiv.innerHTML = html;

        // Atualiza o desenvolvimento algébrico com a nova unidade de destino
        const derivBox = document.getElementById("formulaDerivation");
        if (derivBox && derivBox.dataset.lastInputs) {
            try {
                const inputs = JSON.parse(derivBox.dataset.lastInputs);
                renderDerivationSteps(formula, varKey, inputs, newUnit);
            } catch (_) {}
        }
    }
}

function renderStepDescription(container, text) {
    if (!text) return;
    container.innerHTML = '';

    // Se o texto contém delimitação matemática com $...$
    if (text.includes('$')) {
        const parts = text.split('$');
        parts.forEach((part, idx) => {
            if (idx % 2 === 0) {
                if (part) container.appendChild(document.createTextNode(part));
            } else {
                if (part.trim()) {
                    const span = document.createElement('span');
                    span.className = 'derivation-inline-math';
                    try {
                        katex.render(part, span, { throwOnError: false, displayMode: false });
                    } catch (_) {
                        span.textContent = part;
                    }
                    container.appendChild(span);
                }
            }
        });
        return;
    }

    // Se o texto contém comandos LaTeX brutos não delimitados por $ (ex: \; ou \text{} ou \theta)
    if (/(\\[a-zA-Z]+|\\[;,\s]|[{}\^_])/.test(text)) {
        const colonIdx = text.indexOf(':');
        if (colonIdx !== -1 && colonIdx < text.length - 1) {
            const prefix = text.slice(0, colonIdx + 1);
            const mathCandidate = text.slice(colonIdx + 1).replace(/\.$/, '').trim();
            container.appendChild(document.createTextNode(prefix + ' '));
            const span = document.createElement('span');
            span.className = 'derivation-inline-math';
            try {
                katex.render(mathCandidate, span, { throwOnError: false, displayMode: false });
                container.appendChild(span);
                if (text.endsWith('.')) {
                    container.appendChild(document.createTextNode('.'));
                }
                return;
            } catch (_) {}
        }
    }

    // Fallback texto simples
    container.textContent = text;
}

function renderDerivationSteps(formula, missingVar, inputs, targetUnit) {
    const derivBox = document.getElementById("formulaDerivation");
    if (!derivBox || typeof algebraSolver === 'undefined') return;

    try {
        const derivation = algebraSolver.solve(formula, missingVar, inputs, targetUnit);
        if (derivation && derivation.success && derivation.steps && derivation.steps.length > 0) {
            const details = document.createElement('details');
            details.className = 'derivation-container';

            const summary = document.createElement('summary');
            summary.className = 'derivation-summary';
            summary.textContent = '📐 Desenvolvimento da Resolução';
            details.appendChild(summary);

            const stepsWrapper = document.createElement('div');
            stepsWrapper.className = 'derivation-steps-wrapper';

            derivation.steps.forEach((step, idx) => {
                const isLast = idx === derivation.steps.length - 1;
                const stepEl = document.createElement('div');
                stepEl.className = 'derivation-step' + (isLast ? ' derivation-result' : '');

                const badge = document.createElement('span');
                badge.className = 'derivation-step-number';
                badge.textContent = step.stepNumber;
                stepEl.appendChild(badge);

                const desc = document.createElement('div');
                desc.className = 'derivation-step-description';
                renderStepDescription(desc, step.description);
                stepEl.appendChild(desc);

                if (step.latexBefore && step.latexBefore !== step.latexAfter) {
                    const mathBefore = document.createElement('div');
                    mathBefore.className = 'derivation-step-math';
                    try { katex.render(step.latexBefore, mathBefore, { throwOnError: false, displayMode: true }); } catch(_) {}
                    stepEl.appendChild(mathBefore);

                    const arrow = document.createElement('div');
                    arrow.className = 'derivation-step-arrow';
                    arrow.textContent = '⟹';
                    stepEl.appendChild(arrow);
                }

                if (step.latexAfter) {
                    const mathAfter = document.createElement('div');
                    mathAfter.className = 'derivation-step-math';
                    try { katex.render(step.latexAfter, mathAfter, { throwOnError: false, displayMode: true }); } catch(_) {}
                    stepEl.appendChild(mathAfter);
                }

                stepsWrapper.appendChild(stepEl);
            });

            details.appendChild(stepsWrapper);
            derivBox.innerHTML = "";
            derivBox.appendChild(details);
        }
    } catch (derivErr) {
        console.warn('Derivação algébrica não disponível:', derivErr);
    }
}

function addFormulaListItem(id) {
    const formula = engine.getAllFormulas().find(f => f.id === id);
    const container = document.getElementById("dynamicListContainer");
    
    const row = document.createElement("div");
    row.className = "dynamic-list-row";
    row.style = "display:flex; gap:10px; margin-bottom:10px; align-items:center;";
    
    let rowHtml = '';
    formula.itemFields.forEach(field => {
        rowHtml += `<input type="number" class="dyn-val-${field}" placeholder="${field}" style="flex:1; margin:0;" />`;
    });
    rowHtml += `<button onclick="this.parentElement.remove()" style="width:auto; padding:0 15px; background-color:#dc3545;">X</button>`;
    
    row.innerHTML = rowHtml;
    container.appendChild(row);
}

function solveFormula(id) {
    const formula = engine.getAllFormulas().find(f => f.id === id);
    const inputs = {};
    const resDiv = document.getElementById("formulaResult");
    
    if (formula.type === 'DYNAMIC_LIST') {
        let missingFixes = false;
        
        for (const [varKey, varDef] of Object.entries(formula.variables)) {
            if (varKey === formula.listVariable || varKey === formula.targetVariable) continue;
            const valStr = document.getElementById(`formInp_${varKey}`).value;
            if (valStr === "") {
                missingFixes = true;
            } else {
                inputs[varKey] = { value: parseFloat(valStr), unit: varDef.si_unit };
            }
        }
        
        if (missingFixes) {
            resDiv.innerHTML = `<span style="color:var(--error-color);">Erro: Preencha todos os campos fixos.</span>`;
            return;
        }

        const listItems = [];
        const rows = document.querySelectorAll(".dynamic-list-row");
        let listError = false;
        
        rows.forEach(row => {
            if (formula.itemFields.length === 1) {
                const field = formula.itemFields[0];
                const valStr = row.querySelector('.dyn-val-' + field).value;
                if (valStr === "") listError = true;
                else listItems.push(parseFloat(valStr));
            } else {
                const obj = {};
                formula.itemFields.forEach(field => {
                    const valStr = row.querySelector('.dyn-val-' + field).value;
                    if (valStr === "") listError = true;
                    else obj[field] = parseFloat(valStr);
                });
                listItems.push(obj);
            }
        });

        if (listError || listItems.length === 0) {
            resDiv.innerHTML = `<span style="color:var(--error-color);">Erro: Preencha todos os itens da lista ou remova os vazios.</span>`;
            return;
        }

        inputs[formula.listVariable] = { value: listItems, unit: formula.variables[formula.listVariable].si_unit };

        try {
            const result = engine.calculate(id, inputs, formula.targetVariable);
            const formattedVal = Number.isInteger(result.value) ? result.value : parseFloat(result.value.toFixed(4));
            resDiv.innerHTML = `<span style="color:var(--primary-color); font-weight:bold; font-size:18px;">${formula.targetVariable} = ${formattedVal} ${result.unit}</span>`;
        } catch (e) {
            resDiv.innerHTML = `<span style="color:var(--error-color);">Erro: ${e.message}</span>`;
        }

    } else {
        const derivBox = document.getElementById("formulaDerivation");
        if (derivBox) {
            derivBox.innerHTML = "";
            delete derivBox.dataset.lastInputs;
        }

        let missingVar = null;
        let missingCount = 0;
        
        for (const varKey of Object.keys(formula.variables)) {
            const valStr = document.getElementById(`formInp_${varKey}`).value.trim();
            if (valStr === "") {
                missingVar = varKey;
                missingCount++;
            }
        }
        
        if (missingCount !== 1) {
            resDiv.innerHTML = `<span style="color:var(--error-color);">Erro: Você deve deixar exatamente UMA variável em branco para calcular.</span>`;
            return;
        }

        // Processa todas as variáveis conhecidas com conversão universal para SI
        for (const varKey of Object.keys(formula.variables)) {
            if (varKey === missingVar) continue;
            const valStr = document.getElementById(`formInp_${varKey}`).value.trim();
            const rawVal = parseFloat(valStr);
            const varDef = formula.variables[varKey];
            const unitEl = document.getElementById(`formUnit_${varKey}`);
            const chosenUnit = unitEl ? unitEl.value : varDef.si_unit;

            // Validação de compatibilidade dimensional
            if (typeof unitSystem !== 'undefined' && chosenUnit !== varDef.si_unit) {
                if (!unitSystem.areCompatible(chosenUnit, varDef.si_unit)) {
                    resDiv.innerHTML = `<span style="color:var(--error-color);">Erro dimensional: A unidade '${chosenUnit}' não é compatível com a grandeza da variável '${varKey}' (${varDef.name}).</span>`;
                    return;
                }
            }

            // Conversão automática para unidade de referência SI
            const siVal = (typeof unitSystem !== 'undefined')
                ? unitSystem.toBaseUnit(rawVal, chosenUnit, varDef.si_unit)
                : rawVal;

            inputs[varKey] = {
                value: siVal,
                unit: varDef.si_unit,
                rawValue: rawVal,
                rawUnit: chosenUnit
            };
        }

        const targetDef = formula.variables[missingVar];
        const targetUnitEl = document.getElementById(`formUnit_${missingVar}`);
        const targetUnit = targetUnitEl ? targetUnitEl.value : targetDef.si_unit;

        try {
            // Executa cálculo coerente no SI
            const result = engine.calculate(id, inputs, missingVar);
            const siResult = result.value;

            // Converte resultado para a unidade selecionada pelo usuário
            const convertedResult = (typeof unitSystem !== 'undefined')
                ? unitSystem.fromBaseUnit(siResult, targetUnit, targetDef.si_unit)
                : siResult;

            const formattedVal = formatarNumero(convertedResult);

            // Atualiza o input da variável calculada
            document.getElementById(`formInp_${missingVar}`).value = formattedVal;
            updateUnitChipsState(missingVar, targetUnit);

            // Salva metadados no resDiv para reconversão dinâmica ao mudar unidade
            resDiv.dataset.targetVar = missingVar;
            resDiv.dataset.siValue = siResult;
            resDiv.dataset.targetUnit = targetUnit;

            // Atualiza fórmula KaTeX isolada no topo
            if (formula.latex_rearranged && formula.latex_rearranged[missingVar]) {
                const viewer = document.getElementById("formulaViewer");
                if (viewer) {
                    katex.render(formula.latex_rearranged[missingVar], viewer, { throwOnError: false, displayMode: true });
                }
            }

            const varName = targetDef ? targetDef.name : missingVar;
            let resultHtml = `<span style="color:var(--primary-color); font-weight:bold; font-size:18px;">${varName} (${missingVar}) = ${formattedVal} ${targetUnit}</span>`;
            if (targetUnit !== targetDef.si_unit) {
                resultHtml += `<br><small style="color:var(--secondary-text); font-size:13px;">(Equivale a ${formatarNumero(siResult)} ${targetDef.si_unit})</small>`;
            }
            resDiv.innerHTML = resultHtml;

            // Renderiza desenvolvimento algébrico passo a passo
            if (derivBox) {
                derivBox.dataset.lastInputs = JSON.stringify(inputs);
            }
            renderDerivationSteps(formula, missingVar, inputs, targetUnit);

        } catch (e) {
            resDiv.innerHTML = `<span style="color:var(--error-color);">Erro: ${e.message}</span>`;
        }
    }
}

// Inicializa categorias
document.addEventListener("DOMContentLoaded", () => {
    const catSel = document.getElementById("formulaCategory");
    if(catSel) {
        catSel.appendChild(new Option("Todas as Categorias", "all"));
        const cats = Object.keys(engine.getCategories());
        cats.forEach(c => catSel.appendChild(new Option(c, c)));
        updateFormulaList();
    }
});
