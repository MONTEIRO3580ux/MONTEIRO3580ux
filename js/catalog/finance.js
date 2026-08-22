// finance.js

const financeCatalog = [
    {
        id: "simple_interest",
        name: "Juros Simples (Montante)",
        category: "Finanças: Matemática Financeira",
        latex: "M = C(1 + i \\cdot t)",
        computable: {
            "M": "C * (1 + i * t)",
            "C": "M / (1 + i * t)",
            "i": "(M / C - 1) / t",
            "t": "(M / C - 1) / i"
        },
        variables: {
            "M": { name: "Montante Final", si_unit: "$" },
            "C": { name: "Capital Inicial", si_unit: "$" },
            "i": { name: "Taxa de Juros (decimal)", si_unit: "" },
            "t": { name: "Tempo", si_unit: "períodos" }
        },
        constraints: ["C >= 0", "t >= 0", "i >= -1"]
    },
    {
        id: "compound_interest",
        name: "Juros Compostos (Montante)",
        category: "Finanças: Matemática Financeira",
        latex: "M = C(1 + i)^t",
        computable: {
            "M": "C * ((1 + i)^t)",
            "C": "M / ((1 + i)^t)",
            // "i": "(M / C)^(1/t) - 1" // Usando pow do math.js
            "i": "pow(M / C, 1/t) - 1",
            "t": "log(M / C) / log(1 + i)"
        },
        variables: {
            "M": { name: "Montante Final", si_unit: "$" },
            "C": { name: "Capital Inicial", si_unit: "$" },
            "i": { name: "Taxa de Juros (decimal)", si_unit: "" },
            "t": { name: "Tempo", si_unit: "períodos" }
        },
        constraints: ["C > 0", "t > 0", "i > -1"]
    }
];

if (typeof engine !== 'undefined') {
    engine.registerCatalog(financeCatalog);
}
