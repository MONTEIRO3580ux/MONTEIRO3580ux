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
            knownVars[v] = { value: val, unit: unit };
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
            html += `
                <div style="display:flex; align-items:center; margin-bottom:10px;">
                    <label style="width:130px; margin:0;">${varDef.name} (<strong>${varKey}</strong>):</label>
                    <input type="number" id="formInp_${varKey}" value="${defaultVal}" placeholder="Valor" style="flex:1; margin:0 10px;" />
                    <span style="width:70px; text-align:left;">${varDef.si_unit}</span>
                    ${extraControls}
                </div>
            `;
        }
        html += `<button onclick="solveFormula('${id}')" style="margin-top:15px;">Calcular Variável Ausente</button>`;
        inputsContainer.innerHTML = html;
    }
    
    document.getElementById("formulaResult").innerHTML = "";
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
        let missingVar = null;
        let missingCount = 0;
        
        for (const varKey of Object.keys(formula.variables)) {
            const valStr = document.getElementById(`formInp_${varKey}`).value;
            if (valStr === "") {
                missingVar = varKey;
                missingCount++;
            } else {
                inputs[varKey] = { value: parseFloat(valStr), unit: formula.variables[varKey].si_unit };
            }
        }
        
        if (missingCount !== 1) {
            resDiv.innerHTML = `<span style="color:var(--error-color);">Erro: Você deve deixar exatamente UMA variável em branco.</span>`;
            return;
        }
        
        try {
            const result = engine.calculate(id, inputs, missingVar);
            const formattedVal = Number.isInteger(result.value) ? result.value : parseFloat(result.value.toFixed(4));
            
            // Atualiza a fórmula KaTeX no topo para a versão isolada calculada
            if (formula.latex_rearranged && formula.latex_rearranged[missingVar]) {
                const viewer = document.getElementById("formulaViewer");
                if (viewer) {
                    katex.render(formula.latex_rearranged[missingVar], viewer, { throwOnError: false, displayMode: true });
                }
            }

            const varName = formula.variables[missingVar] ? formula.variables[missingVar].name : missingVar;
            resDiv.innerHTML = `<span style="color:var(--primary-color); font-weight:bold; font-size:18px;">${varName} (${missingVar}) = ${formattedVal} ${result.unit}</span>`;
            document.getElementById(`formInp_${missingVar}`).value = formattedVal;
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
