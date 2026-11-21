/**
 * unitSystem.js — Sistema Universal de Unidades, Conversões e Análise Dimensional
 * 
 * Implementa infraestrutura centralizada para:
 * - 24 Prefixos oficiais do SI (quetta a quecto) + Prefixos binários IEC (KiB a PiB)
 * - 7 Grandezas fundamentais do SI ([L, M, T, I, Θ, N, J]) e suas grandezas derivadas
 * - Mapeamento e identificação dimensional automática para variáveis de fórmulas
 * - Conversão interna precisa para unidades de referência SI
 * - Suporte a unidades especiais (temperaturas afins, logarítmicas, ângulos, dados, astronômicas, atômicas)
 * - Parser e validador de unidades compostas (ex: kg·m/s^2 = N, J/s = W, N/m^2 = Pa, A·s = C)
 * - Validação estrita de compatibilidade dimensional
 * - Renderização de unidades em LaTeX de alta fidelidade
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.UnitSystem = factory();
        root.unitSystem = new root.UnitSystem();
    }
}(typeof self !== 'undefined' ? self : this, function () {

    // =========================================================================
    // 1. PREFIXOS OFICIAIS DO SI E IEC
    // =========================================================================

    const SI_PREFIXES = [
        { name: "quetta", symbol: "Q",  exp: 30,  factor: 1e30 },
        { name: "ronna",  symbol: "R",  exp: 27,  factor: 1e27 },
        { name: "yotta",  symbol: "Y",  exp: 24,  factor: 1e24 },
        { name: "zetta",  symbol: "Z",  exp: 21,  factor: 1e21 },
        { name: "exa",    symbol: "E",  exp: 18,  factor: 1e18 },
        { name: "peta",   symbol: "P",  exp: 15,  factor: 1e15 },
        { name: "tera",   symbol: "T",  exp: 12,  factor: 1e12 },
        { name: "giga",   symbol: "G",  exp: 9,   factor: 1e9 },
        { name: "mega",   symbol: "M",  exp: 6,   factor: 1e6 },
        { name: "quilo",  symbol: "k",  exp: 3,   factor: 1e3 },
        { name: "hecto",  symbol: "h",  exp: 2,   factor: 1e2 },
        { name: "deca",   symbol: "da", exp: 1,   factor: 1e1 },
        { name: "deci",   symbol: "d",  exp: -1,  factor: 1e-1 },
        { name: "centi",  symbol: "c",  exp: -2,  factor: 1e-2 },
        { name: "mili",   symbol: "m",  exp: -3,  factor: 1e-3 },
        { name: "micro",  symbol: "μ",  exp: -6,  factor: 1e-6 }, // micro oficial
        { name: "nano",   symbol: "n",  exp: -9,  factor: 1e-9 },
        { name: "pico",   symbol: "p",  exp: -12, factor: 1e-12 },
        { name: "femto",  symbol: "f",  exp: -15, factor: 1e-15 },
        { name: "atto",   symbol: "a",  exp: -18, factor: 1e-18 },
        { name: "zepto",  symbol: "z",  exp: -21, factor: 1e-21 },
        { name: "yocto",  symbol: "y",  exp: -24, factor: 1e-24 },
        { name: "ronto",  symbol: "r",  exp: -27, factor: 1e-27 },
        { name: "quecto", symbol: "q",  exp: -30, factor: 1e-30 }
    ];

    const IEC_PREFIXES = [
        { name: "kibi", symbol: "Ki", factor: 1024 },
        { name: "mebi", symbol: "Mi", factor: 1048576 },
        { name: "gibi", symbol: "Gi", factor: 1073741824 },
        { name: "tebi", symbol: "Ti", factor: 1099511627776 },
        { name: "pebi", symbol: "Pi", factor: 1125899906842624 },
        { name: "exbi", symbol: "Ei", factor: 1152921504606846976 }
    ];

    // =========================================================================
    // 2. DIMENSÕES BÁSICAS [L, M, T, I, Theta, N, J, Angle]
    // =========================================================================

    function createDim(L = 0, M = 0, T = 0, I = 0, Th = 0, N = 0, J = 0, Ang = 0) {
        return { L, M, T, I, Th, N, J, Ang };
    }

    function dimEqual(d1, d2) {
        if (!d1 || !d2) return false;
        return (d1.L || 0) === (d2.L || 0) &&
               (d1.M || 0) === (d2.M || 0) &&
               (d1.T || 0) === (d2.T || 0) &&
               (d1.I || 0) === (d2.I || 0) &&
               (d1.Th || 0) === (d2.Th || 0) &&
               (d1.N || 0) === (d2.N || 0) &&
               (d1.J || 0) === (d2.J || 0) &&
               (d1.Ang || 0) === (d2.Ang || 0);
    }

    function dimToString(dim) {
        if (!dim) return "Adimensional";
        const parts = [];
        if (dim.L) parts.push(`L^${dim.L}`);
        if (dim.M) parts.push(`M^${dim.M}`);
        if (dim.T) parts.push(`T^${dim.T}`);
        if (dim.I) parts.push(`I^${dim.I}`);
        if (dim.Th) parts.push(`Θ^${dim.Th}`);
        if (dim.N) parts.push(`N^${dim.N}`);
        if (dim.J) parts.push(`J^${dim.J}`);
        if (dim.Ang) parts.push(`rad^${dim.Ang}`);
        return parts.length > 0 ? parts.join("·") : "Adimensional";
    }

    // =========================================================================
    // 3. CATÁLOGO CENTRAL DE GRANDEZAS E UNIDADES
    // =========================================================================

    const QUANTITY_DEFS = {
        comprimento: {
            id: "comprimento",
            name: "Comprimento / Distância",
            dimension: createDim(1, 0, 0, 0, 0, 0, 0),
            siBaseUnit: "m",
            units: [
                { symbol: "m", name: "Metro (m)", factor: 1, isBase: true },
                { symbol: "km", name: "Quilômetro (km)", factor: 1e3 },
                { symbol: "hm", name: "Hectômetro (hm)", factor: 1e2 },
                { symbol: "dam", name: "Decâmetro (dam)", factor: 1e1 },
                { symbol: "dm", name: "Decímetro (dm)", factor: 1e-1 },
                { symbol: "cm", name: "Centímetro (cm)", factor: 1e-2 },
                { symbol: "mm", name: "Milímetro (mm)", factor: 1e-3 },
                { symbol: "μm", name: "Micrômetro (μm)", factor: 1e-6 },
                { symbol: "nm", name: "Nanômetro (nm)", factor: 1e-9 },
                { symbol: "pm", name: "Picômetro (pm)", factor: 1e-12 },
                { symbol: "fm", name: "Femtômetro (fm)", factor: 1e-15 },
                { symbol: "Å", name: "Angstrom (Å)", factor: 1e-10 },
                { symbol: "in", name: "Polegada (in)", factor: 0.0254 },
                { symbol: "ft", name: "Pé (ft)", factor: 0.3048 },
                { symbol: "yd", name: "Jarda (yd)", factor: 0.9144 },
                { symbol: "mi", name: "Milha terrestre (mi)", factor: 1609.344 },
                { symbol: "nmi", name: "Milha náutica (nmi)", factor: 1852 },
                { symbol: "UA", name: "Unidade Astronômica (UA)", factor: 1.495978707e11 },
                { symbol: "ly", name: "Ano-luz (ly)", factor: 9.4607304725808e15 },
                { symbol: "pc", name: "Parsec (pc)", factor: 3.08567758149137e16 }
            ]
        },

        massa: {
            id: "massa",
            name: "Massa",
            dimension: createDim(0, 1, 0, 0, 0, 0, 0),
            siBaseUnit: "kg",
            units: [
                { symbol: "kg", name: "Quilograma (kg)", factor: 1, isBase: true },
                { symbol: "g", name: "Grama (g)", factor: 1e-3 },
                { symbol: "mg", name: "Miligrama (mg)", factor: 1e-6 },
                { symbol: "μg", name: "Micrograma (μg)", factor: 1e-9 },
                { symbol: "ng", name: "Nanograma (ng)", factor: 1e-12 },
                { symbol: "pg", name: "Picograma (pg)", factor: 1e-15 },
                { symbol: "hg", name: "Hectograma (hg)", factor: 0.1 },
                { symbol: "dag", name: "Decagrama (dag)", factor: 0.01 },
                { symbol: "dg", name: "Decigrama (dg)", factor: 1e-4 },
                { symbol: "cg", name: "Centigrama (cg)", factor: 1e-5 },
                { symbol: "t", name: "Tonelada métrica (t)", factor: 1000 },
                { symbol: "kt", name: "Quilotonelada (kt)", factor: 1e6 },
                { symbol: "Mt", name: "Megatonelada (Mt)", factor: 1e9 },
                { symbol: "lb", name: "Libra (lb)", factor: 0.45359237 },
                { symbol: "oz", name: "Onça (oz)", factor: 0.028349523125 },
                { symbol: "ton_us", name: "Tonelada curta (US)", factor: 907.18474 },
                { symbol: "ton_uk", name: "Tonelada longa (UK)", factor: 1016.0469088 },
                { symbol: "@", name: "Arroba (@)", factor: 15 },
                { symbol: "gr", name: "Grão / Grain (gr)", factor: 6.479891e-5 },
                { symbol: "u", name: "Unidade de massa atômica (u / Da)", factor: 1.66053906660e-27 }
            ]
        },

        tempo: {
            id: "tempo",
            name: "Tempo",
            dimension: createDim(0, 0, 1, 0, 0, 0, 0),
            siBaseUnit: "s",
            units: [
                { symbol: "s", name: "Segundo (s)", factor: 1, isBase: true },
                { symbol: "ms", name: "Milissegundo (ms)", factor: 1e-3 },
                { symbol: "μs", name: "Microssegundo (μs)", factor: 1e-6 },
                { symbol: "ns", name: "Nanossegundo (ns)", factor: 1e-9 },
                { symbol: "ps", name: "Picossegundo (ps)", factor: 1e-12 },
                { symbol: "fs", name: "Femtossegundo (fs)", factor: 1e-15 },
                { symbol: "min", name: "Minuto (min)", factor: 60 },
                { symbol: "h", name: "Hora (h)", factor: 3600 },
                { symbol: "d", name: "Dia (d)", factor: 86400 },
                { symbol: "semana", name: "Semana", factor: 604800 },
                { symbol: "mes", name: "Mês médio (30.44 d)", factor: 2629746 },
                { symbol: "ano", name: "Ano gregoriano (365.24 d)", factor: 31556952 }
            ]
        },

        velocidade: {
            id: "velocidade",
            name: "Velocidade",
            dimension: createDim(1, 0, -1, 0, 0, 0, 0),
            siBaseUnit: "m/s",
            units: [
                { symbol: "m/s", name: "Metro por segundo (m/s)", factor: 1, isBase: true },
                { symbol: "km/h", name: "Quilômetro por hora (km/h)", factor: 1 / 3.6 },
                { symbol: "cm/s", name: "Centímetro por segundo (cm/s)", factor: 0.01 },
                { symbol: "mm/s", name: "Milímetro por segundo (mm/s)", factor: 0.001 },
                { symbol: "km/s", name: "Quilômetro por segundo (km/s)", factor: 1000 },
                { symbol: "mph", name: "Milha por hora (mph / mi/h)", factor: 0.44704 },
                { symbol: "ft/s", name: "Pé por segundo (ft/s)", factor: 0.3048 },
                { symbol: "nó", name: "Nó náutico (kt)", factor: 0.5144444444444445 },
                { symbol: "Mach", name: "Mach (ar 15°C nível mar, 340.3 m/s)", factor: 340.3 },
                { symbol: "c", name: "Velocidade da luz (c)", factor: 299792458 }
            ]
        },

        aceleracao: {
            id: "aceleracao",
            name: "Aceleração",
            dimension: createDim(1, 0, -2, 0, 0, 0, 0),
            siBaseUnit: "m/s^2",
            units: [
                { symbol: "m/s²", name: "Metro por segundo ao quadrado (m/s²)", factor: 1, isBase: true },
                { symbol: "m/s^2", name: "m/s²", factor: 1 },
                { symbol: "cm/s²", name: "Centímetro por segundo ao quadrado (Gal)", factor: 0.01 },
                { symbol: "km/h²", name: "Quilômetro por hora ao quadrado (km/h²)", factor: 1 / 12960 },
                { symbol: "km/s²", name: "Quilômetro por segundo ao quadrado (km/s²)", factor: 1000 },
                { symbol: "ft/s²", name: "Pé por segundo ao quadrado (ft/s²)", factor: 0.3048 },
                { symbol: "g", name: "Gravidade padrão (g = 9.80665 m/s²)", factor: 9.80665 }
            ]
        },

        forca: {
            id: "forca",
            name: "Força",
            dimension: createDim(1, 1, -2, 0, 0, 0, 0),
            siBaseUnit: "N",
            units: [
                { symbol: "N", name: "Newton (N)", factor: 1, isBase: true },
                { symbol: "kN", name: "Quilonewton (kN)", factor: 1e3 },
                { symbol: "MN", name: "Meganewton (MN)", factor: 1e6 },
                { symbol: "mN", name: "Milinewton (mN)", factor: 1e-3 },
                { symbol: "μN", name: "Micronewton (μN)", factor: 1e-6 },
                { symbol: "nN", name: "Nanonewton (nN)", factor: 1e-9 },
                { symbol: "pN", name: "Piconewton (pN)", factor: 1e-12 },
                { symbol: "dyn", name: "Dina (dyn)", factor: 1e-5 },
                { symbol: "kgf", name: "Quilograma-força (kgf)", factor: 9.80665 },
                { symbol: "tf", name: "Tonelada-força (tf)", factor: 9806.65 },
                { symbol: "lbf", name: "Libra-força (lbf)", factor: 4.4482216152605 }
            ]
        },

        torque: {
            id: "torque",
            name: "Torque / Momento de Força",
            dimension: createDim(2, 1, -2, 0, 0, 0, 0),
            siBaseUnit: "N·m",
            units: [
                { symbol: "N·m", name: "Newton-metro (N·m)", factor: 1, isBase: true },
                { symbol: "N*m", name: "Newton-metro (N*m)", factor: 1 },
                { symbol: "kN·m", name: "Quilonewton-metro (kN·m)", factor: 1e3 },
                { symbol: "mN·m", name: "Milinewton-metro (mN·m)", factor: 1e-3 },
                { symbol: "μN·m", name: "Micronewton-metro (μN·m)", factor: 1e-6 },
                { symbol: "kgf·m", name: "Quilograma-força metro (kgf·m)", factor: 9.80665 },
                { symbol: "lbf·ft", name: "Libra-força pé (lbf·ft)", factor: 1.3558179483314004 },
                { symbol: "lbf·in", name: "Libra-força polegada (lbf·in)", factor: 0.1129848290276167 },
                { symbol: "dyn·cm", name: "Dina-centímetro (dyn·cm)", factor: 1e-7 }
            ]
        },

        energia: {
            id: "energia",
            name: "Energia / Trabalho / Calor",
            dimension: createDim(2, 1, -2, 0, 0, 0, 0),
            siBaseUnit: "J",
            units: [
                { symbol: "J", name: "Joule (J)", factor: 1, isBase: true },
                { symbol: "kJ", name: "Quilojoule (kJ)", factor: 1e3 },
                { symbol: "MJ", name: "Megajoule (MJ)", factor: 1e6 },
                { symbol: "GJ", name: "Gigajoule (GJ)", factor: 1e9 },
                { symbol: "TJ", name: "Terajoule (TJ)", factor: 1e12 },
                { symbol: "mJ", name: "Milijoule (mJ)", factor: 1e-3 },
                { symbol: "μJ", name: "Microjoule (μJ)", factor: 1e-6 },
                { symbol: "cal", name: "Caloria termoquímica (cal)", factor: 4.184 },
                { symbol: "kcal", name: "Quilocaloria (kcal)", factor: 4184 },
                { symbol: "eV", name: "Elétron-volt (eV)", factor: 1.602176634e-19 },
                { symbol: "keV", name: "Quiloelétron-volt (keV)", factor: 1.602176634e-16 },
                { symbol: "MeV", name: "Megaelétron-volt (MeV)", factor: 1.602176634e-13 },
                { symbol: "GeV", name: "Gigaelétron-volt (GeV)", factor: 1.602176634e-10 },
                { symbol: "TeV", name: "Teraelétron-volt (TeV)", factor: 1.602176634e-7 },
                { symbol: "Wh", name: "Watt-hora (Wh)", factor: 3600 },
                { symbol: "kWh", name: "Quilowatt-hora (kWh)", factor: 3.6e6 },
                { symbol: "MWh", name: "Megawatt-hora (MWh)", factor: 3.6e9 },
                { symbol: "BTU", name: "BTU (ISO/termoquímico)", factor: 1055.05585262 },
                { symbol: "erg", name: "Erg (erg)", factor: 1e-7 },
                { symbol: "ft·lbf", name: "Pé-libra força (ft·lbf)", factor: 1.3558179483314 }
            ]
        },

        potencia: {
            id: "potencia",
            name: "Potência / Fluxo Energético",
            dimension: createDim(2, 1, -3, 0, 0, 0, 0),
            siBaseUnit: "W",
            units: [
                { symbol: "W", name: "Watt (W)", factor: 1, isBase: true },
                { symbol: "kW", name: "Quilowatt (kW)", factor: 1e3 },
                { symbol: "MW", name: "Megawatt (MW)", factor: 1e6 },
                { symbol: "GW", name: "Gigawatt (GW)", factor: 1e9 },
                { symbol: "TW", name: "Terawatt (TW)", factor: 1e12 },
                { symbol: "mW", name: "Miliwatt (mW)", factor: 1e-3 },
                { symbol: "μW", name: "Microwatt (μW)", factor: 1e-6 },
                { symbol: "nW", name: "Nanowatt (nW)", factor: 1e-9 },
                { symbol: "cv", name: "Cavalo-vapor (cv)", factor: 735.49875 },
                { symbol: "hp", name: "Horsepower mecânico (hp)", factor: 745.69987158227022 },
                { symbol: "BTU/h", name: "BTU por hora (BTU/h)", factor: 0.29307107 },
                { symbol: "cal/s", name: "Caloria por segundo (cal/s)", factor: 4.184 },
                { symbol: "kcal/h", name: "Quilocaloria por hora (kcal/h)", factor: 1.163 }
            ]
        },

        pressao: {
            id: "pressao",
            name: "Pressão / Tensão Mecânica",
            dimension: createDim(-1, 1, -2, 0, 0, 0, 0),
            siBaseUnit: "Pa",
            units: [
                { symbol: "Pa", name: "Pascal (Pa)", factor: 1, isBase: true },
                { symbol: "kPa", name: "Quilopascal (kPa)", factor: 1e3 },
                { symbol: "MPa", name: "Megapascal (MPa)", factor: 1e6 },
                { symbol: "GPa", name: "Gigapascal (GPa)", factor: 1e9 },
                { symbol: "hPa", name: "Hectopascal (hPa)", factor: 100 },
                { symbol: "mPa", name: "Milipascal (mPa)", factor: 1e-3 },
                { symbol: "bar", name: "Bar", factor: 1e5 },
                { symbol: "mbar", name: "Milibar (mbar)", factor: 100 },
                { symbol: "atm", name: "Atmosfera padrão (atm)", factor: 101325 },
                { symbol: "mmHg", name: "Milímetro de mercúrio (mmHg / Torr)", factor: 133.322387415 },
                { symbol: "Torr", name: "Torr", factor: 133.322387415 },
                { symbol: "psi", name: "Libra por polegada quadrada (psi)", factor: 6894.757293168 },
                { symbol: "inHg", name: "Polegada de mercúrio (inHg)", factor: 3386.3886666667 },
                { symbol: "kgf/cm²", name: "Quilograma-força por cm²", factor: 98066.5 },
                { symbol: "mmH2O", name: "Milímetro de água (mmH₂O)", factor: 9.80665 }
            ]
        },

        temperatura: {
            id: "temperatura",
            name: "Temperatura Termodinâmica",
            dimension: createDim(0, 0, 0, 0, 1, 0, 0),
            siBaseUnit: "K",
            isAffine: true,
            units: [
                { 
                    symbol: "K", 
                    name: "Kelvin (K)", 
                    isBase: true,
                    toBase: (v) => v, 
                    fromBase: (k) => k 
                },
                { 
                    symbol: "°C", 
                    name: "Graus Celsius (°C)", 
                    toBase: (v) => v + 273.15, 
                    fromBase: (k) => k - 273.15 
                },
                { 
                    symbol: "C", 
                    name: "Celsius (C)", 
                    toBase: (v) => v + 273.15, 
                    fromBase: (k) => k - 273.15 
                },
                { 
                    symbol: "°F", 
                    name: "Graus Fahrenheit (°F)", 
                    toBase: (v) => (v + 459.67) * 5 / 9, 
                    fromBase: (k) => k * 9 / 5 - 459.67 
                },
                { 
                    symbol: "F", 
                    name: "Fahrenheit (F)", 
                    toBase: (v) => (v + 459.67) * 5 / 9, 
                    fromBase: (k) => k * 9 / 5 - 459.67 
                },
                { 
                    symbol: "°R", 
                    name: "Graus Rankine (°R)", 
                    toBase: (v) => v * 5 / 9, 
                    fromBase: (k) => k * 9 / 5 
                },
                { 
                    symbol: "R", 
                    name: "Rankine (R)", 
                    toBase: (v) => v * 5 / 9, 
                    fromBase: (k) => k * 9 / 5 
                }
            ]
        },

        frequencia: {
            id: "frequencia",
            name: "Frequência",
            dimension: createDim(0, 0, -1, 0, 0, 0, 0),
            siBaseUnit: "Hz",
            units: [
                { symbol: "Hz", name: "Hertz (Hz)", factor: 1, isBase: true },
                { symbol: "kHz", name: "Quilohertz (kHz)", factor: 1e3 },
                { symbol: "MHz", name: "Megahertz (MHz)", factor: 1e6 },
                { symbol: "GHz", name: "Gigahertz (GHz)", factor: 1e9 },
                { symbol: "THz", name: "Terahertz (THz)", factor: 1e12 },
                { symbol: "mHz", name: "Milihertz (mHz)", factor: 1e-3 },
                { symbol: "rpm", name: "Rotações por minuto (rpm)", factor: 1 / 60 },
                { symbol: "rad/s", name: "Radianos por segundo (rad/s)", factor: 1 / (2 * Math.PI) }
            ]
        },

        carga_eletrica: {
            id: "carga_eletrica",
            name: "Carga Elétrica",
            dimension: createDim(0, 0, 1, 1, 0, 0, 0),
            siBaseUnit: "C",
            units: [
                { symbol: "C", name: "Coulomb (C)", factor: 1, isBase: true },
                { symbol: "kC", name: "Quilocoulomb (kC)", factor: 1e3 },
                { symbol: "mC", name: "Milicoulomb (mC)", factor: 1e-3 },
                { symbol: "μC", name: "Microcoulomb (μC)", factor: 1e-6 },
                { symbol: "nC", name: "Nanocoulomb (nC)", factor: 1e-9 },
                { symbol: "pC", name: "Picocoulomb (pC)", factor: 1e-12 },
                { symbol: "fC", name: "Femtocoulomb (fC)", factor: 1e-15 },
                { symbol: "Ah", name: "Ampere-hora (Ah)", factor: 3600 },
                { symbol: "mAh", name: "Miliampere-hora (mAh)", factor: 3.6 },
                { symbol: "e", name: "Carga elementar (e)", factor: 1.602176634e-19 },
                { symbol: "statC", name: "Statcoulomb / Franklin (statC)", factor: 3.33564e-10 }
            ]
        },

        campo_magnetico: {
            id: "campo_magnetico",
            name: "Campo Magnético / Indução Magnética",
            dimension: createDim(0, 1, -2, -1, 0, 0, 0),
            siBaseUnit: "T",
            units: [
                { symbol: "T", name: "Tesla (T)", factor: 1, isBase: true },
                { symbol: "kT", name: "Quilotesla (kT)", factor: 1e3 },
                { symbol: "mT", name: "Militesla (mT)", factor: 1e-3 },
                { symbol: "μT", name: "Microtesla (μT)", factor: 1e-6 },
                { symbol: "nT", name: "Nanotesla (nT)", factor: 1e-9 },
                { symbol: "pT", name: "Picotesla (pT)", factor: 1e-12 },
                { symbol: "G", name: "Gauss (G)", factor: 1e-4 },
                { symbol: "kG", name: "Quilogauss (kG)", factor: 0.1 },
                { symbol: "mG", name: "Miligauss (mG)", factor: 1e-7 }
            ]
        },

        potencial_eletrico: {
            id: "potencial_eletrico",
            name: "Potencial Elétrico / Tensão / Tensão Eletromotriz",
            dimension: createDim(2, 1, -3, -1, 0, 0, 0),
            siBaseUnit: "V",
            units: [
                { symbol: "V", name: "Volt (V)", factor: 1, isBase: true },
                { symbol: "kV", name: "Quilovolt (kV)", factor: 1e3 },
                { symbol: "MV", name: "Megavolt (MV)", factor: 1e6 },
                { symbol: "GV", name: "Gigavolt (GV)", factor: 1e9 },
                { symbol: "mV", name: "Milivolt (mV)", factor: 1e-3 },
                { symbol: "μV", name: "Microvolt (μV)", factor: 1e-6 },
                { symbol: "nV", name: "Nanovolt (nV)", factor: 1e-9 }
            ]
        },

        corrente_eletrica: {
            id: "corrente_eletrica",
            name: "Corrente Elétrica",
            dimension: createDim(0, 0, 0, 1, 0, 0, 0),
            siBaseUnit: "A",
            units: [
                { symbol: "A", name: "Ampere (A)", factor: 1, isBase: true },
                { symbol: "kA", name: "Quiloampere (kA)", factor: 1e3 },
                { symbol: "MA", name: "Megaampere (MA)", factor: 1e6 },
                { symbol: "mA", name: "Miliampere (mA)", factor: 1e-3 },
                { symbol: "μA", name: "Microampere (μA)", factor: 1e-6 },
                { symbol: "nA", name: "Nanoampere (nA)", factor: 1e-9 },
                { symbol: "pA", name: "Picoampere (pA)", factor: 1e-12 }
            ]
        },

        resistencia_eletrica: {
            id: "resistencia_eletrica",
            name: "Resistência Elétrica",
            dimension: createDim(2, 1, -3, -2, 0, 0, 0),
            siBaseUnit: "Ω",
            units: [
                { symbol: "Ω", name: "Ohm (Ω)", factor: 1, isBase: true },
                { symbol: "ohm", name: "Ohm (ohm)", factor: 1 },
                { symbol: "kΩ", name: "Quilo-ohm (kΩ)", factor: 1e3 },
                { symbol: "MΩ", name: "Mega-ohm (MΩ)", factor: 1e6 },
                { symbol: "GΩ", name: "Giga-ohm (GΩ)", factor: 1e9 },
                { symbol: "mΩ", name: "Mili-ohm (mΩ)", factor: 1e-3 },
                { symbol: "μΩ", name: "Micro-ohm (μΩ)", factor: 1e-6 }
            ]
        },

        capacitancia: {
            id: "capacitancia",
            name: "Capacitância",
            dimension: createDim(-2, -1, 4, 2, 0, 0, 0),
            siBaseUnit: "F",
            units: [
                { symbol: "F", name: "Farad (F)", factor: 1, isBase: true },
                { symbol: "mF", name: "Milifarad (mF)", factor: 1e-3 },
                { symbol: "μF", name: "Microfarad (μF)", factor: 1e-6 },
                { symbol: "nF", name: "Nanofarad (nF)", factor: 1e-9 },
                { symbol: "pF", name: "Picofarad (pF)", factor: 1e-12 }
            ]
        },

        indutancia: {
            id: "indutancia",
            name: "Indutância",
            dimension: createDim(2, 1, -2, -2, 0, 0, 0),
            siBaseUnit: "H",
            units: [
                { symbol: "H", name: "Henry (H)", factor: 1, isBase: true },
                { symbol: "mH", name: "Milihenry (mH)", factor: 1e-3 },
                { symbol: "μH", name: "Microhenry (μH)", factor: 1e-6 },
                { symbol: "nH", name: "Nanohenry (nH)", factor: 1e-9 }
            ]
        },

        fluxo_magnetico: {
            id: "fluxo_magnetico",
            name: "Fluxo Magnético",
            dimension: createDim(2, 1, -2, -1, 0, 0, 0),
            siBaseUnit: "Wb",
            units: [
                { symbol: "Wb", name: "Weber (Wb)", factor: 1, isBase: true },
                { symbol: "mWb", name: "Miliweber (mWb)", factor: 1e-3 },
                { symbol: "μWb", name: "Microweber (μWb)", factor: 1e-6 },
                { symbol: "Mx", name: "Maxwell (Mx)", factor: 1e-8 }
            ]
        },

        angulo: {
            id: "angulo",
            name: "Ângulo Plano",
            dimension: createDim(0, 0, 0, 0, 0, 0, 0, 1),
            siBaseUnit: "rad",
            units: [
                { symbol: "rad", name: "Radiano (rad)", factor: 1, isBase: true },
                { symbol: "°", name: "Graus (°)", factor: Math.PI / 180 },
                { symbol: "grau", name: "Grau", factor: Math.PI / 180 },
                { symbol: "graus", name: "Graus", factor: Math.PI / 180 },
                { symbol: "deg", name: "Degree (deg)", factor: Math.PI / 180 },
                { symbol: "'", name: "Minuto de arco (')", factor: Math.PI / (180 * 60) },
                { symbol: "minuto de arco", name: "Minuto de arco", factor: Math.PI / (180 * 60) },
                { symbol: "\"", name: "Segundo de arco (\")", factor: Math.PI / (180 * 3600) },
                { symbol: "segundo de arco", name: "Segundo de arco", factor: Math.PI / (180 * 3600) },
                { symbol: "volta", name: "Volta / Revolução", factor: 2 * Math.PI },
                { symbol: "rev", name: "Revolução", factor: 2 * Math.PI },
                { symbol: "grad", name: "Grado (grad)", factor: Math.PI / 200 }
            ]
        },

        area: {
            id: "area",
            name: "Área",
            dimension: createDim(2, 0, 0, 0, 0, 0, 0),
            siBaseUnit: "m^2",
            units: [
                { symbol: "m²", name: "Metro quadrado (m²)", factor: 1, isBase: true },
                { symbol: "m^2", name: "m²", factor: 1 },
                { symbol: "km²", name: "Quilômetro quadrado (km²)", factor: 1e6 },
                { symbol: "cm²", name: "Centímetro quadrado (cm²)", factor: 1e-4 },
                { symbol: "mm²", name: "Milímetro quadrado (mm²)", factor: 1e-6 },
                { symbol: "ha", name: "Hectare (ha)", factor: 10000 },
                { symbol: "are", name: "Are (a)", factor: 100 },
                { symbol: "ca", name: "Centiare (ca)", factor: 1 },
                { symbol: "acre", name: "Acre", factor: 4046.8564224 },
                { symbol: "ft²", name: "Pé quadrado (ft²)", factor: 0.09290304 },
                { symbol: "in²", name: "Polegada quadrada (in²)", factor: 0.00064516 },
                { symbol: "yd²", name: "Jarda quadrada (yd²)", factor: 0.83612736 },
                { symbol: "mi²", name: "Milha quadrada (mi²)", factor: 2589988.110336 }
            ]
        },

        volume: {
            id: "volume",
            name: "Volume",
            dimension: createDim(3, 0, 0, 0, 0, 0, 0),
            siBaseUnit: "m^3",
            units: [
                { symbol: "m³", name: "Metro cúbico (m³)", factor: 1, isBase: true },
                { symbol: "m^3", name: "m³", factor: 1 },
                { symbol: "L", name: "Litro (L)", factor: 1e-3 },
                { symbol: "dm³", name: "Decímetro cúbico (dm³)", factor: 1e-3 },
                { symbol: "mL", name: "Mililitro (mL)", factor: 1e-6 },
                { symbol: "cm³", name: "Centímetro cúbico (cm³ / cc)", factor: 1e-6 },
                { symbol: "mm³", name: "Milímetro cúbico (mm³)", factor: 1e-9 },
                { symbol: "km³", name: "Quilômetro cúbico (km³)", factor: 1e9 },
                { symbol: "gal", name: "Galão US líquido (gal)", factor: 0.003785411784 },
                { symbol: "fl oz", name: "Onça fluida US (fl oz)", factor: 2.95735295625e-5 },
                { symbol: "qt", name: "Quarto US (qt)", factor: 0.000946352946 },
                { symbol: "pt", name: "Pinta US (pt)", factor: 0.000473176473 },
                { symbol: "bbl", name: "Barril de petróleo (bbl)", factor: 0.158987294928 },
                { symbol: "xicara", name: "Xícara de chá (240 mL)", factor: 0.00024 },
                { symbol: "colher_sopa", name: "Colher de sopa (15 mL)", factor: 0.000015 },
                { symbol: "colher_cha", name: "Colher de chá (5 mL)", factor: 0.000005 }
            ]
        },

        vazao: {
            id: "vazao",
            name: "Vazão Volumétrica",
            dimension: createDim(3, 0, -1, 0, 0, 0, 0),
            siBaseUnit: "m^3/s",
            units: [
                { symbol: "m³/s", name: "Metro cúbico por segundo (m³/s)", factor: 1, isBase: true },
                { symbol: "m^3/s", name: "m³/s", factor: 1 },
                { symbol: "m³/h", name: "Metro cúbico por hora (m³/h)", factor: 1 / 3600 },
                { symbol: "L/s", name: "Litro por segundo (L/s)", factor: 0.001 },
                { symbol: "L/min", name: "Litro por minuto (L/min)", factor: 1 / 60000 },
                { symbol: "L/h", name: "Litro por hora (L/h)", factor: 1 / 3600000 },
                { symbol: "cfm", name: "Pé cúbico por minuto (cfm)", factor: 0.000471947443 },
                { symbol: "gpm", name: "Galão por minuto US (gpm)", factor: 6.30901964e-5 }
            ]
        },

        densidade: {
            id: "densidade",
            name: "Densidade de Massa",
            dimension: createDim(-3, 1, 0, 0, 0, 0, 0),
            siBaseUnit: "kg/m^3",
            units: [
                { symbol: "kg/m³", name: "Quilograma por metro cúbico (kg/m³)", factor: 1, isBase: true },
                { symbol: "kg/m^3", name: "kg/m³", factor: 1 },
                { symbol: "g/cm³", name: "Grama por cm³ (g/cm³)", factor: 1000 },
                { symbol: "g/mL", name: "Grama por mililitro (g/mL)", factor: 1000 },
                { symbol: "kg/L", name: "Quilograma por litro (kg/L)", factor: 1000 },
                { symbol: "g/L", name: "Grama por litro (g/L)", factor: 1 },
                { symbol: "mg/mL", name: "Miligrama por mililitro (mg/mL)", factor: 1 },
                { symbol: "lb/ft³", name: "Libra por pé cúbico (lb/ft³)", factor: 16.01846337 }
            ]
        },

        quantidade_materia: {
            id: "quantidade_materia",
            name: "Quantidade de Matéria",
            dimension: createDim(0, 0, 0, 0, 0, 1, 0),
            siBaseUnit: "mol",
            units: [
                { symbol: "mol", name: "Mol (mol)", factor: 1, isBase: true },
                { symbol: "kmol", name: "Quilomol (kmol)", factor: 1e3 },
                { symbol: "mmol", name: "Milimol (mmol)", factor: 1e-3 },
                { symbol: "μmol", name: "Micromol (μmol)", factor: 1e-6 }
            ]
        },

        concentracao_molar: {
            id: "concentracao_molar",
            name: "Concentração Molar",
            dimension: createDim(-3, 0, 0, 0, 0, 1, 0),
            siBaseUnit: "mol/L",
            units: [
                { symbol: "mol/L", name: "Mol por litro (mol/L / M)", factor: 1, isBase: true },
                { symbol: "M", name: "Molar (M)", factor: 1 },
                { symbol: "mol/m³", name: "Mol por metro cúbico (mol/m³)", factor: 1e-3 },
                { symbol: "mmol/L", name: "Milimol por litro (mmol/L / mM)", factor: 1e-3 },
                { symbol: "μmol/L", name: "Micromol por litro (μmol/L / μM)", factor: 1e-6 }
            ]
        },

        massa_molar: {
            id: "massa_molar",
            name: "Massa Molar",
            dimension: createDim(0, 1, 0, 0, 0, -1, 0),
            siBaseUnit: "kg/mol",
            units: [
                { symbol: "kg/mol", name: "Quilograma por mol (kg/mol)", factor: 1, isBase: true },
                { symbol: "g/mol", name: "Grama por mol (g/mol)", factor: 1e-3 }
            ]
        },

        dados_si: {
            id: "dados_si",
            name: "Dados / Armazenamento (Decimal - SI)",
            dimension: createDim(0, 0, 0, 0, 0, 0, 0),
            siBaseUnit: "B",
            units: [
                { symbol: "B", name: "Byte (B)", factor: 1, isBase: true },
                { symbol: "kB", name: "Kilobyte (kB = 10³ B)", factor: 1000 },
                { symbol: "MB", name: "Megabyte (MB = 10⁶ B)", factor: 1e6 },
                { symbol: "GB", name: "Gigabyte (GB = 10⁹ B)", factor: 1e9 },
                { symbol: "TB", name: "Terabyte (TB = 10¹² B)", factor: 1e12 },
                { symbol: "PB", name: "Petabyte (PB = 10¹⁵ B)", factor: 1e15 },
                { symbol: "EB", name: "Exabyte (EB = 10¹⁸ B)", factor: 1e18 },
                { symbol: "bit", name: "Bit (b)", factor: 0.125 },
                { symbol: "kbit", name: "Kilobit (kbit)", factor: 125 },
                { symbol: "Mbit", name: "Megabit (Mbit)", factor: 125000 },
                { symbol: "Gbit", name: "Gigabit (Gbit)", factor: 1.25e8 }
            ]
        },

        dados_iec: {
            id: "dados_iec",
            name: "Dados / Armazenamento (Binário - IEC)",
            dimension: createDim(0, 0, 0, 0, 0, 0, 0),
            siBaseUnit: "B",
            units: [
                { symbol: "B", name: "Byte (B)", factor: 1, isBase: true },
                { symbol: "KiB", name: "Kibibyte (KiB = 2¹⁰ B = 1024 B)", factor: 1024 },
                { symbol: "MiB", name: "Mebibyte (MiB = 2²⁰ B = 1048576 B)", factor: 1048576 },
                { symbol: "GiB", name: "Gibibyte (GiB = 2³⁰ B = 1073741824 B)", factor: 1073741824 },
                { symbol: "TiB", name: "Tebibyte (TiB = 2⁴⁰ B)", factor: 1099511627776 },
                { symbol: "PiB", name: "Pebibyte (PiB = 2⁵⁰ B)", factor: 1125899906842624 },
                { symbol: "EiB", name: "Exbibyte (EiB = 2⁶⁰ B)", factor: 1152921504606846976 },
                { symbol: "bit", name: "Bit (b)", factor: 0.125 }
            ]
        },

        taxa_transmissao: {
            id: "taxa_transmissao",
            name: "Taxa de Transferência de Dados",
            dimension: createDim(0, 0, -1, 0, 0, 0, 0),
            siBaseUnit: "bit/s",
            units: [
                { symbol: "bit/s", name: "Bits por segundo (bit/s / bps)", factor: 1, isBase: true },
                { symbol: "kbit/s", name: "Quilobits por segundo (kbit/s)", factor: 1e3 },
                { symbol: "Mbit/s", name: "Megabits por segundo (Mbit/s)", factor: 1e6 },
                { symbol: "Gbit/s", name: "Gigabits por segundo (Gbit/s)", factor: 1e9 },
                { symbol: "B/s", name: "Bytes por segundo (B/s)", factor: 8 },
                { symbol: "kB/s", name: "Kilobytes por segundo (kB/s)", factor: 8000 },
                { symbol: "MB/s", name: "Megabytes por segundo (MB/s)", factor: 8e6 },
                { symbol: "GB/s", name: "Gigabytes por segundo (GB/s)", factor: 8e9 }
            ]
        },

        radioatividade_atividade: {
            id: "radioatividade_atividade",
            name: "Atividade Radioativa",
            dimension: createDim(0, 0, -1, 0, 0, 0, 0),
            siBaseUnit: "Bq",
            units: [
                { symbol: "Bq", name: "Becquerel (Bq)", factor: 1, isBase: true },
                { symbol: "kBq", name: "Quilobecquerel (kBq)", factor: 1e3 },
                { symbol: "MBq", name: "Megabecquerel (MBq)", factor: 1e6 },
                { symbol: "GBq", name: "Gigabecquerel (GBq)", factor: 1e9 },
                { symbol: "Ci", name: "Curie (Ci)", factor: 3.7e10 },
                { symbol: "mCi", name: "Milicurie (mCi)", factor: 3.7e7 },
                { symbol: "μCi", name: "Microcurie (μCi)", factor: 3.7e4 },
                { symbol: "Rd", name: "Rutherford (Rd)", factor: 1e6 }
            ]
        },

        radioatividade_dose: {
            id: "radioatividade_dose",
            name: "Dose Absorvida / Dose Equivalente",
            dimension: createDim(2, 0, -2, 0, 0, 0, 0),
            siBaseUnit: "Gy",
            units: [
                { symbol: "Gy", name: "Gray (Gy = J/kg)", factor: 1, isBase: true },
                { symbol: "Sv", name: "Sievert (Sv = J/kg equivalente)", factor: 1 },
                { symbol: "mGy", name: "Miligray (mGy)", factor: 1e-3 },
                { symbol: "μGy", name: "Microgray (μGy)", factor: 1e-6 },
                { symbol: "mSv", name: "Milisievert (mSv)", factor: 1e-3 },
                { symbol: "μSv", name: "Microsievert (μSv)", factor: 1e-6 },
                { symbol: "rad", name: "Rad (rad = 0.01 Gy)", factor: 0.01 },
                { symbol: "rem", name: "Rem (rem = 0.01 Sv)", factor: 0.01 }
            ]
        },

        iluminancia: {
            id: "iluminancia",
            name: "Iluminância",
            dimension: createDim(-2, 0, 0, 0, 0, 0, 1),
            siBaseUnit: "lx",
            units: [
                { symbol: "lx", name: "Lux (lx = lm/m²)", factor: 1, isBase: true },
                { symbol: "klx", name: "Quilolux (klx)", factor: 1e3 },
                { symbol: "fc", name: "Foot-candle (fc = lm/ft²)", factor: 10.76391041671 }
            ]
        },

        campo_eletrico: {
            id: "campo_eletrico",
            name: "Campo Elétrico",
            dimension: createDim(1, 1, -3, -1, 0, 0, 0),
            siBaseUnit: "V/m",
            units: [
                { symbol: "V/m", name: "Volt por metro (V/m)", factor: 1, isBase: true },
                { symbol: "N/C", name: "Newton por coulomb (N/C)", factor: 1 },
                { symbol: "kV/m", name: "Quilovolt por metro (kV/m)", factor: 1e3 },
                { symbol: "mV/m", name: "Milivolt por metro (mV/m)", factor: 1e-3 }
            ]
        },

        constante_elastica: {
            id: "constante_elastica",
            name: "Constante Elástica / Tensão Superficial",
            dimension: createDim(0, 1, -2, 0, 0, 0, 0),
            siBaseUnit: "N/m",
            units: [
                { symbol: "N/m", name: "Newton por metro (N/m)", factor: 1, isBase: true },
                { symbol: "kN/m", name: "Quilonewton por metro (kN/m)", factor: 1e3 },
                { symbol: "dyn/cm", name: "Dina por centímetro (dyn/cm)", factor: 0.001 }
            ]
        },

        momento_linear: {
            id: "momento_linear",
            name: "Momento Linear / Quantidade de Movimento / Impulso",
            dimension: createDim(1, 1, -1, 0, 0, 0, 0),
            siBaseUnit: "kg·m/s",
            units: [
                { symbol: "kg·m/s", name: "kg·m/s", factor: 1, isBase: true },
                { symbol: "N·s", name: "Newton-segundo (N·s)", factor: 1 },
                { symbol: "g·cm/s", name: "g·cm/s", factor: 1e-5 }
            ]
        },

        viscosidade_dinamica: {
            id: "viscosidade_dinamica",
            name: "Viscosidade Dinâmica",
            dimension: createDim(-1, 1, -1, 0, 0, 0, 0),
            siBaseUnit: "Pa·s",
            units: [
                { symbol: "Pa·s", name: "Pascal-segundo (Pa·s)", factor: 1, isBase: true },
                { symbol: "Pa*s", name: "Pa*s", factor: 1 },
                { symbol: "mPa·s", name: "Milipascal-segundo (mPa·s)", factor: 1e-3 },
                { symbol: "P", name: "Poise (P)", factor: 0.1 },
                { symbol: "cP", name: "Centipoise (cP)", factor: 1e-3 }
            ]
        },

        adimensional: {
            id: "adimensional",
            name: "Adimensional / Puro / Proporção",
            dimension: createDim(0, 0, 0, 0, 0, 0, 0),
            siBaseUnit: "",
            units: [
                { symbol: "", name: "(adimensional / puro)", factor: 1, isBase: true },
                { symbol: "%", name: "Porcentagem (%)", factor: 0.01 },
                { symbol: "‰", name: "Por mil (‰)", factor: 0.001 },
                { symbol: "ppm", name: "Partes por milhão (ppm)", factor: 1e-6 },
                { symbol: "ppb", name: "Partes por bilhão (ppb)", factor: 1e-9 }
            ]
        }
    };

    // =========================================================================
    // 4. CLASSE PRINCIPAL: UnitSystem
    // =========================================================================

    class UnitSystem {
        constructor() {
            this.siPrefixes = SI_PREFIXES;
            this.iecPrefixes = IEC_PREFIXES;
            this.quantities = QUANTITY_DEFS;

            // Mapeamentos rápidos
            this.unitToQuantity = {};
            this.symbolToUnit = {};

            this._initializeIndexes();
        }

        _initializeIndexes() {
            const COMMON_UNITS = {
                comprimento: ['m', 'km', 'cm', 'mm'],
                massa: ['kg', 'g', 'mg', 't'],
                tempo: ['s', 'min', 'h', 'ms'],
                velocidade: ['m/s', 'km/h', 'mph'],
                aceleracao: ['m/s²', 'km/h²', 'g'],
                forca: ['N', 'kN', 'kgf', 'lbf'],
                torque: ['N·m', 'kgf·m', 'lbf·ft'],
                energia: ['J', 'kJ', 'cal', 'kcal', 'kWh', 'eV'],
                potencia: ['W', 'kW', 'MW', 'hp', 'cv'],
                pressao: ['Pa', 'kPa', 'bar', 'atm', 'psi', 'mmHg'],
                temperatura: ['K', '°C', '°F'],
                frequencia: ['Hz', 'kHz', 'MHz', 'rpm'],
                carga_eletrica: ['C', 'mC', 'μC', 'nC', 'Ah'],
                campo_magnetico: ['T', 'mT', 'μT', 'G'],
                potencial_eletrico: ['V', 'mV', 'kV'],
                corrente_eletrica: ['A', 'mA', 'μA', 'kA'],
                resistencia_eletrica: ['Ω', 'kΩ', 'MΩ'],
                capacitancia: ['F', 'μF', 'nF', 'pF'],
                indutancia: ['H', 'mH', 'μH'],
                fluxo_magnetico: ['Wb', 'mWb', 'Mx'],
                angulo: ['rad', '°', 'grad'],
                area: ['m²', 'km²', 'cm²', 'ha'],
                volume: ['m³', 'L', 'mL', 'cm³'],
                vazao: ['m³/s', 'L/s', 'L/min', 'm³/h'],
                densidade: ['kg/m³', 'g/cm³', 'g/mL', 'kg/L'],
                quantidade_materia: ['mol', 'kmol', 'mmol'],
                concentracao_molar: ['mol/L', 'mol/m³', 'mmol/L'],
                massa_molar: ['g/mol', 'kg/mol'],
                dados_si: ['B', 'kB', 'MB', 'GB', 'TB'],
                dados_iec: ['B', 'KiB', 'MiB', 'GiB', 'TiB'],
                taxa_transmissao: ['bit/s', 'kbit/s', 'Mbit/s', 'Gbit/s', 'MB/s'],
                radioatividade_atividade: ['Bq', 'kBq', 'Ci', 'mCi'],
                radioatividade_dose: ['Gy', 'Sv', 'mSv', 'rad'],
                iluminancia: ['lx', 'fc'],
                campo_eletrico: ['V/m', 'N/C', 'kV/m'],
                constante_elastica: ['N/m', 'kN/m'],
                momento_linear: ['kg·m/s', 'N·s'],
                viscosidade_dinamica: ['Pa·s', 'mPa·s', 'cP'],
                adimensional: ['', '%', 'ppm']
            };

            const IMPERIAL_UNITS = new Set([
                'in', 'ft', 'yd', 'mi', 'nmi', 'lb', 'oz', 'ton_us', 'ton_uk', '@', 'gr',
                'lbf', 'lbf·ft', 'lbf·in', 'psi', 'inHg', 'gal', 'fl oz', 'qt', 'pt', 'bbl',
                'xicara', 'colher_sopa', 'colher_cha', 'cfm', 'gpm', 'lb/ft³', 'acre',
                'ft²', 'in²', 'yd²', 'mi²', 'mph', 'ft/s', 'ft/s²', 'BTU', 'BTU/h', 'hp', 'fc',
                'ft·lbf'
            ]);

            const SPECIAL_UNITS = new Set([
                'UA', 'ly', 'pc', 'Å', 'u', 'c', 'Mach', 'eV', 'keV', 'MeV', 'GeV', 'TeV',
                'erg', 'dyn', 'dyn·cm', 'atm', 'bar', 'mbar', 'mmHg', 'Torr', 'mmH2O',
                'kgf/cm²', 'G', 'kG', 'mG', 'Mx', 'Ci', 'mCi', 'μCi', 'Rd', 'rad', 'rem',
                'statC', 'e', 'Wh', 'kWh', 'MWh', 'nó', 'kgf', 'tf', 'kgf·m', 'cv',
                'cal/s', 'kcal/h', 'rpm', 'minuto de arco', 'segundo de arco', 'volta', 'rev',
                'ha', 'are', 'ca', 'Ah', 'mAh', '°R', 'R', 'semana', 'mes', 'ano'
            ]);

            for (const [qId, qDef] of Object.entries(this.quantities)) {
                qDef.units.forEach(u => {
                    u.quantityId = qId;
                    this.symbolToUnit[u.symbol] = u;
                    if (!this.unitToQuantity[u.symbol]) {
                        this.unitToQuantity[u.symbol] = qDef;
                    }

                    // Categorização e identificação de unidades comuns
                    const isCommon = (COMMON_UNITS[qId] && COMMON_UNITS[qId].includes(u.symbol)) || !!u.isBase;
                    u.isCommon = isCommon;

                    if (isCommon) {
                        u.group = "⭐ Principais e SI";
                    } else if (IMPERIAL_UNITS.has(u.symbol)) {
                        u.group = "Imperiais e Tradicionais";
                    } else if (SPECIAL_UNITS.has(u.symbol)) {
                        u.group = "Especiais e Científicas";
                    } else {
                        u.group = "Múltiplos e Submúltiplos (SI)";
                    }
                });
            }

            // Sinônimos e variações comuns
            const aliases = {
                "m/s^2": "aceleracao",
                "m^2": "area",
                "m^3": "volume",
                "m^3/s": "vazao",
                "kg/m^3": "densidade",
                "N*m": "torque",
                "Pa*s": "viscosidade_dinamica",
                "ohm": "resistencia_eletrica",
                "Ω": "resistencia_eletrica",
                "deg": "angulo",
                "grau": "angulo",
                "graus": "angulo",
                "°": "angulo",
                "C": "carga_eletrica",
                "T": "campo_magnetico",
                "N": "forca",
                "J": "energia",
                "W": "potencia",
                "Pa": "pressao",
                "K": "temperatura",
                "°C": "temperatura",
                "°F": "temperatura",
                "Hz": "frequencia",
                "V": "potencial_eletrico",
                "A": "corrente_eletrica",
                "F": "capacitancia",
                "H": "indutancia",
                "Wb": "fluxo_magnetico",
                "mol": "quantidade_materia",
                "B": "dados_si",
                "bit": "dados_si",
                "bit/s": "taxa_transmissao",
                "Bq": "radioatividade_atividade",
                "Gy": "radioatividade_dose",
                "Sv": "radioatividade_dose",
                "lx": "iluminancia",
                "": "adimensional"
            };

            for (const [sym, qId] of Object.entries(aliases)) {
                if (this.quantities[qId]) {
                    this.unitToQuantity[sym] = this.quantities[qId];
                }
            }
        }

        /**
         * Retorna a definição da grandeza associada a um símbolo de unidade ou ID.
         */
        getQuantity(identifier) {
            if (!identifier && identifier !== "") return null;
            if (this.quantities[identifier]) return this.quantities[identifier];
            if (this.unitToQuantity[identifier]) return this.unitToQuantity[identifier];

            // Tenta decompor prefixo SI padrão (ex: μC -> C, mT -> T, kN -> N)
            const cleanSym = String(identifier).trim();
            for (const p of this.siPrefixes) {
                if (cleanSym.startsWith(p.symbol) && cleanSym.length > p.symbol.length) {
                    const baseSym = cleanSym.substring(p.symbol.length);
                    if (this.unitToQuantity[baseSym]) {
                        return this.unitToQuantity[baseSym];
                    }
                }
            }

            // Micro com 'u' (ex: uC -> C, uT -> T, uF -> F)
            if (cleanSym.startsWith('u') && cleanSym.length > 1) {
                const baseSym = cleanSym.substring(1);
                if (this.unitToQuantity[baseSym]) {
                    return this.unitToQuantity[baseSym];
                }
            }

            // Tenta decompor prefixo binário IEC (ex: KiB, MiB, GiB, TiB, PiB, EiB)
            for (const p of this.iecPrefixes) {
                if (cleanSym.startsWith(p.symbol) && cleanSym.length > p.symbol.length) {
                    const baseSym = cleanSym.substring(p.symbol.length);
                    if (this.unitToQuantity[baseSym]) {
                        return this.unitToQuantity[baseSym];
                    }
                }
            }

            return null;
        }

        /**
         * Retorna a lista de unidades compatíveis com uma dada unidade de referência (SI)
         * ou grandeza de variável de fórmula.
         */
        getCompatibleUnits(siUnit, varName = "", formula = null) {
            const rawUnit = siUnit !== undefined && siUnit !== null ? String(siUnit).trim() : "";

            // Variável puramente adimensional
            if (rawUnit === "" || rawUnit === "1") {
                return [
                    { symbol: "", name: "(adimensional / puro)", factor: 1, isBase: true },
                    { symbol: "%", name: "Porcentagem (%)", factor: 0.01 }
                ];
            }

            // Busca grandeza correspondente
            let qty = this.getQuantity(rawUnit);

            // Desambiguação inteligente por contexto de variável se necessário
            if (!qty && varName) {
                if (varName === 'theta' || varName === 'theta0' || varName === 'alpha') {
                    qty = this.quantities.angulo;
                } else if (varName === 'q' || varName === 'q1' || varName === 'q2') {
                    qty = this.quantities.carga_eletrica;
                } else if (varName === 'B') {
                    qty = this.quantities.campo_magnetico;
                } else if (varName === 'v' || varName === 'v0' || varName === 'vf' || varName === 'vi') {
                    qty = this.quantities.velocidade;
                }
            }

            if (qty && qty.units && qty.units.length > 0) {
                return qty.units;
            }

            // Fallback: se não houver grandeza pré-catalogada para a unidade composta,
            // retorna a própria unidade para não bloquear
            return [
                { symbol: rawUnit, name: rawUnit, factor: 1, isBase: true, group: "⭐ Principais e SI", isCommon: true }
            ];
        }

        /**
         * Retorna as unidades compatíveis organizadas em grupos semânticos (<optgroup>)
         */
        getGroupedCompatibleUnits(siUnit, varName = "", formula = null) {
            const units = this.getCompatibleUnits(siUnit, varName, formula);
            if (!units || units.length === 0) return [];

            const groupOrder = [
                "⭐ Principais e SI",
                "Múltiplos e Submúltiplos (SI)",
                "Imperiais e Tradicionais",
                "Especiais e Científicas",
                "Outras Unidades"
            ];

            const groupsMap = {};
            units.forEach(u => {
                const grp = u.group || (u.isCommon ? "⭐ Principais e SI" : "Múltiplos e Submúltiplos (SI)");
                if (!groupsMap[grp]) groupsMap[grp] = [];
                groupsMap[grp].push(u);
            });

            const result = [];
            groupOrder.forEach(gName => {
                if (groupsMap[gName] && groupsMap[gName].length > 0) {
                    result.push({ name: gName, units: groupsMap[gName] });
                }
            });

            for (const [gName, gUnits] of Object.entries(groupsMap)) {
                if (!groupOrder.includes(gName) && gUnits.length > 0) {
                    result.push({ name: gName, units: gUnits });
                }
            }

            return result;
        }

        /**
         * Retorna os atalhos rápidos (chips) mais populares para uma grandeza (ex: m, km, cm, mm)
         */
        getQuickUnits(siUnit, varName = "", formula = null, maxCount = 5) {
            const units = this.getCompatibleUnits(siUnit, varName, formula);
            if (!units || units.length <= 1) return [];

            const common = units.filter(u => u.isCommon && u.symbol !== "");
            if (common.length >= 2) {
                return common.slice(0, maxCount);
            }
            return units.filter(u => u.symbol !== "").slice(0, maxCount);
        }

        /**
         * Converte um valor da unidade de origem para a unidade de referência base (SI).
         */
        toBaseUnit(value, fromUnit, siUnitHint = "") {
            if (typeof value !== 'number' || isNaN(value)) return NaN;
            const from = String(fromUnit || "").trim();
            const siBase = String(siUnitHint || "").trim();

            if (from === siBase || from === "") return value;

            const qty = this.getQuantity(from) || this.getQuantity(siBase);
            if (!qty) return value;

            // Grandezas com conversão afim (Temperatura)
            if (qty.isAffine) {
                const uDef = qty.units.find(u => u.symbol === from);
                if (uDef && uDef.toBase) {
                    return uDef.toBase(value);
                }
                return value;
            }

            // Unidade linear catalogada
            const uDef = qty.units.find(u => u.symbol === from);
            if (uDef && uDef.factor) {
                return value * uDef.factor;
            }

            // Prefixos dinâmicos em cima da unidade base do SI (ex: μC, nT, km)
            const prefixFactor = this.resolvePrefixFactor(from, qty.siBaseUnit);
            if (prefixFactor !== null) {
                return value * prefixFactor;
            }

            return value;
        }

        /**
         * Converte um valor em unidade base (SI) para a unidade de destino.
         */
        fromBaseUnit(baseValue, toUnit, siUnitHint = "") {
            if (typeof baseValue !== 'number' || isNaN(baseValue)) return NaN;
            const to = String(toUnit || "").trim();
            const siBase = String(siUnitHint || "").trim();

            if (to === siBase || to === "") return baseValue;

            const qty = this.getQuantity(to) || this.getQuantity(siBase);
            if (!qty) return baseValue;

            // Grandezas afins (Temperatura)
            if (qty.isAffine) {
                const uDef = qty.units.find(u => u.symbol === to);
                if (uDef && uDef.fromBase) {
                    return uDef.fromBase(baseValue);
                }
                return baseValue;
            }

            // Unidade linear catalogada
            const uDef = qty.units.find(u => u.symbol === to);
            if (uDef && uDef.factor) {
                return baseValue / uDef.factor;
            }

            // Prefixos dinâmicos
            const prefixFactor = this.resolvePrefixFactor(to, qty.siBaseUnit);
            if (prefixFactor !== null) {
                return baseValue / prefixFactor;
            }

            return baseValue;
        }

        /**
         * Converte diretamente um valor de uma unidade para outra.
         */
        convert(value, fromUnit, toUnit, quantityHint = null) {
            if (typeof value !== 'number' || isNaN(value)) return NaN;
            const from = String(fromUnit || "").trim();
            const to = String(toUnit || "").trim();

            if (from === to) return value;

            const qty = (quantityHint ? this.quantities[quantityHint] : null) ||
                        this.getQuantity(from) ||
                        this.getQuantity(to);

            if (!qty) {
                throw new Error(`Grandeza não reconhecida para conversão entre '${fromUnit}' e '${toUnit}'.`);
            }

            // Validação dimensional
            if (!this.areCompatible(from, to, qty.id)) {
                throw new Error(`Incompatibilidade dimensional: não é possível converter '${fromUnit}' para '${toUnit}'.`);
            }

            const baseVal = this.toBaseUnit(value, from, qty.siBaseUnit);
            return this.fromBaseUnit(baseVal, to, qty.siBaseUnit);
        }

        /**
         * Resolve o fator multiplicativo de um prefixo SI ou binário
         * aplicado sobre um símbolo base (ex: 'μC' sobre 'C' -> 1e-6).
         */
        resolvePrefixFactor(fullSymbol, baseSymbol) {
            if (!fullSymbol || !baseSymbol) return null;
            if (fullSymbol === baseSymbol) return 1;

            if (fullSymbol.endsWith(baseSymbol)) {
                const prefixPart = fullSymbol.substring(0, fullSymbol.length - baseSymbol.length);

                // Micro alternativo 'u'
                if (prefixPart === 'u') return 1e-6;

                // SI Prefixes
                const siP = this.siPrefixes.find(p => p.symbol === prefixPart);
                if (siP) return siP.factor;

                // IEC Prefixes
                const iecP = this.iecPrefixes.find(p => p.symbol === prefixPart);
                if (iecP) return iecP.factor;
            }
            return null;
        }

        /**
         * Verifica se duas unidades são dimensionalmente compatíveis entre si.
         */
        areCompatible(unitA, unitB, quantityHint = null) {
            const uA = String(unitA || "").trim();
            const uB = String(unitB || "").trim();

            if (uA === uB) return true;

            const qA = this.getQuantity(uA);
            const qB = this.getQuantity(uB);

            if (qA && qB) {
                if (qA.id === qB.id) return true;
                return dimEqual(qA.dimension, qB.dimension);
            }

            if (quantityHint && this.quantities[quantityHint]) {
                const qHint = this.quantities[quantityHint];
                const matchA = qA ? dimEqual(qA.dimension, qHint.dimension) : false;
                const matchB = qB ? dimEqual(qB.dimension, qHint.dimension) : false;
                return matchA && matchB;
            }

            return false;
        }

        /**
         * Formata uma unidade para renderização profissional em KaTeX.
         */
        unitToLatex(unitStr) {
            if (!unitStr) return "";
            const u = String(unitStr).trim();

            if (u === "%") return "\\%";
            if (u === "Ω" || u === "ohm") return "\\Omega";
            if (u === "°" || u === "graus" || u === "grau") return "{}^\\circ";
            if (u === "$") return "\\$";

            // Tratamento especial de strings com caracteres problemáticos
            let s = u.replace(/Ω/g, "__OMEGA__")
                     .replace(/%/g, "\\%")
                     .replace(/períodos/g, "\\text{períodos}")
                     .replace(/espiras\/m/g, "\\text{espiras/m}");

            const res = s.split("·").map(part => {
                return part.split("/").map((subPart, idx) => {
                    const prefix = idx > 0 ? "/" : "";
                    const match = subPart.match(/^([a-zA-Z_°\\$\\%μ]+)\^?(-?\d+)?$/);
                    if (match) {
                        const token = match[1];
                        let base;
                        if (token === "__OMEGA__" || token === "Ω") {
                            base = "\\Omega";
                        } else if (token.endsWith("__OMEGA__")) {
                            const p = token.slice(0, -9);
                            if (p === "μ") {
                                base = "\\mu\\Omega";
                            } else if (p.startsWith("μ")) {
                                base = "\\mu\\text{" + p.slice(1) + "}\\Omega";
                            } else {
                                base = "\\text{" + p + "}\\Omega";
                            }
                        } else if (token === "°") {
                            base = "^\\circ";
                        } else if (token === "\\%" || token === "%") {
                            base = "\\%";
                        } else if (token === "μ") {
                            base = "\\mu";
                        } else if (token.startsWith("μ")) {
                            base = "\\mu\\text{" + token.slice(1) + "}";
                        } else {
                            base = "\\text{" + token + "}";
                        }
                        const exp = match[2] ? "^{" + match[2] + "}" : "";
                        return prefix + base + exp;
                    }
                    return prefix + "\\text{" + subPart.replace(/\^(\d+)/g, "}^{$1}") + "}";
                }).join("");
            }).join(" \\cdot ");

            return res.replace(/__OMEGA__/g, "\\Omega");
        }
    }

    return UnitSystem;
}));
