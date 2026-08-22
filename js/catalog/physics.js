// physics.js — Catálogo Completo de Física (v5.0 Horizonte Singular)

const physicsCatalog = [

    // ============================================================
    // CINEMÁTICA — MRU
    // ============================================================
    {
        id: "mru",
        name: "MRU — Posição",
        category: "Física: Cinemática",
        latex: "s = s_0 + v \\cdot t",
        computable: {
            "s":  "s0 + v * t",
            "s0": "s - v * t",
            "v":  "(s - s0) / t",
            "t":  "(s - s0) / v"
        },
        variables: {
            "s":  { name: "Posição final",    si_unit: "m" },
            "s0": { name: "Posição inicial",  si_unit: "m" },
            "v":  { name: "Velocidade",       si_unit: "m/s" },
            "t":  { name: "Tempo",            si_unit: "s" }
        },
        constraints: ["t >= 0"],
        description: "Equação horária do Movimento Retilíneo Uniforme."
    },

    // ============================================================
    // CINEMÁTICA — MRUV
    // ============================================================
    {
        id: "mruv_velocity",
        name: "MRUV — Velocidade",
        category: "Física: Cinemática",
        latex: "v = v_0 + a \\cdot t",
        computable: {
            "v":  "v0 + a * t",
            "v0": "v - a * t",
            "a":  "(v - v0) / t",
            "t":  "(v - v0) / a"
        },
        variables: {
            "v":  { name: "Velocidade final",   si_unit: "m/s" },
            "v0": { name: "Velocidade inicial",  si_unit: "m/s" },
            "a":  { name: "Aceleração",          si_unit: "m/s^2" },
            "t":  { name: "Tempo",               si_unit: "s" }
        },
        description: "Equação da velocidade no MRUV."
    },
    {
        id: "mruv_position",
        name: "MRUV — Posição",
        category: "Física: Cinemática",
        latex: "s = s_0 + v_0 t + \\frac{a t^2}{2}",
        computable: {
            "s":  "s0 + v0 * t + (a * t^2) / 2",
            "s0": "s - v0 * t - (a * t^2) / 2",
            "v0": "(s - s0 - (a * t^2) / 2) / t",
            "a":  "2 * (s - s0 - v0 * t) / (t^2)"
        },
        variables: {
            "s":  { name: "Posição final",    si_unit: "m" },
            "s0": { name: "Posição inicial",  si_unit: "m" },
            "v0": { name: "Velocidade inicial", si_unit: "m/s" },
            "a":  { name: "Aceleração",       si_unit: "m/s^2" },
            "t":  { name: "Tempo",            si_unit: "s" }
        },
        constraints: ["t > 0"],
        description: "Equação horária do MRUV."
    },
    {
        id: "mruv_torricelli",
        name: "MRUV — Equação de Torricelli",
        category: "Física: Cinemática",
        latex: "v^2 = v_0^2 + 2a \\Delta s",
        computable: {
            "v":   "sqrt(v0^2 + 2 * a * ds)",
            "v0":  "sqrt(v^2 - 2 * a * ds)",
            "a":   "(v^2 - v0^2) / (2 * ds)",
            "ds":  "(v^2 - v0^2) / (2 * a)"
        },
        variables: {
            "v":  { name: "Velocidade final",   si_unit: "m/s" },
            "v0": { name: "Velocidade inicial",  si_unit: "m/s" },
            "a":  { name: "Aceleração",          si_unit: "m/s^2" },
            "ds": { name: "Deslocamento (Δs)",   si_unit: "m" }
        },
        description: "Equação de Torricelli — elimina o tempo."
    },

    // ============================================================
    // CINEMÁTICA — MCU
    // ============================================================
    {
        id: "mcu_velocity",
        name: "MCU — Velocidade Linear",
        category: "Física: Cinemática",
        latex: "v = \\omega \\cdot R",
        computable: {
            "v":   "omega * R",
            "omega": "v / R",
            "R":   "v / omega"
        },
        variables: {
            "v":     { name: "Velocidade linear", si_unit: "m/s" },
            "omega": { name: "Velocidade angular", si_unit: "rad/s" },
            "R":     { name: "Raio",              si_unit: "m" }
        },
        constraints: ["R > 0"],
        description: "Relação entre velocidade linear e angular no MCU."
    },
    {
        id: "mcu_omega",
        name: "MCU — Velocidade Angular",
        category: "Física: Cinemática",
        latex: "\\omega = 2\\pi f",
        computable: {
            "omega": "2 * pi * f",
            "f":     "omega / (2 * pi)"
        },
        variables: {
            "omega": { name: "Velocidade angular", si_unit: "rad/s" },
            "f":     { name: "Frequência",         si_unit: "Hz" }
        },
        constraints: ["f > 0"],
        description: "Relação entre velocidade angular e frequência."
    },
    {
        id: "mcu_centripetal",
        name: "MCU — Aceleração Centrípeta",
        category: "Física: Cinemática",
        latex: "a_c = \\frac{v^2}{R}",
        computable: {
            "ac": "v^2 / R",
            "v":  "sqrt(ac * R)",
            "R":  "v^2 / ac"
        },
        variables: {
            "ac": { name: "Aceleração centrípeta", si_unit: "m/s^2" },
            "v":  { name: "Velocidade linear",     si_unit: "m/s" },
            "R":  { name: "Raio",                  si_unit: "m" }
        },
        constraints: ["R > 0", "ac > 0"],
        description: "Aceleração centrípeta no movimento circular."
    },

    // ============================================================
    // CINEMÁTICA — LANÇAMENTO OBLÍQUO
    // ============================================================
    {
        id: "oblique_launch_height",
        name: "Lançamento Oblíquo — Altura Máxima",
        category: "Física: Cinemática",
        latex: "H = \\frac{v_0^2 \\sin^2\\theta}{2g}",
        computable: {
            "H":  "(v0^2 * (sin(theta))^2) / (2 * g)",
            "v0": "sqrt((2 * H * g) / (sin(theta))^2)",
            "g":  "(v0^2 * (sin(theta))^2) / (2 * H)"
        },
        variables: {
            "H":     { name: "Altura máxima",  si_unit: "m" },
            "v0":    { name: "Velocidade inicial", si_unit: "m/s" },
            "theta": { name: "Ângulo (rad)",   si_unit: "rad" },
            "g":     { name: "Gravidade",      si_unit: "m/s^2" }
        },
        constraints: ["H >= 0", "v0 > 0", "g > 0"],
        description: "Altura máxima atingida em lançamento oblíquo."
    },
    {
        id: "oblique_launch_range",
        name: "Lançamento Oblíquo — Alcance",
        category: "Física: Cinemática",
        latex: "A = \\frac{v_0^2 \\sin(2\\theta)}{g}",
        computable: {
            "A":  "(v0^2 * sin(2 * theta)) / g",
            "v0": "sqrt((A * g) / sin(2 * theta))",
            "g":  "(v0^2 * sin(2 * theta)) / A"
        },
        variables: {
            "A":     { name: "Alcance",          si_unit: "m" },
            "v0":    { name: "Velocidade inicial", si_unit: "m/s" },
            "theta": { name: "Ângulo (rad)",     si_unit: "rad" },
            "g":     { name: "Gravidade",        si_unit: "m/s^2" }
        },
        constraints: ["v0 > 0", "g > 0"],
        description: "Alcance horizontal do lançamento oblíquo."
    },

    // ============================================================
    // DINÂMICA
    // ============================================================
    {
        id: "newtons_second_law",
        name: "2ª Lei de Newton — Força Resultante",
        category: "Física: Dinâmica",
        latex: "F = m \\cdot a",
        computable: {
            "F": "m * a",
            "m": "F / a",
            "a": "F / m"
        },
        variables: {
            "F": { name: "Força Resultante", si_unit: "N" },
            "m": { name: "Massa",            si_unit: "kg" },
            "a": { name: "Aceleração",       si_unit: "m/s^2" }
        },
        constraints: ["m > 0"],
        description: "Segunda Lei de Newton."
    },
    {
        id: "weight",
        name: "Peso",
        category: "Física: Dinâmica",
        latex: "P = m \\cdot g",
        computable: {
            "P": "m * g",
            "m": "P / g",
            "g": "P / m"
        },
        variables: {
            "P": { name: "Peso",      si_unit: "N" },
            "m": { name: "Massa",     si_unit: "kg" },
            "g": { name: "Gravidade", si_unit: "m/s^2" }
        },
        constraints: ["m > 0", "g > 0"],
        description: "Força peso de um corpo."
    },
    {
        id: "friction_force",
        name: "Força de Atrito",
        category: "Física: Dinâmica",
        latex: "F_{at} = \\mu \\cdot N",
        computable: {
            "Fat": "mu * N",
            "mu":  "Fat / N",
            "N":   "Fat / mu"
        },
        variables: {
            "Fat": { name: "Força de Atrito",      si_unit: "N" },
            "mu":  { name: "Coef. de Atrito (μ)",  si_unit: "" },
            "N":   { name: "Força Normal",         si_unit: "N" }
        },
        constraints: ["mu > 0", "N > 0"],
        description: "Força de atrito cinético ou estático máximo."
    },
    {
        id: "elastic_force",
        name: "Força Elástica (Lei de Hooke)",
        category: "Física: Dinâmica",
        latex: "F_{el} = k \\cdot x",
        computable: {
            "F": "k * x",
            "k": "F / x",
            "x": "F / k"
        },
        variables: {
            "F": { name: "Força elástica",    si_unit: "N" },
            "k": { name: "Constante elástica", si_unit: "N/m" },
            "x": { name: "Deformação",        si_unit: "m" }
        },
        constraints: ["k > 0"],
        description: "Lei de Hooke — mola ou material elástico."
    },

    // ============================================================
    // TRABALHO, ENERGIA E POTÊNCIA
    // ============================================================
    {
        id: "work",
        name: "Trabalho Mecânico",
        category: "Física: Energia",
        latex: "W = F \\cdot d \\cdot \\cos\\theta",
        computable: {
            "W":     "F * d * cos(theta)",
            "F":     "W / (d * cos(theta))",
            "d":     "W / (F * cos(theta))",
            "theta": "acos(W / (F * d))"
        },
        variables: {
            "W":     { name: "Trabalho",      si_unit: "J" },
            "F":     { name: "Força",         si_unit: "N" },
            "d":     { name: "Deslocamento",  si_unit: "m" },
            "theta": { name: "Ângulo (rad)",  si_unit: "rad" }
        },
        description: "Trabalho realizado por uma força constante."
    },
    {
        id: "kinetic_energy",
        name: "Energia Cinética",
        category: "Física: Energia",
        latex: "E_c = \\frac{mv^2}{2}",
        computable: {
            "Ec": "0.5 * m * v^2",
            "m":  "(2 * Ec) / v^2",
            "v":  "sqrt((2 * Ec) / m)"
        },
        variables: {
            "Ec": { name: "Energia Cinética", si_unit: "J" },
            "m":  { name: "Massa",            si_unit: "kg" },
            "v":  { name: "Velocidade",       si_unit: "m/s" }
        },
        constraints: ["m > 0", "Ec >= 0"],
        description: "Energia associada ao movimento."
    },
    {
        id: "gravitational_potential_energy",
        name: "Energia Potencial Gravitacional",
        category: "Física: Energia",
        latex: "E_p = m \\cdot g \\cdot h",
        computable: {
            "Ep": "m * g * h",
            "m":  "Ep / (g * h)",
            "g":  "Ep / (m * h)",
            "h":  "Ep / (m * g)"
        },
        variables: {
            "Ep": { name: "Energia Potencial Grav.", si_unit: "J" },
            "m":  { name: "Massa",                  si_unit: "kg" },
            "g":  { name: "Gravidade",               si_unit: "m/s^2" },
            "h":  { name: "Altura",                  si_unit: "m" }
        },
        constraints: ["m > 0", "g > 0"],
        description: "Energia potencial gravitacional próxima à superfície."
    },
    {
        id: "elastic_potential_energy",
        name: "Energia Potencial Elástica",
        category: "Física: Energia",
        latex: "E_{el} = \\frac{k x^2}{2}",
        computable: {
            "Eel": "0.5 * k * x^2",
            "k":   "(2 * Eel) / x^2",
            "x":   "sqrt((2 * Eel) / k)"
        },
        variables: {
            "Eel": { name: "Energia Potencial Elástica", si_unit: "J" },
            "k":   { name: "Constante elástica",         si_unit: "N/m" },
            "x":   { name: "Deformação",                 si_unit: "m" }
        },
        constraints: ["k > 0", "Eel >= 0"],
        description: "Energia armazenada em uma mola deformada."
    },
    {
        id: "power",
        name: "Potência Mecânica",
        category: "Física: Energia",
        latex: "P = \\frac{W}{\\Delta t}",
        computable: {
            "P": "W / t",
            "W": "P * t",
            "t": "W / P"
        },
        variables: {
            "P": { name: "Potência",  si_unit: "W" },
            "W": { name: "Trabalho",  si_unit: "J" },
            "t": { name: "Tempo",     si_unit: "s" }
        },
        constraints: ["t > 0"],
        description: "Taxa de realização de trabalho."
    },

    // ============================================================
    // IMPULSO E QUANTIDADE DE MOVIMENTO
    // ============================================================
    {
        id: "linear_momentum",
        name: "Quantidade de Movimento",
        category: "Física: Impulso e Momento",
        latex: "Q = m \\cdot v",
        computable: {
            "Q": "m * v",
            "m": "Q / v",
            "v": "Q / m"
        },
        variables: {
            "Q": { name: "Quantidade de Movimento", si_unit: "kg·m/s" },
            "m": { name: "Massa",                   si_unit: "kg" },
            "v": { name: "Velocidade",              si_unit: "m/s" }
        },
        constraints: ["m > 0"],
        description: "Quantidade de movimento (momento linear)."
    },
    {
        id: "impulse",
        name: "Impulso",
        category: "Física: Impulso e Momento",
        latex: "I = F \\cdot \\Delta t",
        computable: {
            "I": "F * dt",
            "F": "I / dt",
            "dt": "I / F"
        },
        variables: {
            "I":  { name: "Impulso",  si_unit: "N·s" },
            "F":  { name: "Força",    si_unit: "N" },
            "dt": { name: "Δt (tempo)", si_unit: "s" }
        },
        constraints: ["dt > 0"],
        description: "Impulso de uma força constante."
    },

    // ============================================================
    // HIDROSTÁTICA
    // ============================================================
    {
        id: "pressure",
        name: "Pressão",
        category: "Física: Hidrostática",
        latex: "p = \\frac{F}{A}",
        computable: {
            "p": "F / A",
            "F": "p * A",
            "A": "F / p"
        },
        variables: {
            "p": { name: "Pressão", si_unit: "Pa" },
            "F": { name: "Força",   si_unit: "N" },
            "A": { name: "Área",    si_unit: "m^2" }
        },
        constraints: ["A > 0"],
        description: "Pressão exercida por uma força sobre uma área."
    },
    {
        id: "density",
        name: "Densidade",
        category: "Física: Hidrostática",
        latex: "\\rho = \\frac{m}{V}",
        computable: {
            "rho": "m / V",
            "m":   "rho * V",
            "V":   "m / rho"
        },
        variables: {
            "rho": { name: "Densidade", si_unit: "kg/m^3" },
            "m":   { name: "Massa",     si_unit: "kg" },
            "V":   { name: "Volume",    si_unit: "m^3" }
        },
        constraints: ["V > 0", "rho > 0"],
        description: "Massa específica de um material."
    },
    {
        id: "stevin",
        name: "Teorema de Stevin — Pressão Total",
        category: "Física: Hidrostática",
        latex: "p_t = p_{atm} + \\rho g h",
        computable: {
            "pt":   "patm + rho * g * h",
            "patm": "pt - rho * g * h",
            "h":    "(pt - patm) / (rho * g)",
            "rho":  "(pt - patm) / (g * h)"
        },
        variables: {
            "pt":   { name: "Pressão total",  si_unit: "Pa" },
            "patm": { name: "Pressão atm.",   si_unit: "Pa" },
            "rho":  { name: "Densidade (ρ)",  si_unit: "kg/m^3" },
            "g":    { name: "Gravidade",      si_unit: "m/s^2" },
            "h":    { name: "Profundidade",   si_unit: "m" }
        },
        constraints: ["h >= 0", "rho > 0"],
        description: "Pressão em um ponto de um fluido em repouso."
    },
    {
        id: "buoyancy",
        name: "Empuxo (Arquimedes)",
        category: "Física: Hidrostática",
        latex: "E = \\rho_f \\cdot g \\cdot V_d",
        computable: {
            "E":   "rho * g * Vd",
            "rho": "E / (g * Vd)",
            "Vd":  "E / (rho * g)",
            "g":   "E / (rho * Vd)"
        },
        variables: {
            "E":   { name: "Empuxo",              si_unit: "N" },
            "rho": { name: "Densidade do fluido", si_unit: "kg/m^3" },
            "g":   { name: "Gravidade",           si_unit: "m/s^2" },
            "Vd":  { name: "Volume deslocado",    si_unit: "m^3" }
        },
        constraints: ["rho > 0", "g > 0", "Vd > 0"],
        description: "Força de empuxo pelo Princípio de Arquimedes."
    },

    // ============================================================
    // GRAVITAÇÃO UNIVERSAL
    // ============================================================
    {
        id: "universal_gravitation",
        name: "Lei da Gravitação Universal",
        category: "Física: Gravitação",
        latex: "F_G = G \\frac{M_1 M_2}{d^2}",
        computable: {
            "FG": "(G * M1 * M2) / d^2",
            "M1": "(FG * d^2) / (G * M2)",
            "M2": "(FG * d^2) / (G * M1)",
            "d":  "sqrt((G * M1 * M2) / FG)"
        },
        variables: {
            "FG": { name: "Força gravitacional", si_unit: "N" },
            "G":  { name: "Const. gravitacional (G)", si_unit: "m^3/(kg·s^2)" },
            "M1": { name: "Massa 1",             si_unit: "kg" },
            "M2": { name: "Massa 2",             si_unit: "kg" },
            "d":  { name: "Distância",           si_unit: "m" }
        },
        constraints: ["d > 0", "M1 > 0", "M2 > 0"],
        description: "Força de atração gravitacional entre dois corpos."
    },
    {
        id: "kepler_third",
        name: "3ª Lei de Kepler",
        category: "Física: Gravitação",
        latex: "T^2 = K \\cdot r^3",
        computable: {
            "T": "sqrt(K * r^3)",
            "r": "cbrt(T^2 / K)",
            "K": "T^2 / r^3"
        },
        variables: {
            "T": { name: "Período orbital",    si_unit: "s" },
            "r": { name: "Raio médio orbital", si_unit: "m" },
            "K": { name: "Constante de Kepler", si_unit: "s^2/m^3" }
        },
        constraints: ["T > 0", "r > 0", "K > 0"],
        description: "Terceira Lei de Kepler — relação período-raio."
    },

    // ============================================================
    // TERMOLOGIA E TERMODINÂMICA
    // ============================================================
    {
        id: "thermal_expansion_linear",
        name: "Dilatação Térmica Linear",
        category: "Física: Termologia",
        latex: "\\Delta L = L_0 \\cdot \\alpha \\cdot \\Delta T",
        computable: {
            "dL":    "L0 * alpha * dT",
            "L0":    "dL / (alpha * dT)",
            "alpha": "dL / (L0 * dT)",
            "dT":    "dL / (L0 * alpha)"
        },
        variables: {
            "dL":    { name: "Variação de comprimento (ΔL)", si_unit: "m" },
            "L0":    { name: "Comprimento inicial",          si_unit: "m" },
            "alpha": { name: "Coef. de dilatação linear (α)", si_unit: "1/K" },
            "dT":    { name: "Variação de temperatura (ΔT)", si_unit: "K" }
        },
        description: "Dilatação linear de sólidos."
    },
    {
        id: "thermal_expansion_area",
        name: "Dilatação Térmica Superficial",
        category: "Física: Termologia",
        latex: "\\Delta A = A_0 \\cdot \\beta \\cdot \\Delta T",
        computable: {
            "dA":   "A0 * beta * dT",
            "A0":   "dA / (beta * dT)",
            "beta": "dA / (A0 * dT)",
            "dT":   "dA / (A0 * beta)"
        },
        variables: {
            "dA":   { name: "Variação de área (ΔA)",   si_unit: "m^2" },
            "A0":   { name: "Área inicial",             si_unit: "m^2" },
            "beta": { name: "Coef. superficial (β)",   si_unit: "1/K" },
            "dT":   { name: "Variação de temp. (ΔT)",  si_unit: "K" }
        },
        description: "Dilatação superficial. β ≈ 2α."
    },
    {
        id: "thermal_expansion_volume",
        name: "Dilatação Térmica Volumétrica",
        category: "Física: Termologia",
        latex: "\\Delta V = V_0 \\cdot \\gamma \\cdot \\Delta T",
        computable: {
            "dV":    "V0 * gamma * dT",
            "V0":    "dV / (gamma * dT)",
            "gamma": "dV / (V0 * dT)",
            "dT":    "dV / (V0 * gamma)"
        },
        variables: {
            "dV":    { name: "Variação de volume (ΔV)", si_unit: "m^3" },
            "V0":    { name: "Volume inicial",           si_unit: "m^3" },
            "gamma": { name: "Coef. volumétrico (γ)",   si_unit: "1/K" },
            "dT":    { name: "Variação de temp. (ΔT)",  si_unit: "K" }
        },
        description: "Dilatação volumétrica. γ ≈ 3α."
    },
    {
        id: "heat_capacity",
        name: "Capacidade Térmica",
        category: "Física: Termologia",
        latex: "C = m \\cdot c",
        computable: {
            "C": "m * c",
            "m": "C / c",
            "c": "C / m"
        },
        variables: {
            "C": { name: "Capacidade Térmica",     si_unit: "J/K" },
            "m": { name: "Massa",                  si_unit: "kg" },
            "c": { name: "Calor específico",       si_unit: "J/(kg·K)" }
        },
        constraints: ["m > 0"],
        description: "Capacidade de um corpo absorver calor."
    },
    {
        id: "sensible_heat",
        name: "Calor Sensível",
        category: "Física: Termologia",
        latex: "Q = m \\cdot c \\cdot \\Delta T",
        computable: {
            "Q":  "m * c * dT",
            "m":  "Q / (c * dT)",
            "c":  "Q / (m * dT)",
            "dT": "Q / (m * c)"
        },
        variables: {
            "Q":  { name: "Calor (Q)",             si_unit: "J" },
            "m":  { name: "Massa",                 si_unit: "kg" },
            "c":  { name: "Calor específico",      si_unit: "J/(kg·K)" },
            "dT": { name: "Variação de temp. (ΔT)", si_unit: "K" }
        },
        constraints: ["m > 0", "c > 0"],
        description: "Calor trocado sem mudança de fase."
    },
    {
        id: "latent_heat",
        name: "Calor Latente",
        category: "Física: Termologia",
        latex: "Q = m \\cdot L",
        computable: {
            "Q": "m * L",
            "m": "Q / L",
            "L": "Q / m"
        },
        variables: {
            "Q": { name: "Calor (Q)",   si_unit: "J" },
            "m": { name: "Massa",       si_unit: "kg" },
            "L": { name: "Calor latente", si_unit: "J/kg" }
        },
        constraints: ["m > 0", "L > 0"],
        description: "Calor trocado em mudanças de fase."
    },
    {
        id: "first_law_thermo",
        name: "1ª Lei da Termodinâmica",
        category: "Física: Termodinâmica",
        latex: "\\Delta U = Q - W",
        computable: {
            "dU": "Q - W",
            "Q":  "dU + W",
            "W":  "Q - dU"
        },
        variables: {
            "dU": { name: "Variação de energia interna (ΔU)", si_unit: "J" },
            "Q":  { name: "Calor absorvido",                  si_unit: "J" },
            "W":  { name: "Trabalho realizado",               si_unit: "J" }
        },
        description: "Primeira Lei da Termodinâmica."
    },
    {
        id: "thermal_efficiency",
        name: "Rendimento da Máquina Térmica",
        category: "Física: Termodinâmica",
        latex: "\\eta = \\frac{W}{Q_q}",
        computable: {
            "eta": "W / Qq",
            "W":   "eta * Qq",
            "Qq":  "W / eta"
        },
        variables: {
            "eta": { name: "Rendimento (η)",      si_unit: "" },
            "W":   { name: "Trabalho",            si_unit: "J" },
            "Qq":  { name: "Calor fonte quente",  si_unit: "J" }
        },
        constraints: ["Qq > 0", "eta > 0", "eta <= 1"],
        description: "Eficiência de uma máquina térmica."
    },
    {
        id: "entropy_variation",
        name: "Variação de Entropia",
        category: "Física: Termodinâmica",
        latex: "\\Delta S = \\frac{\\Delta Q}{T}",
        computable: {
            "dS": "dQ / T",
            "dQ": "dS * T",
            "T":  "dQ / dS"
        },
        variables: {
            "dS": { name: "Variação de Entropia (ΔS)", si_unit: "J/K" },
            "dQ": { name: "Calor trocado (ΔQ)",        si_unit: "J" },
            "T":  { name: "Temperatura",               si_unit: "K" }
        },
        constraints: ["T > 0"],
        description: "Variação de entropia em processo reversível."
    },

    // ============================================================
    // ONDAS E ÓTICA
    // ============================================================
    {
        id: "wave_speed",
        name: "Velocidade de Propagação de Onda",
        category: "Física: Ondas",
        latex: "v = \\lambda \\cdot f",
        computable: {
            "v":      "lambda * f",
            "lambda": "v / f",
            "f":      "v / lambda"
        },
        variables: {
            "v":      { name: "Velocidade da onda",   si_unit: "m/s" },
            "lambda": { name: "Comprimento de onda (λ)", si_unit: "m" },
            "f":      { name: "Frequência",           si_unit: "Hz" }
        },
        constraints: ["lambda > 0", "f > 0"],
        description: "Relação fundamental das ondas."
    },
    {
        id: "gauss_optics",
        name: "Equação de Gauss (Espelhos e Lentes)",
        category: "Física: Ótica",
        latex: "\\frac{1}{f} = \\frac{1}{p} + \\frac{1}{p'}",
        computable: {
            "f":  "1 / (1/p + 1/pp)",
            "p":  "1 / (1/f - 1/pp)",
            "pp": "1 / (1/f - 1/p)"
        },
        variables: {
            "f":  { name: "Distância focal",   si_unit: "m" },
            "p":  { name: "Objeto (p)",        si_unit: "m" },
            "pp": { name: "Imagem (p')",       si_unit: "m" }
        },
        description: "Equação conjugada de Gauss para espelhos e lentes."
    },
    {
        id: "linear_magnification",
        name: "Aumento Linear",
        category: "Física: Ótica",
        latex: "A = -\\frac{p'}{p}",
        computable: {
            "A":  "-(pp / p)",
            "pp": "-(A * p)",
            "p":  "-(pp / A)"
        },
        variables: {
            "A":  { name: "Aumento linear",  si_unit: "" },
            "pp": { name: "Imagem (p')",     si_unit: "m" },
            "p":  { name: "Objeto (p)",      si_unit: "m" }
        },
        description: "Ampliação transversal em espelhos e lentes."
    },
    {
        id: "snell_descartes",
        name: "Lei de Snell-Descartes",
        category: "Física: Ótica",
        latex: "n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2",
        computable: {
            "n1":     "(n2 * sin(theta2)) / sin(theta1)",
            "n2":     "(n1 * sin(theta1)) / sin(theta2)",
            "theta1": "asin((n2 * sin(theta2)) / n1)",
            "theta2": "asin((n1 * sin(theta1)) / n2)"
        },
        variables: {
            "n1":     { name: "Índice de refração 1",    si_unit: "" },
            "n2":     { name: "Índice de refração 2",    si_unit: "" },
            "theta1": { name: "Ângulo incidente (rad)",  si_unit: "rad" },
            "theta2": { name: "Ângulo refratado (rad)",  si_unit: "rad" }
        },
        constraints: ["n1 > 0", "n2 > 0"],
        description: "Lei de Snell-Descartes para refração da luz."
    },

    // ============================================================
    // ELETROSTÁTICA
    // ============================================================
    {
        id: "coulombs_law",
        name: "Lei de Coulomb",
        category: "Física: Eletrostática",
        latex: "F_e = k \\frac{|Q_1 Q_2|}{d^2}",
        computable: {
            "Fe": "(k * abs(Q1) * abs(Q2)) / d^2",
            "Q1": "sqrt(Fe * d^2 / (k * abs(Q2)))",
            "d":  "sqrt((k * abs(Q1) * abs(Q2)) / Fe)"
        },
        variables: {
            "Fe": { name: "Força eletrostática",   si_unit: "N" },
            "k":  { name: "Constante de Coulomb",  si_unit: "N·m^2/C^2" },
            "Q1": { name: "Carga 1 (Q₁)",          si_unit: "C" },
            "Q2": { name: "Carga 2 (Q₂)",          si_unit: "C" },
            "d":  { name: "Distância",             si_unit: "m" }
        },
        constraints: ["d > 0"],
        description: "Força entre duas cargas pontuais."
    },
    {
        id: "electric_force_field",
        name: "Força Elétrica via Campo",
        category: "Física: Eletrostática",
        latex: "F = q \\cdot E",
        computable: {
            "F": "q * E",
            "q": "F / E",
            "E": "F / q"
        },
        variables: {
            "F": { name: "Força elétrica",  si_unit: "N" },
            "q": { name: "Carga (q)",       si_unit: "C" },
            "E": { name: "Campo elétrico",  si_unit: "N/C" }
        },
        description: "Força sobre uma carga em um campo elétrico."
    },
    {
        id: "electric_potential",
        name: "Potencial Elétrico",
        category: "Física: Eletrostática",
        latex: "V = k \\cdot \\frac{Q}{d}",
        computable: {
            "V": "k * Q / d",
            "Q": "V * d / k",
            "d": "k * Q / V"
        },
        variables: {
            "V": { name: "Potencial elétrico",   si_unit: "V" },
            "k": { name: "Constante de Coulomb", si_unit: "N·m^2/C^2" },
            "Q": { name: "Carga (Q)",            si_unit: "C" },
            "d": { name: "Distância",            si_unit: "m" }
        },
        constraints: ["d > 0"],
        description: "Potencial elétrico de uma carga pontual."
    },

    // ============================================================
    // CORRENTE E CIRCUITOS
    // ============================================================
    {
        id: "ohms_law",
        name: "Lei de Ohm",
        category: "Física: Eletricidade",
        latex: "U = R \\cdot i",
        computable: {
            "U": "R * i",
            "R": "U / i",
            "i": "U / R"
        },
        variables: {
            "U": { name: "Tensão (U)", si_unit: "V" },
            "R": { name: "Resistência", si_unit: "Ω" },
            "i": { name: "Corrente (i)", si_unit: "A" }
        },
        constraints: ["R > 0"],
        description: "Lei de Ohm — relação tensão, resistência e corrente."
    },
    {
        id: "electric_power_ui",
        name: "Potência Elétrica (P = U·i)",
        category: "Física: Eletricidade",
        latex: "P = U \\cdot i",
        computable: {
            "P": "U * i",
            "U": "P / i",
            "i": "P / U"
        },
        variables: {
            "P": { name: "Potência elétrica", si_unit: "W" },
            "U": { name: "Tensão",            si_unit: "V" },
            "i": { name: "Corrente",          si_unit: "A" }
        },
        description: "Potência elétrica dissipada/consumida."
    },
    {
        id: "joule_effect",
        name: "Efeito Joule (P = R·i²)",
        category: "Física: Eletricidade",
        latex: "P = R \\cdot i^2",
        computable: {
            "P": "R * i^2",
            "R": "P / i^2",
            "i": "sqrt(P / R)"
        },
        variables: {
            "P": { name: "Potência dissipada", si_unit: "W" },
            "R": { name: "Resistência",        si_unit: "Ω" },
            "i": { name: "Corrente",           si_unit: "A" }
        },
        constraints: ["R > 0"],
        description: "Potência dissipada por efeito Joule."
    },
    {
        id: "electric_energy",
        name: "Energia Elétrica",
        category: "Física: Eletricidade",
        latex: "E = P \\cdot \\Delta t",
        computable: {
            "E": "P * t",
            "P": "E / t",
            "t": "E / P"
        },
        variables: {
            "E": { name: "Energia elétrica", si_unit: "J" },
            "P": { name: "Potência",         si_unit: "W" },
            "t": { name: "Tempo",            si_unit: "s" }
        },
        constraints: ["t > 0"],
        description: "Energia consumida por um dispositivo elétrico."
    },
    {
        id: "capacitance",
        name: "Capacitância",
        category: "Física: Eletricidade",
        latex: "C = \\frac{Q}{U}",
        computable: {
            "C": "Q / U",
            "Q": "C * U",
            "U": "Q / C"
        },
        variables: {
            "C": { name: "Capacitância", si_unit: "F" },
            "Q": { name: "Carga",        si_unit: "C" },
            "U": { name: "Tensão",       si_unit: "V" }
        },
        constraints: ["C > 0", "U > 0"],
        description: "Capacidade de armazenar carga elétrica."
    },

    // ============================================================
    // ELETROMAGNETISMO
    // ============================================================
    {
        id: "magnetic_force_charge",
        name: "Força Magnética em Carga",
        category: "Física: Eletromagnetismo",
        latex: "F_m = B \\cdot |q| \\cdot v \\cdot \\sin\\theta",
        computable: {
            "Fm": "B * abs(q) * v * sin(theta)",
            "B":  "Fm / (abs(q) * v * sin(theta))",
            "v":  "Fm / (B * abs(q) * sin(theta))"
        },
        variables: {
            "Fm":    { name: "Força magnética", si_unit: "N" },
            "B":     { name: "Campo magnético (B)", si_unit: "T" },
            "q":     { name: "Carga (q)",       si_unit: "C" },
            "v":     { name: "Velocidade",      si_unit: "m/s" },
            "theta": { name: "Ângulo (rad)",    si_unit: "rad" }
        },
        description: "Força de Lorentz sobre uma carga em movimento."
    },
    {
        id: "magnetic_force_wire",
        name: "Força Magnética em Fio",
        category: "Física: Eletromagnetismo",
        latex: "F_m = B \\cdot i \\cdot l \\cdot \\sin\\theta",
        computable: {
            "Fm": "B * i * l * sin(theta)",
            "B":  "Fm / (i * l * sin(theta))",
            "i":  "Fm / (B * l * sin(theta))",
            "l":  "Fm / (B * i * sin(theta))"
        },
        variables: {
            "Fm":    { name: "Força magnética", si_unit: "N" },
            "B":     { name: "Campo magnético (B)", si_unit: "T" },
            "i":     { name: "Corrente",        si_unit: "A" },
            "l":     { name: "Comprimento do fio", si_unit: "m" },
            "theta": { name: "Ângulo (rad)",    si_unit: "rad" }
        },
        description: "Força magnética sobre um fio condutor."
    },
    {
        id: "magnetic_flux",
        name: "Fluxo Magnético",
        category: "Física: Eletromagnetismo",
        latex: "\\varphi = B \\cdot A \\cdot \\cos\\theta",
        computable: {
            "phi":   "B * A * cos(theta)",
            "B":     "phi / (A * cos(theta))",
            "A":     "phi / (B * cos(theta))",
            "theta": "acos(phi / (B * A))"
        },
        variables: {
            "phi":   { name: "Fluxo magnético (φ)", si_unit: "Wb" },
            "B":     { name: "Campo magnético (B)",  si_unit: "T" },
            "A":     { name: "Área",                si_unit: "m^2" },
            "theta": { name: "Ângulo (rad)",         si_unit: "rad" }
        },
        description: "Fluxo de campo magnético através de uma superfície."
    },
    {
        id: "faraday_law",
        name: "Lei de Faraday-Neumann",
        category: "Física: Eletromagnetismo",
        latex: "\\varepsilon = -\\frac{\\Delta\\varphi}{\\Delta t}",
        computable: {
            "eps": "-(dphi / dt)",
            "dphi": "-(eps * dt)",
            "dt":  "-(dphi / eps)"
        },
        variables: {
            "eps":  { name: "FEM induzida (ε)", si_unit: "V" },
            "dphi": { name: "Var. fluxo (Δφ)",  si_unit: "Wb" },
            "dt":   { name: "Intervalo de tempo (Δt)", si_unit: "s" }
        },
        constraints: ["dt > 0"],
        description: "Força Eletromotriz induzida — Lei de Faraday."
    }

];

if (typeof engine !== 'undefined') {
    engine.registerCatalog(physicsCatalog);
}
