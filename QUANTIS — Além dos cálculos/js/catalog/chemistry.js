// chemistry.js

const chemistryCatalog = [
    {
        id: "moles",
        name: "Número de Mols",
        category: "Química: Estequiometria",
        latex: "n = \\frac{m}{M}",
        computable: {
            "n": "m / M",
            "m": "n * M",
            "M": "m / n"
        },
        variables: {
            "n": { name: "Número de Mols", si_unit: "mol" },
            "m": { name: "Massa", si_unit: "g" }, // Na química, geralmente g é usado em vez de kg para massa molar
            "M": { name: "Massa Molar", si_unit: "g/mol" }
        },
        constraints: ["M > 0"]
    },
    {
        id: "molarity",
        name: "Molaridade (Concentração)",
        category: "Química: Soluções",
        latex: "C = \\frac{n}{V}",
        computable: {
            "C": "n / V",
            "n": "C * V",
            "V": "n / C"
        },
        variables: {
            "C": { name: "Molaridade", si_unit: "mol/L" },
            "n": { name: "Número de Mols", si_unit: "mol" },
            "V": { name: "Volume", si_unit: "L" } // Na química usa-se Litro (L) em vez de m^3
        },
        constraints: ["V > 0"]
    },
    {
        id: "ideal_gas",
        name: "Lei dos Gases Ideais",
        category: "Química: Gases",
        latex: "P \\cdot V = n \\cdot R \\cdot T",
        computable: {
            "P": "(n * R * T) / V",
            "V": "(n * R * T) / P",
            "n": "(P * V) / (R * T)",
            "T": "(P * V) / (n * R)"
        },
        variables: {
            "P": { name: "Pressão", si_unit: "Pa" },
            "V": { name: "Volume", si_unit: "m^3" },
            "n": { name: "Número de Mols", si_unit: "mol" },
            "R": { name: "Constante Universal", si_unit: "J/(mol*K)" },
            "T": { name: "Temperatura", si_unit: "K" }
        },
        constraints: ["V > 0", "T > 0", "n > 0", "P > 0"]
    },
    {
        id: "dilution",
        name: "Diluição de Soluções",
        category: "Química: Soluções",
        latex: "C_1 V_1 = C_2 V_2",
        computable: {
            "C1": "(C2 * V2) / V1",
            "V1": "(C2 * V2) / C1",
            "C2": "(C1 * V1) / V2",
            "V2": "(C1 * V1) / C2"
        },
        variables: {
            "C1": { name: "Concentração Inicial", si_unit: "mol/L" },
            "V1": { name: "Volume Inicial", si_unit: "L" },
            "C2": { name: "Concentração Final", si_unit: "mol/L" },
            "V2": { name: "Volume Final", si_unit: "L" }
        },
        constraints: ["V1 > 0", "V2 > 0", "C1 >= 0", "C2 >= 0"]
    }
];

if (typeof engine !== 'undefined') {
    engine.registerCatalog(chemistryCatalog);
}
