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
    
    // Gerar inputs
    const inputsContainer = document.getElementById("formulaSolverInputs");
    let html = `<p style="text-align:center; font-size:14px;">Preencha os valores conhecidos. Deixe <strong>um</strong> em branco para calcular.</p>`;
    
    for (const [varKey, varDef] of Object.entries(formula.variables)) {
        html += `
            <div style="display:flex; align-items:center; margin-bottom:10px;">
                <label style="width:120px; margin:0;">${varDef.name} (<strong>${varKey}</strong>):</label>
                <input type="number" id="formInp_${varKey}" placeholder="Valor" style="flex:1; margin:0 10px;" />
                <span style="width:60px; text-align:left;">${varDef.si_unit}</span>
            </div>
        `;
    }
    
    html += `<button onclick="solveFormula('${id}')" style="margin-top:15px;">Calcular Variável Ausente</button>`;
    inputsContainer.innerHTML = html;
    document.getElementById("formulaResult").innerHTML = "";
}

function solveFormula(id) {
    const formula = engine.getAllFormulas().find(f => f.id === id);
    const inputs = {};
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
    
    const resDiv = document.getElementById("formulaResult");
    if (missingCount !== 1) {
        resDiv.innerHTML = `<span style="color:var(--error-color);">Erro: Você deve deixar exatamente UMA variável em branco.</span>`;
        return;
    }
    
    try {
        const result = engine.calculate(id, inputs, missingVar);
        const formattedVal = Number.isInteger(result.value) ? result.value : parseFloat(result.value.toFixed(4));
        resDiv.innerHTML = `<span style="color:var(--primary-color); font-weight:bold; font-size:18px;">${missingVar} = ${formattedVal} ${result.unit}</span>`;
        document.getElementById(`formInp_${missingVar}`).value = formattedVal;
    } catch (e) {
        resDiv.innerHTML = `<span style="color:var(--error-color);">Erro: ${e.message}</span>`;
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
