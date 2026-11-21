// engineering.js

const engineeringCatalog = [
    {
        id: "young_modulus",
        name: "Módulo de Young (Elasticidade)",
        category: "Engenharia: Materiais",
        latex: "E = \\frac{\\sigma}{\\varepsilon}",
        computable: {
            "E": "sigma / epsilon",
            "sigma": "E * epsilon",
            "epsilon": "sigma / E"
        },
        variables: {
            "E": { name: "Módulo de Young", si_unit: "Pa" },
            "sigma": { name: "Tensão", si_unit: "Pa" },
            "epsilon": { name: "Deformação", si_unit: "" }
        },
        constraints: ["epsilon != 0", "E > 0"]
    },
    {
        id: "stress",
        name: "Tensão Normal",
        category: "Engenharia: Materiais",
        latex: "\\sigma = \\frac{F}{A}",
        computable: {
            "sigma": "F / A",
            "F": "sigma * A",
            "A": "F / sigma"
        },
        variables: {
            "sigma": { name: "Tensão Normal", si_unit: "Pa" },
            "F": { name: "Força", si_unit: "N" },
            "A": { name: "Área da Seção", si_unit: "m^2" }
        },
        constraints: ["A > 0"]
    },
    {
        id: "ohms_law",
        name: "Lei de Ohm",
        category: "Engenharia: Eletricidade",
        latex: "V = R \\cdot I",
        computable: {
            "V": "R * I",
            "R": "V / I",
            "I": "V / R"
        },
        variables: {
            "V": { name: "Tensão", si_unit: "V" },
            "R": { name: "Resistência", si_unit: "ohm" },
            "I": { name: "Corrente", si_unit: "A" }
        },
        constraints: ["R > 0"]
    },
    {
        id: "electric_power",
        name: "Potência Elétrica",
        category: "Engenharia: Eletricidade",
        latex: "P = V \\cdot I",
        computable: {
            "P": "V * I",
            "V": "P / I",
            "I": "P / V"
        },
        variables: {
            "P": { name: "Potência Elétrica", si_unit: "W" },
            "V": { name: "Tensão", si_unit: "V" },
            "I": { name: "Corrente", si_unit: "A" }
        }
    },
    {
        id: "reynolds_number",
        name: "Número de Reynolds",
        category: "Engenharia: Fluidos",
        latex: "Re = \\frac{\\rho v L}{\\mu}",
        computable: {
            "Re": "(rho * v * L) / mu",
            "rho": "(Re * mu) / (v * L)",
            "v": "(Re * mu) / (rho * L)",
            "L": "(Re * mu) / (rho * v)",
            "mu": "(rho * v * L) / Re"
        },
        variables: {
            "Re": { name: "Número de Reynolds", si_unit: "" },
            "rho": { name: "Densidade", si_unit: "kg/m^3" },
            "v": { name: "Velocidade", si_unit: "m/s" },
            "L": { name: "Comprimento Característico", si_unit: "m" },
            "mu": { name: "Viscosidade Dinâmica", si_unit: "Pa*s" }
        },
        constraints: ["mu > 0", "rho > 0", "L > 0"]
    }
];

if (typeof engine !== 'undefined') {
    engine.registerCatalog(engineeringCatalog);
}
