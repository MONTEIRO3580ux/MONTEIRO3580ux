// math.js — Catálogo Completo de Matemática (v5.0 Horizonte Singular)

const mathCatalog = [

    // ============================================================
    // FUNÇÕES
    // ============================================================
    {
        id: "polynomial_function",
        name: "Função Polinomial",
        category: "Matemática: Funções",
        type: "DYNAMIC_LIST",
        listVariable: "termos",
        itemFields: ["a", "n"],
        targetVariable: "y",
        latex: "f(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_0",
        computable: {
            "y": "polyval(termos.map(t => t.a), termos.map(t => t.n), x)"
        },
        variables: {
            "y": { name: "f(x) / y", si_unit: "" },
            "x": { name: "Variável (x)", si_unit: "" },
            "termos": { name: "Termos", si_unit: "" }
        },
        description: "Avaliação de polinômio para um dado x."
    },
    {
        id: "quadratic_function",
        name: "Função Quadrática (2º Grau)",
        category: "Matemática: Funções",
        latex: "f(x) = ax^2 + bx + c",
        computable: {
            "y": "a * x^2 + b * x + c",
            "c": "y - a * x^2 - b * x"
        },
        variables: {
            "y": { name: "f(x) / y", si_unit: "" },
            "a": { name: "Coeficiente a", si_unit: "" },
            "b": { name: "Coeficiente b", si_unit: "" },
            "c": { name: "Coeficiente c", si_unit: "" },
            "x": { name: "Variável x", si_unit: "" }
        },
        constraints: ["a != 0"],
        description: "Valor de y dado x na parábola."
    },
    {
        id: "quadratic_root_plus",
        name: "Raiz da Quadrática (+)",
        category: "Matemática: Funções",
        latex: "x_1 = \\frac{-b + \\sqrt{\\Delta}}{2a}",
        computable: {
            "x1": "(-b + sqrt(delta)) / (2 * a)"
        },
        variables: {
            "x1": { name: "Raiz 1 (x₁)", si_unit: "" },
            "b": { name: "Coeficiente b", si_unit: "" },
            "delta": { name: "Discriminante (Δ)", si_unit: "" },
            "a": { name: "Coeficiente a", si_unit: "" }
        },
        constraints: ["a != 0", "delta >= 0"],
        description: "Primeira raiz da equação quadrática."
    },
    {
        id: "quadratic_root_minus",
        name: "Raiz da Quadrática (-)",
        category: "Matemática: Funções",
        latex: "x_2 = \\frac{-b - \\sqrt{\\Delta}}{2a}",
        computable: {
            "x2": "(-b - sqrt(delta)) / (2 * a)"
        },
        variables: {
            "x2": { name: "Raiz 2 (x₂)", si_unit: "" },
            "b": { name: "Coeficiente b", si_unit: "" },
            "delta": { name: "Discriminante (Δ)", si_unit: "" },
            "a": { name: "Coeficiente a", si_unit: "" }
        },
        constraints: ["a != 0", "delta >= 0"],
        description: "Segunda raiz da equação quadrática."
    },
    {
        id: "modular_function",
        name: "Função Modular",
        category: "Matemática: Funções",
        latex: "f(x) = |x|",
        computable: {
            "y": "abs(x)"
        },
        variables: {
            "y": { name: "f(x) / y", si_unit: "" },
            "x": { name: "Variável x", si_unit: "" }
        },
        description: "Módulo ou valor absoluto."
    },
    {
        id: "trig_sin_func",
        name: "Função Seno",
        category: "Matemática: Funções",
        latex: "f(x) = \\sin(x)",
        computable: {
            "y": "sin(x)",
            "x": "asin(y)"
        },
        variables: {
            "y": { name: "f(x) / y", si_unit: "" },
            "x": { name: "Ângulo (rad)", si_unit: "rad" }
        },
        constraints: ["y >= -1", "y <= 1"],
        description: "Seno de um ângulo."
    },
    {
        id: "trig_cos_func",
        name: "Função Cosseno",
        category: "Matemática: Funções",
        latex: "f(x) = \\cos(x)",
        computable: {
            "y": "cos(x)",
            "x": "acos(y)"
        },
        variables: {
            "y": { name: "f(x) / y", si_unit: "" },
            "x": { name: "Ângulo (rad)", si_unit: "rad" }
        },
        constraints: ["y >= -1", "y <= 1"],
        description: "Cosseno de um ângulo."
    },
    {
        id: "affine_function",
        name: "Função Afim (1º Grau)",
        category: "Matemática: Funções",
        latex: "f(x) = a \\cdot x + b",
        computable: {
            "y": "a * x + b",
            "x": "(y - b) / a",
            "a": "(y - b) / x",
            "b": "y - a * x"
        },
        variables: {
            "y": { name: "f(x) / y", si_unit: "" },
            "a": { name: "Coef. angular (a)", si_unit: "" },
            "x": { name: "Variável x", si_unit: "" },
            "b": { name: "Coef. linear (b)", si_unit: "" }
        },
        description: "Função polinomial do 1º grau."
    },
    {
        id: "quadratic_discriminant",
        name: "Discriminante Quadrático (Δ)",
        category: "Matemática: Funções",
        latex: "\\Delta = b^2 - 4ac",
        computable: {
            "delta": "b^2 - 4 * a * c",
            "c": "(b^2 - delta) / (4 * a)",
            "a": "(b^2 - delta) / (4 * c)"
        },
        variables: {
            "delta": { name: "Discriminante (Δ)", si_unit: "" },
            "b": { name: "Coeficiente b", si_unit: "" },
            "a": { name: "Coeficiente a", si_unit: "" },
            "c": { name: "Coeficiente c", si_unit: "" }
        },
        description: "Cálculo do discriminante da equação do 2º grau."
    },
    {
        id: "quadratic_vertex_x",
        name: "Vértice da Parábola (Xv)",
        category: "Matemática: Funções",
        latex: "x_v = -\\frac{b}{2a}",
        computable: {
            "xv": "-b / (2 * a)",
            "b": "-2 * a * xv",
            "a": "-b / (2 * xv)"
        },
        variables: {
            "xv": { name: "X do Vértice (Xv)", si_unit: "" },
            "b": { name: "Coeficiente b", si_unit: "" },
            "a": { name: "Coeficiente a", si_unit: "" }
        },
        constraints: ["a != 0"],
        description: "Abscissa do vértice da parábola quadrática."
    },
    {
        id: "quadratic_vertex_y",
        name: "Vértice da Parábola (Yv)",
        category: "Matemática: Funções",
        latex: "y_v = -\\frac{\\Delta}{4a}",
        computable: {
            "yv": "-delta / (4 * a)",
            "delta": "-4 * a * yv",
            "a": "-delta / (4 * yv)"
        },
        variables: {
            "yv": { name: "Y do Vértice (Yv)", si_unit: "" },
            "delta": { name: "Discriminante (Δ)", si_unit: "" },
            "a": { name: "Coeficiente a", si_unit: "" }
        },
        constraints: ["a != 0"],
        description: "Ordenada do vértice da parábola quadrática."
    },
    {
        id: "exponential_function",
        name: "Função Exponencial",
        category: "Matemática: Funções",
        latex: "y = a^x",
        computable: {
            "y": "a^x",
            "x": "log(y) / log(a)",
            "a": "y^(1 / x)"
        },
        variables: {
            "y": { name: "Valor y", si_unit: "" },
            "a": { name: "Base a", si_unit: "" },
            "x": { name: "Expoente x", si_unit: "" }
        },
        constraints: ["a > 0", "a != 1", "y > 0"],
        description: "Cálculo e resolução exponencial."
    },
    {
        id: "logarithmic_function",
        name: "Função Logarítmica",
        category: "Matemática: Funções",
        latex: "y = \\log_a(x)",
        computable: {
            "y": "log(x) / log(a)",
            "x": "a^y",
            "a": "x^(1 / y)"
        },
        variables: {
            "y": { name: "Logaritmo y", si_unit: "" },
            "a": { name: "Base a", si_unit: "" },
            "x": { name: "Logaritmando x", si_unit: "" }
        },
        constraints: ["a > 0", "a != 1", "x > 0"],
        description: "Relação fundamental do logaritmo."
    },

    // ============================================================
    // PROGRESSÕES
    // ============================================================
    {
        id: "pa_term",
        name: "PA — Termo Geral",
        category: "Matemática: Progressões",
        latex: "a_n = a_1 + (n - 1)r",
        computable: {
            "an": "a1 + (n - 1) * r",
            "a1": "an - (n - 1) * r",
            "r": "(an - a1) / (n - 1)",
            "n": "((an - a1) / r) + 1"
        },
        variables: {
            "an": { name: "Enésimo termo (an)", si_unit: "" },
            "a1": { name: "Primeiro termo (a1)", si_unit: "" },
            "n": { name: "Posição / Ordem (n)", si_unit: "" },
            "r": { name: "Razão (r)", si_unit: "" }
        },
        constraints: ["n >= 1"],
        description: "Enésimo termo de uma Progressão Aritmética."
    },
    {
        id: "pa_sum",
        name: "PA — Soma dos Termos",
        category: "Matemática: Progressões",
        type: "DYNAMIC_STRUCTURE",
        latex: "S_n = \\frac{(a_1 + a_n) \\cdot n}{2}",
        computable: {
            "Sn": "((a1 + an) * n) / 2",
            "a1": "(2 * Sn / n) - an",
            "an": "(2 * Sn / n) - a1",
            "n": "(2 * Sn) / (a1 + an)"
        },
        variables: {
            "Sn": { name: "Soma total (Sn)", si_unit: "" },
            "a1": { name: "Primeiro termo (a1)", si_unit: "" },
            "an": { name: "Último termo (an)", si_unit: "" },
            "n": { name: "Número de termos (n)", si_unit: "" }
        },
        constraints: ["n > 0"],
        description: "Soma dos n primeiros termos de uma PA."
    },
    {
        id: "pg_term",
        name: "PG — Termo Geral",
        category: "Matemática: Progressões",
        latex: "a_n = a_1 \\cdot q^{n - 1}",
        computable: {
            "an": "a1 * (q^(n - 1))",
            "a1": "an / (q^(n - 1))",
            "q": "(an / a1)^(1 / (n - 1))"
        },
        variables: {
            "an": { name: "Enésimo termo (an)", si_unit: "" },
            "a1": { name: "Primeiro termo (a1)", si_unit: "" },
            "q": { name: "Razão (q)", si_unit: "" },
            "n": { name: "Posição / Ordem (n)", si_unit: "" }
        },
        constraints: ["n >= 1"],
        description: "Enésimo termo de uma Progressão Geométrica."
    },
    {
        id: "pg_sum_finite",
        name: "PG — Soma Finita",
        category: "Matemática: Progressões",
        type: "DYNAMIC_STRUCTURE",
        latex: "S_n = \\frac{a_1 (q^n - 1)}{q - 1}",
        computable: {
            "Sn": "(a1 * (q^n - 1)) / (q - 1)",
            "a1": "(Sn * (q - 1)) / (q^n - 1)"
        },
        variables: {
            "Sn": { name: "Soma finita (Sn)", si_unit: "" },
            "a1": { name: "Primeiro termo (a1)", si_unit: "" },
            "q": { name: "Razão (q)", si_unit: "" },
            "n": { name: "Número de termos (n)", si_unit: "" }
        },
        constraints: ["q != 1", "n > 0"],
        description: "Soma de n termos de uma PG finita."
    },
    {
        id: "pg_sum_infinite",
        name: "PG — Soma Infinita",
        category: "Matemática: Progressões",
        latex: "S_\\infty = \\frac{a_1}{1 - q}",
        computable: {
            "S": "a1 / (1 - q)",
            "a1": "S * (1 - q)",
            "q": "1 - (a1 / S)"
        },
        variables: {
            "S": { name: "Soma infinita (S)", si_unit: "" },
            "a1": { name: "Primeiro termo (a1)", si_unit: "" },
            "q": { name: "Razão (q)", si_unit: "" }
        },
        constraints: ["q > -1", "q < 1"],
        description: "Limite da soma de uma PG infinita convergente."
    },

    // ============================================================
    // GEOMETRIA PLANA — POLÍGONOS E TRIÂNGULOS
    // ============================================================
    {
        id: "polygon_internal_angles",
        name: "Soma dos Ângulos Internos",
        category: "Matemática: Geometria Plana",
        latex: "S_i = (n - 2) \\cdot 180^\\circ",
        computable: {
            "Si": "(n - 2) * 180",
            "n": "(Si / 180) + 2"
        },
        variables: {
            "Si": { name: "Soma dos ângulos (Si)", si_unit: "°" },
            "n": { name: "Número de lados (n)", si_unit: "" }
        },
        constraints: ["n >= 3"],
        description: "Soma dos ângulos internos de um polígono convexo."
    },
    {
        id: "pythagoras",
        name: "Teorema de Pitágoras",
        category: "Matemática: Geometria Plana",
        latex: "a^2 = b^2 + c^2",
        computable: {
            "a": "sqrt(b^2 + c^2)",
            "b": "sqrt(a^2 - c^2)",
            "c": "sqrt(a^2 - b^2)"
        },
        variables: {
            "a": { name: "Hipotenusa (a)", si_unit: "m" },
            "b": { name: "Cateto b", si_unit: "m" },
            "c": { name: "Cateto c", si_unit: "m" }
        },
        constraints: ["a > 0", "b > 0", "c > 0"],
        description: "Relação fundamental no triângulo retângulo."
    },
    {
        id: "right_triangle_alt_proj",
        name: "Triângulo Retângulo — Altura e Projeções",
        category: "Matemática: Geometria Plana",
        latex: "h^2 = m \\cdot n",
        computable: {
            "h": "sqrt(m * n)",
            "m": "h^2 / n",
            "n": "h^2 / m"
        },
        variables: {
            "h": { name: "Altura relativa (h)", si_unit: "m" },
            "m": { name: "Projeção m", si_unit: "m" },
            "n": { name: "Projeção n", si_unit: "m" }
        },
        constraints: ["m > 0", "n > 0"],
        description: "Relação métrica h² = m·n no triângulo retângulo."
    },
    {
        id: "right_triangle_leg_proj",
        name: "Triângulo Retângulo — Cateto e Projeção",
        category: "Matemática: Geometria Plana",
        latex: "b^2 = a \\cdot n",
        computable: {
            "b": "sqrt(a * n)",
            "a": "b^2 / n",
            "n": "b^2 / a"
        },
        variables: {
            "b": { name: "Cateto b", si_unit: "m" },
            "a": { name: "Hipotenusa a", si_unit: "m" },
            "n": { name: "Projeção n", si_unit: "m" }
        },
        constraints: ["a > 0", "n > 0"],
        description: "Relação métrica b² = a·n no triângulo retângulo."
    },
    {
        id: "right_triangle_hyp_alt",
        name: "Triângulo Retângulo — Hipotenusa e Altura",
        category: "Matemática: Geometria Plana",
        latex: "a \\cdot h = b \\cdot c",
        computable: {
            "a": "(b * c) / h",
            "h": "(b * c) / a",
            "b": "(a * h) / c",
            "c": "(a * h) / b"
        },
        variables: {
            "a": { name: "Hipotenusa a", si_unit: "m" },
            "h": { name: "Altura relativa h", si_unit: "m" },
            "b": { name: "Cateto b", si_unit: "m" },
            "c": { name: "Cateto c", si_unit: "m" }
        },
        constraints: ["a > 0", "h > 0", "b > 0", "c > 0"],
        description: "Relação métrica a·h = b·c."
    },

    // Polígonos Inscritos
    {
        id: "inscribed_equilateral_triangle",
        name: "Triângulo Equilátero Inscrito",
        category: "Matemática: Geometria Plana",
        latex: "l = r\\sqrt{3}",
        computable: {
            "l": "r * sqrt(3)",
            "r": "l / sqrt(3)"
        },
        variables: {
            "l": { name: "Lado do triângulo (l)", si_unit: "m" },
            "r": { name: "Raio da circunferência (r)", si_unit: "m" }
        },
        constraints: ["r > 0"],
        description: "Lado do triângulo equilátero inscrito no círculo."
    },
    {
        id: "inscribed_square",
        name: "Quadrado Inscrito",
        category: "Matemática: Geometria Plana",
        latex: "l = r\\sqrt{2}",
        computable: {
            "l": "r * sqrt(2)",
            "r": "l / sqrt(2)"
        },
        variables: {
            "l": { name: "Lado do quadrado (l)", si_unit: "m" },
            "r": { name: "Raio da circunferência (r)", si_unit: "m" }
        },
        constraints: ["r > 0"],
        description: "Lado do quadrado inscrito no círculo."
    },

    // Comprimentos e Áreas Planas
    {
        id: "circle_perimeter",
        name: "Comprimento da Circunferência",
        category: "Matemática: Geometria Plana",
        latex: "C = 2\\pi r",
        computable: {
            "C": "2 * pi * r",
            "r": "C / (2 * pi)"
        },
        variables: {
            "C": { name: "Comprimento (C)", si_unit: "m" },
            "r": { name: "Raio (r)", si_unit: "m" }
        },
        constraints: ["r > 0"],
        description: "Perímetro da circunferência."
    },
    {
        id: "triangle_area_general",
        name: "Área do Triângulo (Base e Altura)",
        category: "Matemática: Geometria Plana",
        latex: "A = \\frac{b \\cdot h}{2}",
        computable: {
            "A": "(b * h) / 2",
            "b": "(2 * A) / h",
            "h": "(2 * A) / b"
        },
        variables: {
            "A": { name: "Área (A)", si_unit: "m^2" },
            "b": { name: "Base (b)", si_unit: "m" },
            "h": { name: "Altura (h)", si_unit: "m" }
        },
        constraints: ["b > 0", "h > 0"],
        description: "Área de triângulo padrão."
    },
    {
        id: "triangle_area_equilateral",
        name: "Área do Triângulo Equilátero",
        category: "Matemática: Geometria Plana",
        latex: "A = \\frac{l^2\\sqrt{3}}{4}",
        computable: {
            "A": "(l^2 * sqrt(3)) / 4",
            "l": "sqrt((4 * A) / sqrt(3))"
        },
        variables: {
            "A": { name: "Área (A)", si_unit: "m^2" },
            "l": { name: "Lado (l)", si_unit: "m" }
        },
        constraints: ["l > 0"],
        description: "Área do triângulo com três lados iguais."
    },
    {
        id: "rectangle_area",
        name: "Área do Retângulo / Paralelogramo",
        category: "Matemática: Geometria Plana",
        latex: "A = b \\cdot h",
        computable: {
            "A": "b * h",
            "b": "A / h",
            "h": "A / b"
        },
        variables: {
            "A": { name: "Área (A)", si_unit: "m^2" },
            "b": { name: "Base (b)", si_unit: "m" },
            "h": { name: "Altura (h)", si_unit: "m" }
        },
        constraints: ["b > 0", "h > 0"],
        description: "Área de retângulo ou paralelogramo."
    },
    {
        id: "trapezoid_area",
        name: "Área do Trapézio",
        category: "Matemática: Geometria Plana",
        latex: "A = \\frac{(B + b) \\cdot h}{2}",
        computable: {
            "A": "((B + b) * h) / 2",
            "h": "(2 * A) / (B + b)",
            "B": "((2 * A) / h) - b",
            "b": "((2 * A) / h) - B"
        },
        variables: {
            "A": { name: "Área (A)", si_unit: "m^2" },
            "B": { name: "Base maior (B)", si_unit: "m" },
            "b": { name: "Base menor (b)", si_unit: "m" },
            "h": { name: "Altura (h)", si_unit: "m" }
        },
        constraints: ["B > 0", "b > 0", "h > 0"],
        description: "Área do trapézio."
    },
    {
        id: "rhombus_area",
        name: "Área do Losango",
        category: "Matemática: Geometria Plana",
        latex: "A = \\frac{D \\cdot d}{2}",
        computable: {
            "A": "(D * d) / 2",
            "D": "(2 * A) / d",
            "d": "(2 * A) / D"
        },
        variables: {
            "A": { name: "Área (A)", si_unit: "m^2" },
            "D": { name: "Diagonal maior (D)", si_unit: "m" },
            "d": { name: "Diagonal menor (d)", si_unit: "m" }
        },
        constraints: ["D > 0", "d > 0"],
        description: "Área do losango pelas diagonais."
    },
    {
        id: "hexagon_area",
        name: "Área do Hexágono Regular",
        category: "Matemática: Geometria Plana",
        latex: "A = \\frac{3l^2\\sqrt{3}}{2}",
        computable: {
            "A": "(3 * l^2 * sqrt(3)) / 2",
            "l": "sqrt((2 * A) / (3 * sqrt(3)))"
        },
        variables: {
            "A": { name: "Área (A)", si_unit: "m^2" },
            "l": { name: "Lado (l)", si_unit: "m" }
        },
        constraints: ["l > 0"],
        description: "Área de hexágono regular."
    },
    {
        id: "circle_area",
        name: "Área do Círculo",
        category: "Matemática: Geometria Plana",
        latex: "A = \\pi r^2",
        computable: {
            "A": "pi * r^2",
            "r": "sqrt(A / pi)"
        },
        variables: {
            "A": { name: "Área (A)", si_unit: "m^2" },
            "r": { name: "Raio (r)", si_unit: "m" }
        },
        constraints: ["r > 0"],
        description: "Área do disco circular."
    },
    {
        id: "circular_sector_rad",
        name: "Área do Setor Circular (Radianos)",
        category: "Matemática: Geometria Plana",
        latex: "A = \\frac{\\alpha \\cdot r^2}{2}",
        computable: {
            "A": "(alpha * r^2) / 2",
            "alpha": "(2 * A) / (r^2)",
            "r": "sqrt((2 * A) / alpha)"
        },
        variables: {
            "A": { name: "Área do setor (A)", si_unit: "m^2" },
            "alpha": { name: "Ângulo central (α)", si_unit: "rad" },
            "r": { name: "Raio (r)", si_unit: "m" }
        },
        constraints: ["r > 0", "alpha > 0"],
        description: "Área de setor circular com ângulo em radianos."
    },

    // ============================================================
    // TRIGONOMETRIA
    // ============================================================
    {
        id: "trig_law_of_cosines",
        name: "Lei dos Cossenos",
        category: "Matemática: Trigonometria",
        latex: "a^2 = b^2 + c^2 - 2bc\\cos(A)",
        computable: {
            "a": "sqrt(b^2 + c^2 - 2 * b * c * cos(A))",
            "A": "acos((b^2 + c^2 - a^2) / (2 * b * c))"
        },
        variables: {
            "a": { name: "Lado a", si_unit: "m" },
            "b": { name: "Lado b", si_unit: "m" },
            "c": { name: "Lado c", si_unit: "m" },
            "A": { name: "Ângulo oposto A (rad)", si_unit: "rad" }
        },
        constraints: ["b > 0", "c > 0"],
        description: "Lei dos Cossenos para triângulos quaisquer."
    },
    {
        id: "trig_law_of_sines",
        name: "Lei dos Senos (Parcial a/senA = b/senB)",
        category: "Matemática: Trigonometria",
        latex: "\\frac{a}{\\sin(A)} = \\frac{b}{\\sin(B)}",
        computable: {
            "a": "(b * sin(A)) / sin(B)",
            "b": "(a * sin(B)) / sin(A)",
            "A": "asin((a * sin(B)) / b)",
            "B": "asin((b * sin(A)) / a)"
        },
        variables: {
            "a": { name: "Lado a", si_unit: "m" },
            "A": { name: "Ângulo oposto A (rad)", si_unit: "rad" },
            "b": { name: "Lado b", si_unit: "m" },
            "B": { name: "Ângulo oposto B (rad)", si_unit: "rad" }
        },
        constraints: ["a > 0", "b > 0"],
        description: "Relação da Lei dos Senos entre dois lados e ângulos."
    },
    {
        id: "trig_tan_rel",
        name: "Tangente — Relação Seno/Cosseno",
        category: "Matemática: Trigonometria",
        latex: "\\tan(\\alpha) = \\frac{\\sin(\\alpha)}{\\cos(\\alpha)}",
        computable: {
            "tan": "sin_val / cos_val",
            "sin_val": "tan * cos_val",
            "cos_val": "sin_val / tan"
        },
        variables: {
            "tan": { name: "Tangente (tg α)", si_unit: "" },
            "sin_val": { name: "Seno (sen α)", si_unit: "" },
            "cos_val": { name: "Cosseno (cos α)", si_unit: "" }
        },
        constraints: ["cos_val != 0"],
        description: "Relação trigonométrica fundamental da tangente."
    },

    // ============================================================
    // ANÁLISE COMBINATÓRIA E PROBABILIDADE
    // ============================================================
    {
        id: "permutations_simple",
        name: "Permutação Simples",
        category: "Matemática: Combinatória",
        latex: "P_n = n!",
        computable: {
            "P": "factorial(n)"
        },
        variables: {
            "P": { name: "Permutações (Pn)", si_unit: "" },
            "n": { name: "Número de elementos (n)", si_unit: "" }
        },
        constraints: ["n >= 0"],
        description: "Número de maneiras de ordenar n elementos distintos."
    },
    {
        id: "arrangements_simple",
        name: "Arranjo Simples",
        category: "Matemática: Combinatória",
        latex: "A(n, p) = \\frac{n!}{(n - p)!}",
        computable: {
            "A": "factorial(n) / factorial(n - p)"
        },
        variables: {
            "A": { name: "Arranjos A(n,p)", si_unit: "" },
            "n": { name: "Total de elementos (n)", si_unit: "" },
            "p": { name: "Agrupamento (p)", si_unit: "" }
        },
        constraints: ["n >= p", "p >= 0"],
        description: "Arranjo simples com ordem relevante."
    },
    {
        id: "combinations_simple",
        name: "Combinação Simples",
        category: "Matemática: Combinatória",
        latex: "C(n, p) = \\frac{n!}{p!(n - p)!}",
        computable: {
            "C": "combinations(n, p)"
        },
        variables: {
            "C": { name: "Combinações C(n,p)", si_unit: "" },
            "n": { name: "Total de elementos (n)", si_unit: "" },
            "p": { name: "Agrupamento (p)", si_unit: "" }
        },
        constraints: ["n >= p", "p >= 0"],
        description: "Combinação simples onde a ordem não importa."
    },
    {
        id: "probability_basic",
        name: "Probabilidade Clássica",
        category: "Matemática: Probabilidade",
        latex: "P(A) = \\frac{n(A)}{n(\\Omega)}",
        computable: {
            "P": "nA / nOmega",
            "nA": "P * nOmega",
            "nOmega": "nA / P"
        },
        variables: {
            "P": { name: "Probabilidade P(A)", si_unit: "" },
            "nA": { name: "Casos favoráveis n(A)", si_unit: "" },
            "nOmega": { name: "Espaço amostral n(Ω)", si_unit: "" }
        },
        constraints: ["nOmega > 0", "nA >= 0", "nA <= nOmega"],
        description: "Cálculo de probabilidade elementar."
    },
    {
        id: "probability_union",
        name: "Probabilidade da União de Eventos",
        category: "Matemática: Probabilidade",
        latex: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)",
        computable: {
            "Pu": "PA + PB - Pi",
            "Pi": "PA + PB - Pu",
            "PA": "Pu - PB + Pi",
            "PB": "Pu - PA + Pi"
        },
        variables: {
            "Pu": { name: "P(A ∪ B)", si_unit: "" },
            "PA": { name: "P(A)", si_unit: "" },
            "PB": { name: "P(B)", si_unit: "" },
            "Pi": { name: "P(A ∩ B)", si_unit: "" }
        },
        constraints: ["PA >= 0", "PB >= 0", "Pi >= 0", "Pu <= 1"],
        description: "Teorema da soma para união de dois eventos."
    },
    {
        id: "probability_conditional",
        name: "Probabilidade Condicional",
        category: "Matemática: Probabilidade",
        latex: "P(A|B) = \\frac{P(A \\cap B)}{P(B)}",
        computable: {
            "Pcond": "Pi / PB",
            "Pi": "Pcond * PB",
            "PB": "Pi / Pcond"
        },
        variables: {
            "Pcond": { name: "P(A|B)", si_unit: "" },
            "Pi": { name: "P(A ∩ B)", si_unit: "" },
            "PB": { name: "P(B)", si_unit: "" }
        },
        constraints: ["PB > 0", "Pi >= 0"],
        description: "Probabilidade de A dado que B ocorreu."
    },

    // ============================================================
    // ESTATÍSTICA
    // ============================================================
    {
        id: "arithmetic_mean",
        name: "Média Aritmética",
        category: "Matemática: Estatística",
        type: "DYNAMIC_LIST",
        listVariable: "valores",
        itemFields: ["x"],
        targetVariable: "media",
        latex: "MA = \\frac{\\Sigma x}{n}",
        computable: {
            "media": "mean(valores)"
        },
        variables: {
            "media": { name: "Média Aritmética", si_unit: "" },
            "valores": { name: "Valores (x)", si_unit: "" }
        },
        description: "Média aritmética simples de n valores."
    },
    {
        id: "variance",
        name: "Variância (Amostral)",
        category: "Matemática: Estatística",
        type: "DYNAMIC_LIST",
        listVariable: "valores",
        itemFields: ["x"],
        targetVariable: "var",
        latex: "V = \\frac{\\Sigma (x_i - MA)^2}{n - 1}",
        computable: {
            "var": "variance(valores)"
        },
        variables: {
            "var": { name: "Variância (V)", si_unit: "" },
            "valores": { name: "Valores (x)", si_unit: "" }
        },
        description: "Variância de uma lista de valores."
    },
    {
        id: "std_deviation",
        name: "Desvio Padrão",
        category: "Matemática: Estatística",
        type: "DYNAMIC_LIST",
        listVariable: "valores",
        itemFields: ["x"],
        targetVariable: "dp",
        latex: "DP = \\sqrt{V}",
        computable: {
            "dp": "std(valores)"
        },
        variables: {
            "dp": { name: "Desvio Padrão (DP)", si_unit: "" },
            "valores": { name: "Valores (x)", si_unit: "" }
        },
        description: "Desvio padrão estatístico."
    },
    {
        id: "percentage_change",
        name: "Variação Percentual",
        category: "Matemática: Estatística",
        latex: "\\Delta\\% = \\frac{x_f - x_i}{x_i} \\times 100",
        computable: {
            "delta_p": "((xf - xi) / xi) * 100",
            "xf": "xi * (1 + delta_p / 100)",
            "xi": "xf / (1 + delta_p / 100)"
        },
        variables: {
            "delta_p": { name: "Variação (%)", si_unit: "%" },
            "xi": { name: "Valor Inicial", si_unit: "" },
            "xf": { name: "Valor Final", si_unit: "" }
        },
        constraints: ["xi != 0"],
        description: "Aumento ou desconto percentual entre dois valores."
    },

    // ============================================================
    // GEOMETRIA ESPACIAL
    // ============================================================
    {
        id: "euler_polyhedra",
        name: "Relação de Euler (Poliedros)",
        category: "Matemática: Geometria Espacial",
        latex: "V - A + F = 2",
        computable: {
            "V": "2 + A - F",
            "A": "V + F - 2",
            "F": "2 + A - V"
        },
        variables: {
            "V": { name: "Vértices (V)", si_unit: "" },
            "A": { name: "Arestas (A)", si_unit: "" },
            "F": { name: "Faces (F)", si_unit: "" }
        },
        constraints: ["V >= 4", "F >= 4", "A >= 6"],
        description: "Teorema de Euler para poliedros convexos."
    },
    {
        id: "cuboid_diagonal",
        name: "Diagonal do Paralelepípedo",
        category: "Matemática: Geometria Espacial",
        latex: "d = \\sqrt{a^2 + b^2 + c^2}",
        computable: {
            "d": "sqrt(a^2 + b^2 + c^2)",
            "a": "sqrt(d^2 - b^2 - c^2)",
            "b": "sqrt(d^2 - a^2 - c^2)",
            "c": "sqrt(d^2 - a^2 - b^2)"
        },
        variables: {
            "d": { name: "Diagonal (d)", si_unit: "m" },
            "a": { name: "Comprimento a", si_unit: "m" },
            "b": { name: "Largura b", si_unit: "m" },
            "c": { name: "Altura c", si_unit: "m" }
        },
        constraints: ["d > 0", "a > 0", "b > 0", "c > 0"],
        description: "Diagonal espacial de bloco retangular."
    },
    {
        id: "prism_volume",
        name: "Volume do Prisma / Cilindro",
        category: "Matemática: Geometria Espacial",
        latex: "V = A_b \\cdot h",
        computable: {
            "V": "Ab * h",
            "Ab": "V / h",
            "h": "V / Ab"
        },
        variables: {
            "V": { name: "Volume (V)", si_unit: "m^3" },
            "Ab": { name: "Área da base (Ab)", si_unit: "m^2" },
            "h": { name: "Altura (h)", si_unit: "m" }
        },
        constraints: ["Ab > 0", "h > 0"],
        description: "Volume de prisma reto ou cilindro."
    },
    {
        id: "pyramid_volume",
        name: "Volume da Pirâmide / Cone",
        category: "Matemática: Geometria Espacial",
        latex: "V = \\frac{A_b \\cdot h}{3}",
        computable: {
            "V": "(Ab * h) / 3",
            "Ab": "(3 * V) / h",
            "h": "(3 * V) / Ab"
        },
        variables: {
            "V": { name: "Volume (V)", si_unit: "m^3" },
            "Ab": { name: "Área da base (Ab)", si_unit: "m^2" },
            "h": { name: "Altura (h)", si_unit: "m" }
        },
        constraints: ["Ab > 0", "h > 0"],
        description: "Volume de pirâmide ou cone reto."
    },
    {
        id: "cylinder_volume",
        name: "Volume do Cilindro Circular",
        category: "Matemática: Geometria Espacial",
        latex: "V = \\pi R^2 h",
        computable: {
            "V": "pi * (R^2) * h",
            "R": "sqrt(V / (pi * h))",
            "h": "V / (pi * R^2)"
        },
        variables: {
            "V": { name: "Volume (V)", si_unit: "m^3" },
            "R": { name: "Raio da base (R)", si_unit: "m" },
            "h": { name: "Altura (h)", si_unit: "m" }
        },
        constraints: ["R > 0", "h > 0"],
        description: "Volume do cilindro circular reto."
    },
    {
        id: "cone_volume",
        name: "Volume do Cone Circular",
        category: "Matemática: Geometria Espacial",
        latex: "V = \\frac{\\pi R^2 h}{3}",
        computable: {
            "V": "(pi * (R^2) * h) / 3",
            "R": "sqrt((3 * V) / (pi * h))",
            "h": "(3 * V) / (pi * R^2)"
        },
        variables: {
            "V": { name: "Volume (V)", si_unit: "m^3" },
            "R": { name: "Raio da base (R)", si_unit: "m" },
            "h": { name: "Altura (h)", si_unit: "m" }
        },
        constraints: ["R > 0", "h > 0"],
        description: "Volume do cone circular reto."
    },
    {
        id: "sphere_volume",
        name: "Volume da Esfera",
        category: "Matemática: Geometria Espacial",
        latex: "V = \\frac{4}{3}\\pi R^3",
        computable: {
            "V": "(4/3) * pi * (R^3)",
            "R": "cbrt((3 * V) / (4 * pi))"
        },
        variables: {
            "V": { name: "Volume (V)", si_unit: "m^3" },
            "R": { name: "Raio da esfera (R)", si_unit: "m" }
        },
        constraints: ["R > 0"],
        description: "Volume da esfera tridimensional."
    },
    {
        id: "sphere_area",
        name: "Área da Superfície Esférica",
        category: "Matemática: Geometria Espacial",
        latex: "A = 4\\pi R^2",
        computable: {
            "A": "4 * pi * R^2",
            "R": "sqrt(A / (4 * pi))"
        },
        variables: {
            "A": { name: "Área superficial (A)", si_unit: "m^2" },
            "R": { name: "Raio (R)", si_unit: "m" }
        },
        constraints: ["R > 0"],
        description: "Área da casca esférica."
    },

    // ============================================================
    // GEOMETRIA ANALÍTICA
    // ============================================================
    {
        id: "points_distance",
        name: "Distância entre Dois Pontos",
        category: "Matemática: Geometria Analítica",
        latex: "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}",
        computable: {
            "d": "sqrt((x2 - x1)^2 + (y2 - y1)^2)"
        },
        variables: {
            "d": { name: "Distância (d)", si_unit: "m" },
            "x1": { name: "x₁", si_unit: "" },
            "y1": { name: "y₁", si_unit: "" },
            "x2": { name: "x₂", si_unit: "" },
            "y2": { name: "y₂", si_unit: "" }
        },
        description: "Distância euclidiana entre dois pontos no plano cartesiano."
    },
    {
        id: "line_slope",
        name: "Coeficiente Angular da Reta",
        category: "Matemática: Geometria Analítica",
        latex: "m = \\frac{y_2 - y_1}{x_2 - x_1}",
        computable: {
            "m": "(y2 - y1) / (x2 - x1)",
            "y2": "y1 + m * (x2 - x1)",
            "x2": "x1 + (y2 - y1) / m"
        },
        variables: {
            "m": { name: "Declividade / Coef. angular (m)", si_unit: "" },
            "x1": { name: "x₁", si_unit: "" },
            "y1": { name: "y₁", si_unit: "" },
            "x2": { name: "x₂", si_unit: "" },
            "y2": { name: "y₂", si_unit: "" }
        },
        constraints: ["x2 != x1"],
        description: "Inclinação da reta que passa por dois pontos."
    },
    {
        id: "point_line_distance",
        name: "Distância de Ponto a Reta",
        category: "Matemática: Geometria Analítica",
        latex: "d = \\frac{|a x_0 + b y_0 + c|}{\\sqrt{a^2 + b^2}}",
        computable: {
            "d": "abs(a * x0 + b * y0 + c) / sqrt(a^2 + b^2)"
        },
        variables: {
            "d": { name: "Distância (d)", si_unit: "m" },
            "a": { name: "Coef. a da reta", si_unit: "" },
            "b": { name: "Coef. b da reta", si_unit: "" },
            "c": { name: "Coef. c da reta", si_unit: "" },
            "x0": { name: "Ponto x₀", si_unit: "" },
            "y0": { name: "Ponto y₀", si_unit: "" }
        },
        constraints: ["a != 0 or b != 0"],
        description: "Distância perpendicular do ponto P(x0,y0) à reta ax+by+c=0."
    },

    // ============================================================
    // NÚMEROS COMPLEXOS
    // ============================================================
    {
        id: "complex_modulus",
        name: "Módulo do Número Complexo",
        category: "Matemática: Números Complexos",
        latex: "|z| = \\rho = \\sqrt{a^2 + b^2}",
        computable: {
            "rho": "sqrt(a^2 + b^2)",
            "a": "sqrt(rho^2 - b^2)",
            "b": "sqrt(rho^2 - a^2)"
        },
        variables: {
            "rho": { name: "Módulo (|z| / ρ)", si_unit: "" },
            "a": { name: "Parte real (a)", si_unit: "" },
            "b": { name: "Parte imaginária (b)", si_unit: "" }
        },
        constraints: ["rho >= 0"],
        description: "Módulo de z = a + bi no plano de Argand-Gauss."
    },
    // ============================================================
    // MATEMÁTICA FINANCEIRA
    // ============================================================
    {
        id: "simple_interest",
        name: "Juros Simples",
        category: "Matemática: Financeira",
        latex: "J = C \\cdot i \\cdot t",
        computable: {
            "J": "C * i * t",
            "C": "J / (i * t)",
            "i": "J / (C * t)",
            "t": "J / (C * i)"
        },
        variables: {
            "J": { name: "Juros (J)", si_unit: "$" },
            "C": { name: "Capital (C)", si_unit: "$" },
            "i": { name: "Taxa (i decimal)", si_unit: "" },
            "t": { name: "Tempo (t)", si_unit: "" }
        },
        description: "Cálculo de juros simples."
    },
    {
        id: "compound_interest",
        name: "Juros Compostos (Montante)",
        category: "Matemática: Financeira",
        latex: "M = C(1 + i)^t",
        computable: {
            "M": "C * (1 + i)^t",
            "C": "M / (1 + i)^t",
            "t": "log(M / C) / log(1 + i)",
            "i": "(M / C)^(1 / t) - 1"
        },
        variables: {
            "M": { name: "Montante (M)", si_unit: "$" },
            "C": { name: "Capital (C)", si_unit: "$" },
            "i": { name: "Taxa (i decimal)", si_unit: "" },
            "t": { name: "Tempo (t)", si_unit: "" }
        },
        description: "Cálculo de montante com juros compostos."
    },
    {
        id: "thales_theorem",
        name: "Teorema de Tales",
        category: "Matemática: Geometria Plana",
        latex: "\\frac{A}{B} = \\frac{C}{D}",
        computable: {
            "A": "(C * B) / D",
            "B": "(A * D) / C",
            "C": "(A * D) / B",
            "D": "(C * B) / A"
        },
        variables: {
            "A": { name: "Segmento A", si_unit: "m" },
            "B": { name: "Segmento B", si_unit: "m" },
            "C": { name: "Segmento C", si_unit: "m" },
            "D": { name: "Segmento D", si_unit: "m" }
        },
        description: "Proporção de segmentos retas paralelas cortadas por transversais."
    },
    {
        id: "trig_sec_func",
        name: "Secante",
        category: "Matemática: Trigonometria",
        latex: "\\sec(x) = \\frac{1}{\\cos(x)}",
        computable: {
            "sec": "1 / cos(x)",
            "x": "acos(1 / sec)"
        },
        variables: {
            "sec": { name: "Secante", si_unit: "" },
            "x": { name: "Ângulo (rad)", si_unit: "rad" }
        },
        description: "Função trigonométrica secante."
    },
    {
        id: "trig_csc_func",
        name: "Cossecante",
        category: "Matemática: Trigonometria",
        latex: "\\csc(x) = \\frac{1}{\\sin(x)}",
        computable: {
            "csc": "1 / sin(x)",
            "x": "asin(1 / csc)"
        },
        variables: {
            "csc": { name: "Cossecante", si_unit: "" },
            "x": { name: "Ângulo (rad)", si_unit: "rad" }
        },
        description: "Função trigonométrica cossecante."
    },
    {
        id: "hexagon_inscribed",
        name: "Hexágono Inscrito",
        category: "Matemática: Geometria Plana",
        latex: "L = R",
        computable: {
            "L": "R",
            "R": "L"
        },
        variables: {
            "L": { name: "Lado", si_unit: "m" },
            "R": { name: "Raio", si_unit: "m" }
        },
        description: "Relação do lado do hexágono com o raio."
    },
    {
        id: "pyramid_frustum_volume",
        name: "Volume do Tronco de Pirâmide",
        category: "Matemática: Geometria Espacial",
        type: "FIXED_FORMULA",
        latex: "V = \\frac{h}{3} (B + b + \\sqrt{B \\cdot b})",
        computable: {
            "V": "(h / 3) * (B + b + sqrt(B * b))"
        },
        variables: {
            "V": { name: "Volume", si_unit: "m^3" },
            "h": { name: "Altura", si_unit: "m" },
            "B": { name: "Área da base maior", si_unit: "m^2" },
            "b": { name: "Área da base menor", si_unit: "m^2" }
        },
        description: "Volume de um tronco de pirâmide."
    },
    {
        id: "cone_frustum_volume",
        name: "Volume do Tronco de Cone",
        category: "Matemática: Geometria Espacial",
        type: "FIXED_FORMULA",
        latex: "V = \\frac{\\pi \\cdot h}{3} (R^2 + R \\cdot r + r^2)",
        computable: {
            "V": "(pi * h / 3) * (R^2 + R * r + r^2)"
        },
        variables: {
            "V": { name: "Volume", si_unit: "m^3" },
            "h": { name: "Altura", si_unit: "m" },
            "R": { name: "Raio maior", si_unit: "m" },
            "r": { name: "Raio menor", si_unit: "m" }
        },
        description: "Volume de um tronco de cone circular."
    },
    {
        id: "ellipse_eq",
        name: "Equação da Elipse (Eixo Maior X)",
        category: "Matemática: Geometria Analítica",
        type: "FIXED_FORMULA",
        latex: "\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1",
        computable: {
            "y": "sqrt((1 - (x^2 / a^2)) * b^2)"
        },
        variables: {
            "y": { name: "Coordenada y (+)", si_unit: "" },
            "x": { name: "Coordenada x", si_unit: "" },
            "a": { name: "Semieixo a", si_unit: "" },
            "b": { name: "Semieixo b", si_unit: "" }
        },
        description: "Equação reduzida da elipse."
    },
    {
        id: "hyperbola_eq_x",
        name: "Equação da Hipérbole (Eixo Real X)",
        category: "Matemática: Geometria Analítica",
        type: "FIXED_FORMULA",
        latex: "\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1",
        computable: {
            "y": "sqrt(((x^2 / a^2) - 1) * b^2)"
        },
        variables: {
            "y": { name: "Coordenada y (+)", si_unit: "" },
            "x": { name: "Coordenada x", si_unit: "" },
            "a": { name: "Semieixo real a", si_unit: "" },
            "b": { name: "Semieixo imag. b", si_unit: "" }
        },
        description: "Equação reduzida da hipérbole."
    },
    {
        id: "parabola_eq_x",
        name: "Equação da Parábola (Eixo X)",
        category: "Matemática: Geometria Analítica",
        type: "FIXED_FORMULA",
        latex: "y^2 = 2px",
        computable: {
            "y": "sqrt(2 * p * x)",
            "x": "y^2 / (2 * p)"
        },
        variables: {
            "y": { name: "Coordenada y (+)", si_unit: "" },
            "x": { name: "Coordenada x", si_unit: "" },
            "p": { name: "Parâmetro p", si_unit: "" }
        },
        description: "Equação reduzida da parábola (eixo horizontal)."
    },
    {
        id: "newton_binomial",
        name: "Binômio de Newton",
        category: "Matemática: Combinatória",
        type: "DYNAMIC_STRUCTURE",
        latex: "(a+b)^n",
        computable: {
            "res": "(a + b)^n"
        },
        variables: {
            "res": { name: "Resultado", si_unit: "" },
            "a": { name: "Termo a", si_unit: "" },
            "b": { name: "Termo b", si_unit: "" },
            "n": { name: "Expoente n", si_unit: "" }
        },
        description: "Expansão binomial."
    },
    {
        id: "moivre_formula",
        name: "Fórmula de Moivre",
        category: "Matemática: Complexos",
        type: "DYNAMIC_STRUCTURE",
        latex: "z^n = \\rho^n [\\cos(n\\theta) + i\\sin(n\\theta)]",
        computable: {
            "rho_n": "rho^n",
            "theta_n": "n * theta"
        },
        variables: {
            "rho_n": { name: "Módulo Final", si_unit: "" },
            "theta_n": { name: "Ângulo Final (rad)", si_unit: "rad" },
            "rho": { name: "Módulo Inicial (ρ)", si_unit: "" },
            "theta": { name: "Ângulo Inicial (rad)", si_unit: "rad" },
            "n": { name: "Expoente n", si_unit: "" }
        },
        description: "Potência de um número complexo."
    }
    // ============================================================
    // GEOMETRIA PLANA - ÁREAS E RELAÇÕES
    // ============================================================
    ,{
        id: "heron_formula",
        name: "Fórmula de Heron",
        category: "Matemática: Geometria Plana",
        type: "FIXED_FORMULA",
        latex: "A = \\sqrt{s(s-a)(s-b)(s-c)}",
        computable: {
            "A": "sqrt(s*(s-a)*(s-b)*(s-c))"
        },
        variables: {
            "A": { name: "Área", si_unit: "m^2" },
            "s": { name: "Semiperímetro", si_unit: "m" },
            "a": { name: "Lado a", si_unit: "m" },
            "b": { name: "Lado b", si_unit: "m" },
            "c": { name: "Lado c", si_unit: "m" }
        },
        description: "Área do triângulo pelos lados."
    },
    // ============================================================
    // TRIGONOMETRIA AVANÇADA
    // ============================================================
    {
        id: "trig_tan_func",
        name: "Tangente (Triângulo)",
        category: "Matemática: Trigonometria",
        latex: "\\tan(B) = \\frac{b}{c}",
        computable: {
            "tanB": "b / c",
            "b": "tanB * c",
            "c": "b / tanB"
        },
        variables: {
            "tanB": { name: "Tangente B", si_unit: "" },
            "b": { name: "Cateto oposto", si_unit: "m" },
            "c": { name: "Cateto adjacente", si_unit: "m" }
        },
        description: "Tangente a partir dos catetos."
    },
    {
        id: "trig_cot_func",
        name: "Cotangente",
        category: "Matemática: Trigonometria",
        latex: "\\cot(x) = \\frac{\\cos(x)}{\\sin(x)}",
        computable: {
            "cotx": "cos(x) / sin(x)",
            "x": "acot(cotx)"
        },
        variables: {
            "cotx": { name: "Cotangente", si_unit: "" },
            "x": { name: "Ângulo (rad)", si_unit: "rad" }
        },
        description: "Cotangente de um ângulo."
    },
    {
        id: "trig_identity_fundamental",
        name: "Identidade Fundamental",
        category: "Matemática: Trigonometria",
        latex: "\\sin^2(x) + \\cos^2(x) = 1",
        computable: {
            "sin2": "1 - cos2",
            "cos2": "1 - sin2"
        },
        variables: {
            "sin2": { name: "Seno ao quadrado", si_unit: "" },
            "cos2": { name: "Cosseno ao quadrado", si_unit: "" }
        },
        description: "Relação fundamental da trigonometria."
    },
    {
        id: "trig_identity_tan",
        name: "Identidade da Tangente",
        category: "Matemática: Trigonometria",
        latex: "\\tan^2(x) + 1 = \\sec^2(x)",
        computable: {
            "tan2": "sec2 - 1",
            "sec2": "tan2 + 1"
        },
        variables: {
            "tan2": { name: "Tangente ao quadrado", si_unit: "" },
            "sec2": { name: "Secante ao quadrado", si_unit: "" }
        },
        description: "Relação entre tangente e secante."
    },
    {
        id: "trig_identity_cot",
        name: "Identidade da Cotangente",
        category: "Matemática: Trigonometria",
        latex: "\\cot^2(x) + 1 = \\csc^2(x)",
        computable: {
            "cot2": "csc2 - 1",
            "csc2": "cot2 + 1"
        },
        variables: {
            "cot2": { name: "Cotangente ao quadrado", si_unit: "" },
            "csc2": { name: "Cossecante ao quadrado", si_unit: "" }
        },
        description: "Relação entre cotangente e cossecante."
    },
    {
        id: "trig_sin_sum",
        name: "Seno da Soma",
        category: "Matemática: Trigonometria",
        latex: "\\sin(a+b) = \\sin a \\cos b + \\sin b \\cos a",
        computable: {
            "sin_ab": "sinA * cosB + sinB * cosA"
        },
        variables: {
            "sin_ab": { name: "sen(a+b)", si_unit: "" },
            "sinA": { name: "sen(a)", si_unit: "" },
            "cosA": { name: "cos(a)", si_unit: "" },
            "sinB": { name: "sen(b)", si_unit: "" },
            "cosB": { name: "cos(b)", si_unit: "" }
        },
        description: "Seno da soma de dois arcos."
    },
    {
        id: "trig_sin_diff",
        name: "Seno da Diferença",
        category: "Matemática: Trigonometria",
        latex: "\\sin(a-b) = \\sin a \\cos b - \\sin b \\cos a",
        computable: {
            "sin_ab": "sinA * cosB - sinB * cosA"
        },
        variables: {
            "sin_ab": { name: "sen(a-b)", si_unit: "" },
            "sinA": { name: "sen(a)", si_unit: "" },
            "cosA": { name: "cos(a)", si_unit: "" },
            "sinB": { name: "sen(b)", si_unit: "" },
            "cosB": { name: "cos(b)", si_unit: "" }
        },
        description: "Seno da diferença de dois arcos."
    },
    {
        id: "trig_cos_sum",
        name: "Cosseno da Soma",
        category: "Matemática: Trigonometria",
        latex: "\\cos(a+b) = \\cos a \\cos b - \\sin a \\sin b",
        computable: {
            "cos_ab": "cosA * cosB - sinA * sinB"
        },
        variables: {
            "cos_ab": { name: "cos(a+b)", si_unit: "" },
            "sinA": { name: "sen(a)", si_unit: "" },
            "cosA": { name: "cos(a)", si_unit: "" },
            "sinB": { name: "sen(b)", si_unit: "" },
            "cosB": { name: "cos(b)", si_unit: "" }
        },
        description: "Cosseno da soma de dois arcos."
    },
    {
        id: "trig_cos_diff",
        name: "Cosseno da Diferença",
        category: "Matemática: Trigonometria",
        latex: "\\cos(a-b) = \\cos a \\cos b + \\sin a \\sin b",
        computable: {
            "cos_ab": "cosA * cosB + sinA * sinB"
        },
        variables: {
            "cos_ab": { name: "cos(a-b)", si_unit: "" },
            "sinA": { name: "sen(a)", si_unit: "" },
            "cosA": { name: "cos(a)", si_unit: "" },
            "sinB": { name: "sen(b)", si_unit: "" },
            "cosB": { name: "cos(b)", si_unit: "" }
        },
        description: "Cosseno da diferença de dois arcos."
    },
    {
        id: "trig_tan_sum",
        name: "Tangente da Soma",
        category: "Matemática: Trigonometria",
        latex: "\\tan(a+b) = \\frac{\\tan a + \\tan b}{1 - \\tan a \\tan b}",
        computable: {
            "tan_ab": "(tanA + tanB) / (1 - tanA * tanB)"
        },
        variables: {
            "tan_ab": { name: "tg(a+b)", si_unit: "" },
            "tanA": { name: "tg(a)", si_unit: "" },
            "tanB": { name: "tg(b)", si_unit: "" }
        },
        description: "Tangente da soma de dois arcos."
    },
    {
        id: "trig_tan_diff",
        name: "Tangente da Diferença",
        category: "Matemática: Trigonometria",
        latex: "\\tan(a-b) = \\frac{\\tan a - \\tan b}{1 + \\tan a \\tan b}",
        computable: {
            "tan_ab": "(tanA - tanB) / (1 + tanA * tanB)"
        },
        variables: {
            "tan_ab": { name: "tg(a-b)", si_unit: "" },
            "tanA": { name: "tg(a)", si_unit: "" },
            "tanB": { name: "tg(b)", si_unit: "" }
        },
        description: "Tangente da diferença de dois arcos."
    },
    // ============================================================
    // PROBABILIDADE
    // ============================================================
    {
        id: "probability_mutually_exclusive",
        name: "Probabilidade (Mutuamente Exclusivos)",
        category: "Matemática: Probabilidade",
        latex: "P(A \\cup B) = P(A) + P(B)",
        computable: {
            "Pu": "Pa + Pb",
            "Pa": "Pu - Pb",
            "Pb": "Pu - Pa"
        },
        variables: {
            "Pu": { name: "P(A ∪ B)", si_unit: "" },
            "Pa": { name: "P(A)", si_unit: "" },
            "Pb": { name: "P(B)", si_unit: "" }
        },
        description: "Probabilidade da união de eventos mutuamente exclusivos."
    },
    {
        id: "probability_independent",
        name: "Probabilidade (Independência)",
        category: "Matemática: Probabilidade",
        latex: "P(A \\cap B) = P(A) \\cdot P(B)",
        computable: {
            "Pi": "Pa * Pb",
            "Pa": "Pi / Pb",
            "Pb": "Pi / Pa"
        },
        variables: {
            "Pi": { name: "P(A ∩ B)", si_unit: "" },
            "Pa": { name: "P(A)", si_unit: "" },
            "Pb": { name: "P(B)", si_unit: "" }
        },
        description: "Probabilidade da interseção de eventos independentes."
    },
    // ============================================================
    // GEOMETRIA ESPACIAL (ÁREAS FALTANTES)
    // ============================================================
    {
        id: "cylinder_area_lateral",
        name: "Área Lateral do Cilindro",
        category: "Matemática: Geometria Espacial",
        latex: "A_L = 2\\pi R h",
        computable: {
            "AL": "2 * pi * R * h",
            "R": "AL / (2 * pi * h)",
            "h": "AL / (2 * pi * R)"
        },
        variables: {
            "AL": { name: "Área Lateral", si_unit: "m^2" },
            "R": { name: "Raio", si_unit: "m" },
            "h": { name: "Altura", si_unit: "m" }
        },
        description: "Área lateral de cilindro circular reto."
    },
    {
        id: "cylinder_area_base",
        name: "Área da Base do Cilindro / Cone",
        category: "Matemática: Geometria Espacial",
        latex: "A_B = \\pi R^2",
        computable: {
            "AB": "pi * R^2",
            "R": "sqrt(AB / pi)"
        },
        variables: {
            "AB": { name: "Área da Base", si_unit: "m^2" },
            "R": { name: "Raio", si_unit: "m" }
        },
        description: "Área da base circular."
    },
    {
        id: "cylinder_area_total",
        name: "Área Total do Cilindro",
        category: "Matemática: Geometria Espacial",
        latex: "A_T = 2\\pi R (h + R)",
        computable: {
            "AT": "2 * pi * R * (h + R)"
        },
        variables: {
            "AT": { name: "Área Total", si_unit: "m^2" },
            "R": { name: "Raio", si_unit: "m" },
            "h": { name: "Altura", si_unit: "m" }
        },
        description: "Área total do cilindro."
    },
    {
        id: "cone_area_lateral",
        name: "Área Lateral do Cone",
        category: "Matemática: Geometria Espacial",
        latex: "A_L = \\pi R g",
        computable: {
            "AL": "pi * R * g",
            "R": "AL / (pi * g)",
            "g": "AL / (pi * R)"
        },
        variables: {
            "AL": { name: "Área Lateral", si_unit: "m^2" },
            "R": { name: "Raio", si_unit: "m" },
            "g": { name: "Geratriz", si_unit: "m" }
        },
        description: "Área lateral do cone."
    },
    {
        id: "cone_area_total",
        name: "Área Total do Cone",
        category: "Matemática: Geometria Espacial",
        latex: "A_T = \\pi R (g + R)",
        computable: {
            "AT": "pi * R * (g + R)"
        },
        variables: {
            "AT": { name: "Área Total", si_unit: "m^2" },
            "R": { name: "Raio", si_unit: "m" },
            "g": { name: "Geratriz", si_unit: "m" }
        },
        description: "Área total do cone."
    },
    {
        id: "cone_frustum_area_lateral",
        name: "Área Lateral do Tronco de Cone",
        category: "Matemática: Geometria Espacial",
        latex: "A_L = \\pi g (R + r)",
        computable: {
            "AL": "pi * g * (R + r)",
            "g": "AL / (pi * (R + r))"
        },
        variables: {
            "AL": { name: "Área Lateral", si_unit: "m^2" },
            "g": { name: "Geratriz", si_unit: "m" },
            "R": { name: "Raio Maior", si_unit: "m" },
            "r": { name: "Raio Menor", si_unit: "m" }
        },
        description: "Área lateral do tronco de cone."
    },
    // ============================================================
    // GEOMETRIA ANALÍTICA
    // ============================================================
    {
        id: "line_eq_general",
        name: "Reta Geral",
        category: "Matemática: Geometria Analítica",
        latex: "ax + by + c = 0",
        computable: {
            "c": "-(a * x + b * y)",
            "y": "-(a * x + c) / b",
            "x": "-(b * y + c) / a"
        },
        variables: {
            "x": { name: "x", si_unit: "" },
            "y": { name: "y", si_unit: "" },
            "a": { name: "a", si_unit: "" },
            "b": { name: "b", si_unit: "" },
            "c": { name: "c", si_unit: "" }
        },
        description: "Equação geral da reta."
    },
    {
        id: "line_eq_reduced",
        name: "Reta Reduzida",
        category: "Matemática: Geometria Analítica",
        latex: "y = mx + b",
        computable: {
            "y": "m * x + b",
            "x": "(y - b) / m",
            "m": "(y - b) / x",
            "b": "y - m * x"
        },
        variables: {
            "y": { name: "y", si_unit: "" },
            "x": { name: "x", si_unit: "" },
            "m": { name: "Coef. Angular (m)", si_unit: "" },
            "b": { name: "Coef. Linear (b)", si_unit: "" }
        },
        description: "Equação reduzida da reta."
    },
    {
        id: "line_eq_segmentary",
        name: "Reta Segmentária",
        category: "Matemática: Geometria Analítica",
        latex: "\\frac{x}{a} + \\frac{y}{b} = 1",
        computable: {
            "y": "b * (1 - (x / a))",
            "x": "a * (1 - (y / b))"
        },
        variables: {
            "x": { name: "x", si_unit: "" },
            "y": { name: "y", si_unit: "" },
            "a": { name: "Intercepto a (x)", si_unit: "" },
            "b": { name: "Intercepto b (y)", si_unit: "" }
        },
        description: "Equação segmentária da reta."
    },
    {
        id: "line_angle",
        name: "Ângulo Entre Retas",
        category: "Matemática: Geometria Analítica",
        latex: "\\tan \\theta = \\left| \\frac{m_2 - m_1}{1 + m_1 m_2} \\right|",
        computable: {
            "tan_theta": "abs((m2 - m1) / (1 + m1 * m2))",
            "theta": "atan(abs((m2 - m1) / (1 + m1 * m2)))"
        },
        variables: {
            "tan_theta": { name: "Tangente Ângulo", si_unit: "" },
            "theta": { name: "Ângulo (rad)", si_unit: "rad" },
            "m1": { name: "Coef. Reta 1", si_unit: "" },
            "m2": { name: "Coef. Reta 2", si_unit: "" }
        },
        description: "Tangente do ângulo agudo entre duas retas."
    },
    {
        id: "circle_normal_form",
        name: "Forma Normal da Circunferência",
        category: "Matemática: Geometria Analítica",
        latex: "x^2 + y^2 - 2x_c x - 2y_c y + c = 0",
        computable: {
            "c": "-(x^2 + y^2 - 2 * xc * x - 2 * yc * y)"
        },
        variables: {
            "x": { name: "x", si_unit: "" },
            "y": { name: "y", si_unit: "" },
            "xc": { name: "x do centro", si_unit: "" },
            "yc": { name: "y do centro", si_unit: "" },
            "c": { name: "c (xc^2+yc^2-R^2)", si_unit: "" }
        },
        description: "Forma normal (geral) da circunferência."
    }

];

if (typeof engine !== 'undefined') {
    engine.registerCatalog(mathCatalog);
}
