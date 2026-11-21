// astronomy.js

const astronomyCatalog = [
    {
        id: "universal_gravitation",
        name: "Lei da Gravitação Universal",
        category: "Astronomia: Gravitação",
        latex: "F = G \\frac{m_1 m_2}{r^2}",
        computable: {
            "F": "(G * m1 * m2) / (r^2)",
            "m1": "(F * r^2) / (G * m2)",
            "m2": "(F * r^2) / (G * m1)",
            "r": "sqrt((G * m1 * m2) / F)"
        },
        variables: {
            "F": { name: "Força Gravitacional", si_unit: "N" },
            "m1": { name: "Massa 1", si_unit: "kg" },
            "m2": { name: "Massa 2", si_unit: "kg" },
            "r": { name: "Distância", si_unit: "m" },
            "G": { name: "Constante G", si_unit: "m^3/(kg*s^2)" }
        },
        constraints: ["r > 0", "m1 > 0", "m2 > 0"]
    },
    {
        id: "escape_velocity",
        name: "Velocidade de Escape",
        category: "Astronomia: Mecânica Orbital",
        latex: "v_e = \\sqrt{\\frac{2GM}{r}}",
        computable: {
            "ve": "sqrt((2 * G * M) / r)",
            "M": "(ve^2 * r) / (2 * G)",
            "r": "(2 * G * M) / (ve^2)"
        },
        variables: {
            "ve": { name: "Velocidade de Escape", si_unit: "m/s" },
            "M": { name: "Massa do Planeta", si_unit: "kg" },
            "r": { name: "Raio", si_unit: "m" },
            "G": { name: "Constante G", si_unit: "m^3/(kg*s^2)" }
        },
        constraints: ["r > 0", "M > 0"]
    },
    {
        id: "orbital_velocity",
        name: "Velocidade Orbital Circular",
        category: "Astronomia: Mecânica Orbital",
        latex: "v = \\sqrt{\\frac{GM}{r}}",
        computable: {
            "v": "sqrt((G * M) / r)",
            "M": "(v^2 * r) / G",
            "r": "(G * M) / (v^2)"
        },
        variables: {
            "v": { name: "Velocidade Orbital", si_unit: "m/s" },
            "M": { name: "Massa Central", si_unit: "kg" },
            "r": { name: "Raio Orbital", si_unit: "m" },
            "G": { name: "Constante G", si_unit: "m^3/(kg*s^2)" }
        },
        constraints: ["r > 0", "M > 0"]
    }
];

if (typeof engine !== 'undefined') {
    engine.registerCatalog(astronomyCatalog);
}
