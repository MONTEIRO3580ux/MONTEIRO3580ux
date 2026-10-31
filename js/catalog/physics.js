// physics.js — Catálogo Completo e Rigoroso de Física (195 Fórmulas com Rearranjos em LaTeX)
// Gerado para o Conversor Universal

const physicsConstants = {
    g: { value: 9.8, value_alt: 10, unit: "m/s^2", name: "Aceleração da gravidade" },
    G: { value: 6.674e-11, unit: "N·m^2/kg^2", name: "Constante gravitacional universal" },
    c: { value: 3.00e8, unit: "m/s", name: "Velocidade da luz no vácuo" },
    e: { value: 1.602e-19, unit: "C", name: "Carga elementar" },
    ke: { value: 8.99e9, unit: "N·m^2/C^2", name: "Constante de Coulomb" },
    Rg: { value: 8.314, unit: "J/(mol·K)", name: "Constante dos gases ideais" },
    kB: { value: 1.381e-23, unit: "J/K", name: "Constante de Boltzmann" },
    h: { value: 6.626e-34, unit: "J·s", name: "Constante de Planck" },
    eps0: { value: 8.854e-12, unit: "F/m", name: "Permissividade do vácuo" },
    mu0: { value: 1.257e-6, unit: "H/m", name: "Permeabilidade do vácuo" },
    sigma: { value: 5.670e-8, unit: "W/(m^2·K^4)", name: "Constante de Stefan-Boltzmann" }
};

const physicsCatalog = [
    {
        "id": "displacement",
        "name": "Deslocamento",
        "category": "Física: Cinemática",
        "latex": "\\Delta x = x_f - x_i",
        "latex_rearranged": {
            "dx": "\\Delta x = x_f - x_i",
            "xf": "x_f = x_i + \\Delta x",
            "xi": "x_i = x_f - \\Delta x"
        },
        "computable": {
            "dx": "xf - xi",
            "xf": "xi + dx",
            "xi": "xf - dx"
        },
        "variables": {
            "dx": {
                "name": "Deslocamento (Δx)",
                "si_unit": "m"
            },
            "xf": {
                "name": "Posição final (x_f)",
                "si_unit": "m"
            },
            "xi": {
                "name": "Posição inicial (x_i)",
                "si_unit": "m"
            }
        },
        "description": "Diferença entre a posição final e a inicial de uma partícula."
    },
    {
        "id": "velocity_average",
        "name": "Velocidade Média",
        "category": "Física: Cinemática",
        "latex": "v_m = \\frac{\\Delta x}{\\Delta t}",
        "latex_rearranged": {
            "vm": "v_m = \\frac{\\Delta x}{\\Delta t}",
            "dx": "\\Delta x = v_m \\cdot \\Delta t",
            "dt": "\\Delta t = \\frac{\\Delta x}{v_m}"
        },
        "computable": {
            "vm": "dx / dt",
            "dx": "vm * dt",
            "dt": "dx / vm"
        },
        "variables": {
            "vm": {
                "name": "Velocidade média (v_m)",
                "si_unit": "m/s"
            },
            "dx": {
                "name": "Deslocamento (Δx)",
                "si_unit": "m"
            },
            "dt": {
                "name": "Intervalo de tempo (Δt)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "dt > 0"
        ],
        "description": "Razão entre o deslocamento realizado e o intervalo de tempo decorrido."
    },
    {
        "id": "scalar_speed_average",
        "name": "Velocidade Escalar Média",
        "category": "Física: Cinemática",
        "latex": "u_m = \\frac{d_{\\text{total}}}{\\Delta t}",
        "latex_rearranged": {
            "um": "u_m = \\frac{d_{\\text{total}}}{\\Delta t}",
            "d_total": "d_{\\text{total}} = u_m \\cdot \\Delta t",
            "dt": "\\Delta t = \\frac{d_{\\text{total}}}{u_m}"
        },
        "computable": {
            "um": "d_total / dt",
            "d_total": "um * dt",
            "dt": "d_total / um"
        },
        "variables": {
            "um": {
                "name": "Velocidade escalar média (u_m)",
                "si_unit": "m/s"
            },
            "d_total": {
                "name": "Distância total (d_total)",
                "si_unit": "m"
            },
            "dt": {
                "name": "Intervalo de tempo (Δt)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "dt > 0",
            "d_total >= 0"
        ],
        "description": "Razão entre a distância total percorrida na trajetória e o tempo."
    },
    {
        "id": "acceleration_average",
        "name": "Aceleração Média",
        "category": "Física: Cinemática",
        "latex": "a_m = \\frac{v_f - v_i}{\\Delta t}",
        "latex_rearranged": {
            "am": "a_m = \\frac{v_f - v_i}{\\Delta t}",
            "vf": "v_f = v_i + a_m \\cdot \\Delta t",
            "vi": "v_i = v_f - a_m \\cdot \\Delta t",
            "dt": "\\Delta t = \\frac{v_f - v_i}{a_m}"
        },
        "computable": {
            "am": "(vf - vi) / dt",
            "vf": "vi + am * dt",
            "vi": "vf - am * dt",
            "dt": "(vf - vi) / am"
        },
        "variables": {
            "am": {
                "name": "Aceleração média (a_m)",
                "si_unit": "m/s^2"
            },
            "vf": {
                "name": "Velocidade final (v_f)",
                "si_unit": "m/s"
            },
            "vi": {
                "name": "Velocidade inicial (v_i)",
                "si_unit": "m/s"
            },
            "dt": {
                "name": "Intervalo de tempo (Δt)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "dt > 0"
        ],
        "description": "Taxa de variação da velocidade em relação ao tempo."
    },
    {
        "id": "mru_position",
        "name": "MRU — Equação Horária da Posição",
        "category": "Física: Cinemática",
        "latex": "x = x_0 + v \\cdot t",
        "latex_rearranged": {
            "x": "x = x_0 + v \\cdot t",
            "x0": "x_0 = x - v \\cdot t",
            "v": "v = \\frac{x - x_0}{t}",
            "t": "t = \\frac{x - x_0}{v}"
        },
        "computable": {
            "x": "x0 + v * t",
            "x0": "x - v * t",
            "v": "(x - x0) / t",
            "t": "(x - x0) / v"
        },
        "variables": {
            "x": {
                "name": "Posição final (x)",
                "si_unit": "m"
            },
            "x0": {
                "name": "Posição inicial (x_0)",
                "si_unit": "m"
            },
            "v": {
                "name": "Velocidade (v)",
                "si_unit": "m/s"
            },
            "t": {
                "name": "Tempo (t)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "t >= 0"
        ],
        "description": "Posição em função do tempo no Movimento Retilíneo Uniforme."
    },
    {
        "id": "mru_displacement",
        "name": "MRU — Deslocamento",
        "category": "Física: Cinemática",
        "latex": "\\Delta x = v \\cdot t",
        "latex_rearranged": {
            "dx": "\\Delta x = v \\cdot t",
            "v": "v = \\frac{\\Delta x}{t}",
            "t": "t = \\frac{\\Delta x}{v}"
        },
        "computable": {
            "dx": "v * t",
            "v": "dx / t",
            "t": "dx / v"
        },
        "variables": {
            "dx": {
                "name": "Deslocamento (Δx)",
                "si_unit": "m"
            },
            "v": {
                "name": "Velocidade constante (v)",
                "si_unit": "m/s"
            },
            "t": {
                "name": "Tempo (t)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "t >= 0"
        ],
        "description": "Deslocamento retilíneo sob velocidade constante."
    },
    {
        "id": "mru_meeting_time",
        "name": "MRU — Tempo de Encontro entre Dois Móveis",
        "category": "Física: Cinemática",
        "latex": "t_{\\text{enc}} = \\frac{x_{B0} - x_{A0}}{v_A - v_B}",
        "latex_rearranged": {
            "t_enc": "t_{\\text{enc}} = \\frac{x_{B0} - x_{A0}}{v_A - v_B}",
            "xB0": "x_{B0} = x_{A0} + t_{\\text{enc}}(v_A - v_B)",
            "xA0": "x_{A0} = x_{B0} - t_{\\text{enc}}(v_A - v_B)"
        },
        "computable": {
            "t_enc": "(xB0 - xA0) / (vA - vB)",
            "xB0": "xA0 + t_enc * (vA - vB)",
            "xA0": "xB0 - t_enc * (vA - vB)"
        },
        "variables": {
            "t_enc": {
                "name": "Tempo de encontro (t_enc)",
                "si_unit": "s"
            },
            "xB0": {
                "name": "Posição inicial de B (x_B0)",
                "si_unit": "m"
            },
            "xA0": {
                "name": "Posição inicial de A (x_A0)",
                "si_unit": "m"
            },
            "vA": {
                "name": "Velocidade de A (v_A)",
                "si_unit": "m/s"
            },
            "vB": {
                "name": "Velocidade de B (v_B)",
                "si_unit": "m/s"
            }
        },
        "constraints": [
            "vA != vB"
        ],
        "description": "Instante em que dois corpos em MRU ocupam a mesma posição."
    },
    {
        "id": "relative_velocity",
        "name": "Velocidade Relativa (1D)",
        "category": "Física: Cinemática",
        "latex": "v_{A/B} = v_A - v_B",
        "latex_rearranged": {
            "v_rel": "v_{A/B} = v_A - v_B",
            "vA": "v_A = v_B + v_{A/B}",
            "vB": "v_B = v_A - v_{A/B}"
        },
        "computable": {
            "v_rel": "vA - vB",
            "vA": "vB + v_rel",
            "vB": "vA - v_rel"
        },
        "variables": {
            "v_rel": {
                "name": "Velocidade relativa (v_A/B)",
                "si_unit": "m/s"
            },
            "vA": {
                "name": "Velocidade de A (v_A)",
                "si_unit": "m/s"
            },
            "vB": {
                "name": "Velocidade de B (v_B)",
                "si_unit": "m/s"
            }
        },
        "description": "Velocidade de um móvel A em relação ao referencial de um móvel B."
    },
    {
        "id": "mruv_velocity",
        "name": "MRUV — Equação da Velocidade",
        "category": "Física: Cinemática",
        "latex": "v = v_0 + a \\cdot t",
        "latex_rearranged": {
            "v": "v = v_0 + a \\cdot t",
            "v0": "v_0 = v - a \\cdot t",
            "a": "a = \\frac{v - v_0}{t}",
            "t": "t = \\frac{v - v_0}{a}"
        },
        "computable": {
            "v": "v0 + a * t",
            "v0": "v - a * t",
            "a": "(v - v0) / t",
            "t": "(v - v0) / a"
        },
        "variables": {
            "v": {
                "name": "Velocidade final (v)",
                "si_unit": "m/s"
            },
            "v0": {
                "name": "Velocidade inicial (v_0)",
                "si_unit": "m/s"
            },
            "a": {
                "name": "Aceleração constante (a)",
                "si_unit": "m/s^2"
            },
            "t": {
                "name": "Tempo decorrido (t)",
                "si_unit": "s"
            }
        },
        "description": "Velocidade de uma partícula sob aceleração constante em função do tempo."
    },
    {
        "id": "mruv_position",
        "name": "MRUV — Equação Horária da Posição",
        "category": "Física: Cinemática",
        "latex": "x = x_0 + v_0 \\cdot t + \\frac{1}{2} a \\cdot t^2",
        "latex_rearranged": {
            "x": "x = x_0 + v_0 \\cdot t + \\frac{1}{2} a \\cdot t^2",
            "x0": "x_0 = x - v_0 \\cdot t - \\frac{1}{2} a \\cdot t^2",
            "v0": "v_0 = \\frac{x - x_0 - \\frac{1}{2} a \\cdot t^2}{t}",
            "a": "a = \\frac{2(x - x_0 - v_0 \\cdot t)}{t^2}"
        },
        "computable": {
            "x": "x0 + v0 * t + 0.5 * a * t^2",
            "x0": "x - v0 * t - 0.5 * a * t^2",
            "v0": "(x - x0 - 0.5 * a * t^2) / t",
            "a": "2 * (x - x0 - v0 * t) / (t^2)"
        },
        "variables": {
            "x": {
                "name": "Posição final (x)",
                "si_unit": "m"
            },
            "x0": {
                "name": "Posição inicial (x_0)",
                "si_unit": "m"
            },
            "v0": {
                "name": "Velocidade inicial (v_0)",
                "si_unit": "m/s"
            },
            "a": {
                "name": "Aceleração constante (a)",
                "si_unit": "m/s^2"
            },
            "t": {
                "name": "Tempo (t)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "t > 0"
        ],
        "description": "Posição de uma partícula em aceleração constante em função do tempo."
    },
    {
        "id": "mruv_torricelli",
        "name": "MRUV — Equação de Torricelli",
        "category": "Física: Cinemática",
        "latex": "v^2 = v_0^2 + 2 \\cdot a \\cdot \\Delta x",
        "latex_rearranged": {
            "v": "v = \\sqrt{v_0^2 + 2 \\cdot a \\cdot \\Delta x}",
            "v0": "v_0 = \\sqrt{v^2 - 2 \\cdot a \\cdot \\Delta x}",
            "a": "a = \\frac{v^2 - v_0^2}{2 \\cdot \\Delta x}",
            "dx": "\\Delta x = \\frac{v^2 - v_0^2}{2 \\cdot a}"
        },
        "computable": {
            "v": "sqrt(v0^2 + 2 * a * dx)",
            "v0": "sqrt(v^2 - 2 * a * dx)",
            "a": "(v^2 - v0^2) / (2 * dx)",
            "dx": "(v^2 - v0^2) / (2 * a)"
        },
        "variables": {
            "v": {
                "name": "Velocidade final (v)",
                "si_unit": "m/s"
            },
            "v0": {
                "name": "Velocidade inicial (v_0)",
                "si_unit": "m/s"
            },
            "a": {
                "name": "Aceleração (a)",
                "si_unit": "m/s^2"
            },
            "dx": {
                "name": "Deslocamento (Δx)",
                "si_unit": "m"
            }
        },
        "description": "Relação entre velocidade e deslocamento no MRUV sem depender do tempo."
    },
    {
        "id": "mruv_average_velocity",
        "name": "MRUV — Velocidade Média no Intervalo",
        "category": "Física: Cinemática",
        "latex": "v_m = \\frac{v_0 + v}{2}",
        "latex_rearranged": {
            "vm": "v_m = \\frac{v_0 + v}{2}",
            "v0": "v_0 = 2 \\cdot v_m - v",
            "v": "v = 2 \\cdot v_m - v_0"
        },
        "computable": {
            "vm": "(v0 + v) / 2",
            "v0": "2 * vm - v",
            "v": "2 * vm - v0"
        },
        "variables": {
            "vm": {
                "name": "Velocidade média (v_m)",
                "si_unit": "m/s"
            },
            "v0": {
                "name": "Velocidade inicial (v_0)",
                "si_unit": "m/s"
            },
            "v": {
                "name": "Velocidade final (v)",
                "si_unit": "m/s"
            }
        },
        "description": "Média aritmética das velocidades inicial e final em um MRUV."
    },
    {
        "id": "mruv_displacement_avg",
        "name": "MRUV — Deslocamento pela Velocidade Média",
        "category": "Física: Cinemática",
        "latex": "\\Delta x = \\left(\\frac{v_0 + v}{2}\\right) \\cdot t",
        "latex_rearranged": {
            "dx": "\\Delta x = \\left(\\frac{v_0 + v}{2}\\right) \\cdot t",
            "t": "t = \\frac{2 \\cdot \\Delta x}{v_0 + v}",
            "v0": "v_0 = \\frac{2 \\cdot \\Delta x}{t} - v",
            "v": "v = \\frac{2 \\cdot \\Delta x}{t} - v_0"
        },
        "computable": {
            "dx": "((v0 + v) / 2) * t",
            "t": "(2 * dx) / (v0 + v)",
            "v0": "(2 * dx / t) - v",
            "v": "(2 * dx / t) - v0"
        },
        "variables": {
            "dx": {
                "name": "Deslocamento (Δx)",
                "si_unit": "m"
            },
            "v0": {
                "name": "Velocidade inicial (v_0)",
                "si_unit": "m/s"
            },
            "v": {
                "name": "Velocidade final (v)",
                "si_unit": "m/s"
            },
            "t": {
                "name": "Tempo decorrido (t)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "t > 0"
        ],
        "description": "Cálculo do deslocamento a partir da média aritmética das velocidades."
    },
    {
        "id": "vertical_launch_velocity",
        "name": "Lançamento Vertical — Velocidade",
        "category": "Física: Cinemática",
        "latex": "v = v_0 - g \\cdot t",
        "latex_rearranged": {
            "v": "v = v_0 - g \\cdot t",
            "v0": "v_0 = v + g \\cdot t",
            "g": "g = \\frac{v_0 - v}{t}",
            "t": "t = \\frac{v_0 - v}{g}"
        },
        "computable": {
            "v": "v0 - g * t",
            "v0": "v + g * t",
            "g": "(v0 - v) / t",
            "t": "(v0 - v) / g"
        },
        "variables": {
            "v": {
                "name": "Velocidade instantânea (v)",
                "si_unit": "m/s"
            },
            "v0": {
                "name": "Velocidade inicial (v_0)",
                "si_unit": "m/s"
            },
            "g": {
                "name": "Aceleração da gravidade (g)",
                "si_unit": "m/s^2"
            },
            "t": {
                "name": "Tempo (t)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "g > 0"
        ],
        "description": "Velocidade no movimento vertical sob gravidade com eixo orientado para cima."
    },
    {
        "id": "vertical_launch_position",
        "name": "Lançamento Vertical — Posição",
        "category": "Física: Cinemática",
        "latex": "y = y_0 + v_0 \\cdot t - \\frac{1}{2} g \\cdot t^2",
        "latex_rearranged": {
            "y": "y = y_0 + v_0 \\cdot t - \\frac{1}{2} g \\cdot t^2",
            "y0": "y_0 = y - v_0 \\cdot t + \\frac{1}{2} g \\cdot t^2",
            "v0": "v_0 = \\frac{y - y_0 + \\frac{1}{2} g \\cdot t^2}{t}",
            "g": "g = \\frac{2(y_0 + v_0 \\cdot t - y)}{t^2}"
        },
        "computable": {
            "y": "y0 + v0 * t - 0.5 * g * t^2",
            "y0": "y - v0 * t + 0.5 * g * t^2",
            "v0": "(y - y0 + 0.5 * g * t^2) / t",
            "g": "2 * (y0 + v0 * t - y) / (t^2)"
        },
        "variables": {
            "y": {
                "name": "Altura final (y)",
                "si_unit": "m"
            },
            "y0": {
                "name": "Altura inicial (y_0)",
                "si_unit": "m"
            },
            "v0": {
                "name": "Velocidade inicial (v_0)",
                "si_unit": "m/s"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            },
            "t": {
                "name": "Tempo (t)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "t > 0",
            "g > 0"
        ],
        "description": "Equação horária do espaço vertical no lançamento sob gravidade."
    },
    {
        "id": "vertical_launch_torricelli",
        "name": "Lançamento Vertical — Equação de Torricelli",
        "category": "Física: Cinemática",
        "latex": "v^2 = v_0^2 - 2 \\cdot g \\cdot (y - y_0)",
        "latex_rearranged": {
            "v": "v = \\sqrt{v_0^2 - 2 \\cdot g \\cdot \\Delta y}",
            "v0": "v_0 = \\sqrt{v^2 + 2 \\cdot g \\cdot \\Delta y}",
            "dy": "\\Delta y = \\frac{v_0^2 - v^2}{2 \\cdot g}",
            "g": "g = \\frac{v_0^2 - v^2}{2 \\cdot \\Delta y}"
        },
        "computable": {
            "v": "sqrt(v0^2 - 2 * g * dy)",
            "v0": "sqrt(v^2 + 2 * g * dy)",
            "dy": "(v0^2 - v^2) / (2 * g)",
            "g": "(v0^2 - v^2) / (2 * dy)"
        },
        "variables": {
            "v": {
                "name": "Velocidade final (v)",
                "si_unit": "m/s"
            },
            "v0": {
                "name": "Velocidade inicial (v_0)",
                "si_unit": "m/s"
            },
            "dy": {
                "name": "Deslocamento vertical (Δy = y - y_0)",
                "si_unit": "m"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            }
        },
        "constraints": [
            "g > 0"
        ],
        "description": "Relação entre velocidade e altura no movimento vertical sem depender do tempo."
    },
    {
        "id": "vertical_launch_time_up",
        "name": "Lançamento Vertical — Tempo de Subida",
        "category": "Física: Cinemática",
        "latex": "t_{\\text{sub}} = \\frac{v_0}{g}",
        "latex_rearranged": {
            "tsub": "t_{\\text{sub}} = \\frac{v_0}{g}",
            "v0": "v_0 = g \\cdot t_{\\text{sub}}",
            "g": "g = \\frac{v_0}{t_{\\text{sub}}}"
        },
        "computable": {
            "tsub": "v0 / g",
            "v0": "g * tsub",
            "g": "v0 / tsub"
        },
        "variables": {
            "tsub": {
                "name": "Tempo de subida (t_sub)",
                "si_unit": "s"
            },
            "v0": {
                "name": "Velocidade inicial (v_0)",
                "si_unit": "m/s"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            }
        },
        "constraints": [
            "v0 >= 0",
            "g > 0"
        ],
        "description": "Tempo necessário até que a velocidade vertical anule no topo da trajetória."
    },
    {
        "id": "vertical_launch_max_height",
        "name": "Lançamento Vertical — Altura Máxima",
        "category": "Física: Cinemática",
        "latex": "H_{\\max} = \\frac{v_0^2}{2 \\cdot g}",
        "latex_rearranged": {
            "Hmax": "H_{\\max} = \\frac{v_0^2}{2 \\cdot g}",
            "v0": "v_0 = \\sqrt{2 \\cdot g \\cdot H_{\\max}}",
            "g": "g = \\frac{v_0^2}{2 \\cdot H_{\\max}}"
        },
        "computable": {
            "Hmax": "(v0^2) / (2 * g)",
            "v0": "sqrt(2 * g * Hmax)",
            "g": "(v0^2) / (2 * Hmax)"
        },
        "variables": {
            "Hmax": {
                "name": "Altura máxima (H_max)",
                "si_unit": "m"
            },
            "v0": {
                "name": "Velocidade inicial (v_0)",
                "si_unit": "m/s"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            }
        },
        "constraints": [
            "Hmax >= 0",
            "g > 0"
        ],
        "description": "Altura máxima atingida por um corpo lançado verticalmente para cima."
    },
    {
        "id": "free_fall_height",
        "name": "Queda Livre — Altura em Função do Tempo",
        "category": "Física: Cinemática",
        "latex": "h = \\frac{1}{2} g \\cdot t^2",
        "latex_rearranged": {
            "h": "h = \\frac{1}{2} g \\cdot t^2",
            "t": "t = \\sqrt{\\frac{2 \\cdot h}{g}}",
            "g": "g = \\frac{2 \\cdot h}{t^2}"
        },
        "computable": {
            "h": "0.5 * g * t^2",
            "t": "sqrt((2 * h) / g)",
            "g": "(2 * h) / (t^2)"
        },
        "variables": {
            "h": {
                "name": "Altura de queda (h)",
                "si_unit": "m"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            },
            "t": {
                "name": "Tempo de queda (t)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "h >= 0",
            "g > 0",
            "t >= 0"
        ],
        "description": "Distância percorrida em queda livre a partir do repouso."
    },
    {
        "id": "free_fall_velocity",
        "name": "Queda Livre — Velocidade de Impacto",
        "category": "Física: Cinemática",
        "latex": "v = \\sqrt{2 \\cdot g \\cdot h}",
        "latex_rearranged": {
            "v": "v = \\sqrt{2 \\cdot g \\cdot h}",
            "h": "h = \\frac{v^2}{2 \\cdot g}",
            "g": "g = \\frac{v^2}{2 \\cdot h}"
        },
        "computable": {
            "v": "sqrt(2 * g * h)",
            "h": "(v^2) / (2 * g)",
            "g": "(v^2) / (2 * h)"
        },
        "variables": {
            "v": {
                "name": "Velocidade ao atingir o solo (v)",
                "si_unit": "m/s"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            },
            "h": {
                "name": "Altura de queda (h)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "h >= 0",
            "g > 0"
        ],
        "description": "Velocidade de um corpo em queda livre a partir do repouso após descer a altura h."
    },
    {
        "id": "mcu_arc_length",
        "name": "MCU — Comprimento do Arco",
        "category": "Física: Cinemática",
        "latex": "s = r \\cdot \\theta",
        "latex_rearranged": {
            "s": "s = r \\cdot \\theta",
            "r": "r = \\frac{s}{\\theta}",
            "theta": "\\theta = \\frac{s}{r}"
        },
        "computable": {
            "s": "r * theta",
            "r": "s / theta",
            "theta": "s / r"
        },
        "variables": {
            "s": {
                "name": "Comprimento do arco (s)",
                "si_unit": "m"
            },
            "r": {
                "name": "Raio da trajetória (r)",
                "si_unit": "m"
            },
            "theta": {
                "name": "Ângulo central (θ)",
                "si_unit": "rad"
            }
        },
        "constraints": [
            "r > 0"
        ],
        "description": "Relação entre o arco percorrido, o raio da circunferência e o ângulo em radianos."
    },
    {
        "id": "mcu_angular_velocity",
        "name": "MCU — Velocidade Angular Média",
        "category": "Física: Cinemática",
        "latex": "\\omega = \\frac{\\Delta \\theta}{\\Delta t}",
        "latex_rearranged": {
            "omega": "\\omega = \\frac{\\Delta \\theta}{\\Delta t}",
            "dtheta": "\\Delta \\theta = \\omega \\cdot \\Delta t",
            "dt": "\\Delta t = \\frac{\\Delta \\theta}{\\omega}"
        },
        "computable": {
            "omega": "dtheta / dt",
            "dtheta": "omega * dt",
            "dt": "dtheta / omega"
        },
        "variables": {
            "omega": {
                "name": "Velocidade angular (ω)",
                "si_unit": "rad/s"
            },
            "dtheta": {
                "name": "Deslocamento angular (Δθ)",
                "si_unit": "rad"
            },
            "dt": {
                "name": "Tempo decorrido (Δt)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "dt > 0"
        ],
        "description": "Taxa de rotação angular por unidade de tempo."
    },
    {
        "id": "mcu_linear_velocity",
        "name": "MCU — Relação entre Velocidade Linear e Angular",
        "category": "Física: Cinemática",
        "latex": "v = \\omega \\cdot r",
        "latex_rearranged": {
            "v": "v = \\omega \\cdot r",
            "omega": "\\omega = \\frac{v}{r}",
            "r": "r = \\frac{v}{\\omega}"
        },
        "computable": {
            "v": "omega * r",
            "omega": "v / r",
            "r": "v / omega"
        },
        "variables": {
            "v": {
                "name": "Velocidade linear (v)",
                "si_unit": "m/s"
            },
            "omega": {
                "name": "Velocidade angular (ω)",
                "si_unit": "rad/s"
            },
            "r": {
                "name": "Raio (r)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "r > 0"
        ],
        "description": "Conexão entre a velocidade escalar tangencial e a velocidade angular."
    },
    {
        "id": "mcu_period_frequency",
        "name": "MCU — Período e Frequência",
        "category": "Física: Cinemática",
        "latex": "f = \\frac{1}{T}",
        "latex_rearranged": {
            "f": "f = \\frac{1}{T}",
            "T": "T = \\frac{1}{f}"
        },
        "computable": {
            "f": "1 / T",
            "T": "1 / f"
        },
        "variables": {
            "f": {
                "name": "Frequência (f)",
                "si_unit": "Hz"
            },
            "T": {
                "name": "Período (T)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "T > 0",
            "f > 0"
        ],
        "description": "Relação inversa entre período e frequência no movimento periódico."
    },
    {
        "id": "mcu_omega_freq",
        "name": "MCU — Velocidade Angular por Frequência",
        "category": "Física: Cinemática",
        "latex": "\\omega = 2 \\pi f",
        "latex_rearranged": {
            "omega": "\\omega = 2 \\pi f",
            "f": "f = \\frac{\\omega}{2 \\pi}"
        },
        "computable": {
            "omega": "2 * pi * f",
            "f": "omega / (2 * pi)"
        },
        "variables": {
            "omega": {
                "name": "Velocidade angular (ω)",
                "si_unit": "rad/s"
            },
            "f": {
                "name": "Frequência (f)",
                "si_unit": "Hz"
            }
        },
        "constraints": [
            "f >= 0"
        ],
        "description": "Frequência angular expressa em termos do número de ciclos por segundo."
    },
    {
        "id": "mcu_omega_period",
        "name": "MCU — Velocidade Angular por Período",
        "category": "Física: Cinemática",
        "latex": "\\omega = \\frac{2 \\pi}{T}",
        "latex_rearranged": {
            "omega": "\\omega = \\frac{2 \\pi}{T}",
            "T": "T = \\frac{2 \\pi}{\\omega}"
        },
        "computable": {
            "omega": "(2 * pi) / T",
            "T": "(2 * pi) / omega"
        },
        "variables": {
            "omega": {
                "name": "Velocidade angular (ω)",
                "si_unit": "rad/s"
            },
            "T": {
                "name": "Período (T)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "T > 0"
        ],
        "description": "Velocidade angular expressa em termos do tempo para completar uma volta."
    },
    {
        "id": "mcu_velocity_period",
        "name": "MCU — Velocidade Linear por Período",
        "category": "Física: Cinemática",
        "latex": "v = \\frac{2 \\pi r}{T}",
        "latex_rearranged": {
            "v": "v = \\frac{2 \\pi r}{T}",
            "r": "r = \\frac{v \\cdot T}{2 \\pi}",
            "T": "T = \\frac{2 \\pi r}{v}"
        },
        "computable": {
            "v": "(2 * pi * r) / T",
            "r": "(v * T) / (2 * pi)",
            "T": "(2 * pi * r) / v"
        },
        "variables": {
            "v": {
                "name": "Velocidade tangencial (v)",
                "si_unit": "m/s"
            },
            "r": {
                "name": "Raio (r)",
                "si_unit": "m"
            },
            "T": {
                "name": "Período (T)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "r > 0",
            "T > 0"
        ],
        "description": "Velocidade escalar de um ponto no perímetro em função do período."
    },
    {
        "id": "mcu_velocity_freq",
        "name": "MCU — Velocidade Linear por Frequência",
        "category": "Física: Cinemática",
        "latex": "v = 2 \\pi r f",
        "latex_rearranged": {
            "v": "v = 2 \\pi r f",
            "r": "r = \\frac{v}{2 \\pi f}",
            "f": "f = \\frac{v}{2 \\pi r}"
        },
        "computable": {
            "v": "2 * pi * r * f",
            "r": "v / (2 * pi * f)",
            "f": "v / (2 * pi * r)"
        },
        "variables": {
            "v": {
                "name": "Velocidade linear (v)",
                "si_unit": "m/s"
            },
            "r": {
                "name": "Raio (r)",
                "si_unit": "m"
            },
            "f": {
                "name": "Frequência (f)",
                "si_unit": "Hz"
            }
        },
        "constraints": [
            "r > 0",
            "f >= 0"
        ],
        "description": "Velocidade linear expressa diretamente pela frequência de rotação."
    },
    {
        "id": "mcu_centripetal_acc",
        "name": "MCU — Aceleração Centrípeta (Linear)",
        "category": "Física: Cinemática",
        "latex": "a_c = \\frac{v^2}{r}",
        "latex_rearranged": {
            "ac": "a_c = \\frac{v^2}{r}",
            "v": "v = \\sqrt{a_c \\cdot r}",
            "r": "r = \\frac{v^2}{a_c}"
        },
        "computable": {
            "ac": "(v^2) / r",
            "v": "sqrt(ac * r)",
            "r": "(v^2) / ac"
        },
        "variables": {
            "ac": {
                "name": "Aceleração centrípeta (a_c)",
                "si_unit": "m/s^2"
            },
            "v": {
                "name": "Velocidade linear (v)",
                "si_unit": "m/s"
            },
            "r": {
                "name": "Raio da trajetória (r)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "r > 0",
            "ac >= 0"
        ],
        "description": "Aceleração perpendicular à trajetória que altera a direção da velocidade."
    },
    {
        "id": "mcu_centripetal_omega",
        "name": "MCU — Aceleração Centrípeta (Angular)",
        "category": "Física: Cinemática",
        "latex": "a_c = \\omega^2 \\cdot r",
        "latex_rearranged": {
            "ac": "a_c = \\omega^2 \\cdot r",
            "omega": "\\omega = \\sqrt{\\frac{a_c}{r}}",
            "r": "r = \\frac{a_c}{\\omega^2}"
        },
        "computable": {
            "ac": "(omega^2) * r",
            "omega": "sqrt(ac / r)",
            "r": "ac / (omega^2)"
        },
        "variables": {
            "ac": {
                "name": "Aceleração centrípeta (a_c)",
                "si_unit": "m/s^2"
            },
            "omega": {
                "name": "Velocidade angular (ω)",
                "si_unit": "rad/s"
            },
            "r": {
                "name": "Raio da trajetória (r)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "r > 0"
        ],
        "description": "Aceleração centrípeta em função da velocidade angular."
    },
    {
        "id": "mcuv_angular_velocity",
        "name": "MCUV — Equação da Velocidade Angular",
        "category": "Física: Cinemática",
        "latex": "\\omega = \\omega_0 + \\alpha \\cdot t",
        "latex_rearranged": {
            "omega": "\\omega = \\omega_0 + \\alpha \\cdot t",
            "omega0": "\\omega_0 = \\omega - \\alpha \\cdot t",
            "alpha": "\\alpha = \\frac{\\omega - \\omega_0}{t}",
            "t": "t = \\frac{\\omega - \\omega_0}{\\alpha}"
        },
        "computable": {
            "omega": "omega0 + alpha * t",
            "omega0": "omega - alpha * t",
            "alpha": "(omega - omega0) / t",
            "t": "(omega - omega0) / alpha"
        },
        "variables": {
            "omega": {
                "name": "Velocidade angular final (ω)",
                "si_unit": "rad/s"
            },
            "omega0": {
                "name": "Velocidade angular inicial (ω_0)",
                "si_unit": "rad/s"
            },
            "alpha": {
                "name": "Aceleração angular (α)",
                "si_unit": "rad/s^2"
            },
            "t": {
                "name": "Tempo decorrido (t)",
                "si_unit": "s"
            }
        },
        "description": "Velocidade angular com aceleração angular constante em função do tempo."
    },
    {
        "id": "mcuv_angular_position",
        "name": "MCUV — Equação Horária da Posição Angular",
        "category": "Física: Cinemática",
        "latex": "\\theta = \\theta_0 + \\omega_0 \\cdot t + \\frac{1}{2} \\alpha \\cdot t^2",
        "latex_rearranged": {
            "theta": "\\theta = \\theta_0 + \\omega_0 \\cdot t + \\frac{1}{2} \\alpha \\cdot t^2",
            "theta0": "\\theta_0 = \\theta - \\omega_0 \\cdot t - \\frac{1}{2} \\alpha \\cdot t^2",
            "omega0": "\\omega_0 = \\frac{\\theta - \\theta_0 - \\frac{1}{2} \\alpha \\cdot t^2}{t}",
            "alpha": "\\alpha = \\frac{2(\\theta - \\theta_0 - \\omega_0 \\cdot t)}{t^2}"
        },
        "computable": {
            "theta": "theta0 + omega0 * t + 0.5 * alpha * t^2",
            "theta0": "theta - omega0 * t - 0.5 * alpha * t^2",
            "omega0": "(theta - theta0 - 0.5 * alpha * t^2) / t",
            "alpha": "2 * (theta - theta0 - omega0 * t) / (t^2)"
        },
        "variables": {
            "theta": {
                "name": "Posição angular final (θ)",
                "si_unit": "rad"
            },
            "theta0": {
                "name": "Posição angular inicial (θ_0)",
                "si_unit": "rad"
            },
            "omega0": {
                "name": "Velocidade angular inicial (ω_0)",
                "si_unit": "rad/s"
            },
            "alpha": {
                "name": "Aceleração angular (α)",
                "si_unit": "rad/s^2"
            },
            "t": {
                "name": "Tempo decorrido (t)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "t > 0"
        ],
        "description": "Ângulo percorrido no MCUV em função do tempo."
    },
    {
        "id": "mcuv_torricelli",
        "name": "MCUV — Equação de Torricelli Angular",
        "category": "Física: Cinemática",
        "latex": "\\omega^2 = \\omega_0^2 + 2 \\cdot \\alpha \\cdot \\Delta \\theta",
        "latex_rearranged": {
            "omega": "\\omega = \\sqrt{\\omega_0^2 + 2 \\cdot \\alpha \\cdot \\Delta \\theta}",
            "omega0": "\\omega_0 = \\sqrt{\\omega^2 - 2 \\cdot \\alpha \\cdot \\Delta \\theta}",
            "alpha": "\\alpha = \\frac{\\omega^2 - \\omega_0^2}{2 \\cdot \\Delta \\theta}",
            "dtheta": "\\Delta \\theta = \\frac{\\omega^2 - \\omega_0^2}{2 \\cdot \\alpha}"
        },
        "computable": {
            "omega": "sqrt(omega0^2 + 2 * alpha * dtheta)",
            "omega0": "sqrt(omega^2 - 2 * alpha * dtheta)",
            "alpha": "(omega^2 - omega0^2) / (2 * dtheta)",
            "dtheta": "(omega^2 - omega0^2) / (2 * alpha)"
        },
        "variables": {
            "omega": {
                "name": "Velocidade angular final (ω)",
                "si_unit": "rad/s"
            },
            "omega0": {
                "name": "Velocidade angular inicial (ω_0)",
                "si_unit": "rad/s"
            },
            "alpha": {
                "name": "Aceleração angular (α)",
                "si_unit": "rad/s^2"
            },
            "dtheta": {
                "name": "Deslocamento angular (Δθ)",
                "si_unit": "rad"
            }
        },
        "description": "Relação angular entre velocidades e deslocamento sem a variável tempo."
    },
    {
        "id": "mcuv_tangential_acc",
        "name": "MCUV — Aceleração Tangencial",
        "category": "Física: Cinemática",
        "latex": "a_t = \\alpha \\cdot r",
        "latex_rearranged": {
            "at": "a_t = \\alpha \\cdot r",
            "alpha": "\\alpha = \\frac{a_t}{r}",
            "r": "r = \\frac{a_t}{\\alpha}"
        },
        "computable": {
            "at": "alpha * r",
            "alpha": "at / r",
            "r": "at / alpha"
        },
        "variables": {
            "at": {
                "name": "Aceleração tangencial (a_t)",
                "si_unit": "m/s^2"
            },
            "alpha": {
                "name": "Aceleração angular (α)",
                "si_unit": "rad/s^2"
            },
            "r": {
                "name": "Raio (r)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "r > 0"
        ],
        "description": "Componente tangencial da aceleração responsável por alterar o módulo da velocidade linear."
    },
    {
        "id": "mcuv_total_acc",
        "name": "MCUV — Aceleração Linear Total",
        "category": "Física: Cinemática",
        "latex": "a = \\sqrt{a_t^2 + a_c^2}",
        "latex_rearranged": {
            "a": "a = \\sqrt{a_t^2 + a_c^2}",
            "at": "a_t = \\sqrt{a^2 - a_c^2}",
            "ac": "a_c = \\sqrt{a^2 - a_t^2}"
        },
        "computable": {
            "a": "sqrt(at^2 + ac^2)",
            "at": "sqrt(a^2 - ac^2)",
            "ac": "sqrt(a^2 - at^2)"
        },
        "variables": {
            "a": {
                "name": "Aceleração total (a)",
                "si_unit": "m/s^2"
            },
            "at": {
                "name": "Aceleração tangencial (a_t)",
                "si_unit": "m/s^2"
            },
            "ac": {
                "name": "Aceleração centrípeta (a_c)",
                "si_unit": "m/s^2"
            }
        },
        "description": "Módulo do vetor aceleração resultante composto pelas componentes tangencial e centrípeta."
    },
    {
        "id": "oblique_launch_vx",
        "name": "Lançamento Oblíquo — Velocidade Horizontal (v_0x)",
        "category": "Física: Cinemática",
        "latex": "v_{0x} = v_0 \\cos\\theta",
        "latex_rearranged": {
            "v0x": "v_{0x} = v_0 \\cos\\theta",
            "v0": "v_0 = \\frac{v_{0x}}{\\cos\\theta}",
            "theta": "\\theta = \\arccos\\left(\\frac{v_{0x}}{v_0}\\right)"
        },
        "computable": {
            "v0x": "v0 * cos(theta)",
            "v0": "v0x / cos(theta)",
            "theta": "acos(v0x / v0)"
        },
        "variables": {
            "v0x": {
                "name": "Componente horizontal (v_0x)",
                "si_unit": "m/s"
            },
            "v0": {
                "name": "Velocidade inicial de lançamento (v_0)",
                "si_unit": "m/s"
            },
            "theta": {
                "name": "Ângulo de lançamento (θ)",
                "si_unit": "rad"
            }
        },
        "constraints": [
            "v0 >= 0"
        ],
        "description": "Decomposição da velocidade inicial ao longo do eixo horizontal (MRU)."
    },
    {
        "id": "oblique_launch_v0y",
        "name": "Lançamento Oblíquo — Velocidade Vertical Inicial (v_0y)",
        "category": "Física: Cinemática",
        "latex": "v_{0y} = v_0 \\sin\\theta",
        "latex_rearranged": {
            "v0y": "v_{0y} = v_0 \\sin\\theta",
            "v0": "v_0 = \\frac{v_{0y}}{\\sin\\theta}",
            "theta": "\\theta = \\arcsin\\left(\\frac{v_{0y}}{v_0}\\right)"
        },
        "computable": {
            "v0y": "v0 * sin(theta)",
            "v0": "v0y / sin(theta)",
            "theta": "asin(v0y / v0)"
        },
        "variables": {
            "v0y": {
                "name": "Componente vertical inicial (v_0y)",
                "si_unit": "m/s"
            },
            "v0": {
                "name": "Velocidade inicial de lançamento (v_0)",
                "si_unit": "m/s"
            },
            "theta": {
                "name": "Ângulo de lançamento (θ)",
                "si_unit": "rad"
            }
        },
        "constraints": [
            "v0 >= 0"
        ],
        "description": "Decomposição da velocidade inicial ao longo do eixo vertical (MUV)."
    },
    {
        "id": "oblique_launch_x",
        "name": "Lançamento Oblíquo — Posição Horizontal (x)",
        "category": "Física: Cinemática",
        "latex": "x = x_0 + v_0 \\cos\\theta \\cdot t",
        "latex_rearranged": {
            "x": "x = x_0 + v_0 \\cos\\theta \\cdot t",
            "x0": "x_0 = x - v_0 \\cos\\theta \\cdot t",
            "t": "t = \\frac{x - x_0}{v_0 \\cos\\theta}"
        },
        "computable": {
            "x": "x0 + v0 * cos(theta) * t",
            "x0": "x - v0 * cos(theta) * t",
            "t": "(x - x0) / (v0 * cos(theta))"
        },
        "variables": {
            "x": {
                "name": "Posição horizontal (x)",
                "si_unit": "m"
            },
            "x0": {
                "name": "Posição inicial (x_0)",
                "si_unit": "m"
            },
            "v0": {
                "name": "Velocidade inicial (v_0)",
                "si_unit": "m/s"
            },
            "theta": {
                "name": "Ângulo de lançamento (θ)",
                "si_unit": "rad"
            },
            "t": {
                "name": "Tempo decorrido (t)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "t >= 0"
        ],
        "description": "Alcance horizontal da partícula em função do tempo no plano cartesiano."
    },
    {
        "id": "oblique_launch_y",
        "name": "Lançamento Oblíquo — Posição Vertical (y)",
        "category": "Física: Cinemática",
        "latex": "y = y_0 + v_0 \\sin\\theta \\cdot t - \\frac{1}{2} g \\cdot t^2",
        "latex_rearranged": {
            "y": "y = y_0 + v_0 \\sin\\theta \\cdot t - \\frac{1}{2} g \\cdot t^2",
            "y0": "y_0 = y - v_0 \\sin\\theta \\cdot t + \\frac{1}{2} g \\cdot t^2",
            "g": "g = \\frac{2(y_0 + v_0 \\sin\\theta \\cdot t - y)}{t^2}"
        },
        "computable": {
            "y": "y0 + v0 * sin(theta) * t - 0.5 * g * t^2",
            "y0": "y - v0 * sin(theta) * t + 0.5 * g * t^2",
            "g": "2 * (y0 + v0 * sin(theta) * t - y) / (t^2)"
        },
        "variables": {
            "y": {
                "name": "Altura instantânea (y)",
                "si_unit": "m"
            },
            "y0": {
                "name": "Altura de lançamento (y_0)",
                "si_unit": "m"
            },
            "v0": {
                "name": "Velocidade inicial (v_0)",
                "si_unit": "m/s"
            },
            "theta": {
                "name": "Ângulo com a horizontal (θ)",
                "si_unit": "rad"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            },
            "t": {
                "name": "Tempo decorrido (t)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "t > 0",
            "g > 0"
        ],
        "description": "Coordenada vertical da partícula em função do tempo."
    },
    {
        "id": "oblique_launch_vy",
        "name": "Lançamento Oblíquo — Velocidade Vertical Instantânea",
        "category": "Física: Cinemática",
        "latex": "v_y = v_0 \\sin\\theta - g \\cdot t",
        "latex_rearranged": {
            "vy": "v_y = v_0 \\sin\\theta - g \\cdot t",
            "t": "t = \\frac{v_0 \\sin\\theta - v_y}{g}",
            "g": "g = \\frac{v_0 \\sin\\theta - v_y}{t}"
        },
        "computable": {
            "vy": "v0 * sin(theta) - g * t",
            "t": "(v0 * sin(theta) - vy) / g",
            "g": "(v0 * sin(theta) - vy) / t"
        },
        "variables": {
            "vy": {
                "name": "Velocidade vertical (v_y)",
                "si_unit": "m/s"
            },
            "v0": {
                "name": "Velocidade inicial (v_0)",
                "si_unit": "m/s"
            },
            "theta": {
                "name": "Ângulo (θ)",
                "si_unit": "rad"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            },
            "t": {
                "name": "Tempo (t)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "g > 0"
        ],
        "description": "Componente vertical da velocidade durante a trajetória parabólica."
    },
    {
        "id": "oblique_launch_v_total",
        "name": "Lançamento Oblíquo — Módulo da Velocidade Resultante",
        "category": "Física: Cinemática",
        "latex": "v = \\sqrt{v_x^2 + v_y^2}",
        "latex_rearranged": {
            "v": "v = \\sqrt{v_x^2 + v_y^2}",
            "vx": "v_x = \\sqrt{v^2 - v_y^2}",
            "vy": "v_y = \\sqrt{v^2 - v_x^2}"
        },
        "computable": {
            "v": "sqrt(vx^2 + vy^2)",
            "vx": "sqrt(v^2 - vy^2)",
            "vy": "sqrt(v^2 - vx^2)"
        },
        "variables": {
            "v": {
                "name": "Módulo da velocidade (v)",
                "si_unit": "m/s"
            },
            "vx": {
                "name": "Componente horizontal (v_x)",
                "si_unit": "m/s"
            },
            "vy": {
                "name": "Componente vertical (v_y)",
                "si_unit": "m/s"
            }
        },
        "description": "Composição pitagórica dos vetores de velocidade horizontal e vertical."
    },
    {
        "id": "oblique_launch_time_up",
        "name": "Lançamento Oblíquo — Tempo de Subida",
        "category": "Física: Cinemática",
        "latex": "t_{\\text{sub}} = \\frac{v_0 \\sin\\theta}{g}",
        "latex_rearranged": {
            "tsub": "t_{\\text{sub}} = \\frac{v_0 \\sin\\theta}{g}",
            "v0": "v_0 = \\frac{g \\cdot t_{\\text{sub}}}{\\sin\\theta}",
            "g": "g = \\frac{v_0 \\sin\\theta}{t_{\\text{sub}}}"
        },
        "computable": {
            "tsub": "(v0 * sin(theta)) / g",
            "v0": "(g * tsub) / sin(theta)",
            "g": "(v0 * sin(theta)) / tsub"
        },
        "variables": {
            "tsub": {
                "name": "Tempo de subida (t_sub)",
                "si_unit": "s"
            },
            "v0": {
                "name": "Velocidade inicial (v_0)",
                "si_unit": "m/s"
            },
            "theta": {
                "name": "Ângulo de lançamento (θ)",
                "si_unit": "rad"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            }
        },
        "constraints": [
            "g > 0"
        ],
        "description": "Tempo gasto até atingir o ápice (altura máxima) onde v_y = 0."
    },
    {
        "id": "oblique_launch_max_height",
        "name": "Lançamento Oblíquo — Altura Máxima",
        "category": "Física: Cinemática",
        "latex": "H_{\\max} = \\frac{v_0^2 \\sin^2\\theta}{2 \\cdot g}",
        "latex_rearranged": {
            "Hmax": "H_{\\max} = \\frac{v_0^2 \\sin^2\\theta}{2 \\cdot g}",
            "v0": "v_0 = \\sqrt{\\frac{2 \\cdot g \\cdot H_{\\max}}{\\sin^2\\theta}}",
            "g": "g = \\frac{v_0^2 \\sin^2\\theta}{2 \\cdot H_{\\max}}"
        },
        "computable": {
            "Hmax": "(v0^2 * (sin(theta))^2) / (2 * g)",
            "v0": "sqrt((2 * g * Hmax) / ((sin(theta))^2))",
            "g": "(v0^2 * (sin(theta))^2) / (2 * Hmax)"
        },
        "variables": {
            "Hmax": {
                "name": "Altura máxima (H_max)",
                "si_unit": "m"
            },
            "v0": {
                "name": "Velocidade inicial (v_0)",
                "si_unit": "m/s"
            },
            "theta": {
                "name": "Ângulo de lançamento (θ)",
                "si_unit": "rad"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            }
        },
        "constraints": [
            "Hmax >= 0",
            "g > 0"
        ],
        "description": "Altura máxima atingida pelo projétil durante o voo."
    },
    {
        "id": "oblique_launch_total_time",
        "name": "Lançamento Oblíquo — Tempo Total de Voo",
        "category": "Física: Cinemática",
        "latex": "T = \\frac{2 \\cdot v_0 \\sin\\theta}{g}",
        "latex_rearranged": {
            "T": "T = \\frac{2 \\cdot v_0 \\sin\\theta}{g}",
            "v0": "v_0 = \\frac{g \\cdot T}{2 \\cdot \\sin\\theta}",
            "g": "g = \\frac{2 \\cdot v_0 \\sin\\theta}{T}"
        },
        "computable": {
            "T": "(2 * v0 * sin(theta)) / g",
            "v0": "(g * T) / (2 * sin(theta))",
            "g": "(2 * v0 * sin(theta)) / T"
        },
        "variables": {
            "T": {
                "name": "Tempo total de voo (T)",
                "si_unit": "s"
            },
            "v0": {
                "name": "Velocidade inicial (v_0)",
                "si_unit": "m/s"
            },
            "theta": {
                "name": "Ângulo de tiro (θ)",
                "si_unit": "rad"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            }
        },
        "constraints": [
            "g > 0"
        ],
        "description": "Tempo total decorrido entre o lançamento e o impacto no mesmo nível horizontal."
    },
    {
        "id": "oblique_launch_range",
        "name": "Lançamento Oblíquo — Alcance Horizontal Máximo",
        "category": "Física: Cinemática",
        "latex": "A = \\frac{v_0^2 \\sin(2\\theta)}{g}",
        "latex_rearranged": {
            "A": "A = \\frac{v_0^2 \\sin(2\\theta)}{g}",
            "v0": "v_0 = \\sqrt{\\frac{A \\cdot g}{\\sin(2\\theta)}}",
            "g": "g = \\frac{v_0^2 \\sin(2\\theta)}{A}"
        },
        "computable": {
            "A": "(v0^2 * sin(2 * theta)) / g",
            "v0": "sqrt((A * g) / sin(2 * theta))",
            "g": "(v0^2 * sin(2 * theta)) / A"
        },
        "variables": {
            "A": {
                "name": "Alcance horizontal (A)",
                "si_unit": "m"
            },
            "v0": {
                "name": "Velocidade inicial (v_0)",
                "si_unit": "m/s"
            },
            "theta": {
                "name": "Ângulo de lançamento (θ)",
                "si_unit": "rad"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            }
        },
        "constraints": [
            "g > 0",
            "v0 > 0"
        ],
        "description": "Distância horizontal percorrida até retornar ao nível inicial de lançamento."
    },
    {
        "id": "horizontal_launch_x",
        "name": "Lançamento Horizontal — Posição Horizontal (x)",
        "category": "Física: Cinemática",
        "latex": "x = x_0 + v_0 \\cdot t",
        "latex_rearranged": {
            "x": "x = x_0 + v_0 \\cdot t",
            "x0": "x_0 = x - v_0 \\cdot t",
            "v0": "v_0 = \\frac{x - x_0}{t}",
            "t": "t = \\frac{x - x_0}{v_0}"
        },
        "computable": {
            "x": "x0 + v0 * t",
            "x0": "x - v0 * t",
            "v0": "(x - x0) / t",
            "t": "(x - x0) / v0"
        },
        "variables": {
            "x": {
                "name": "Posição horizontal final (x)",
                "si_unit": "m"
            },
            "x0": {
                "name": "Posição horizontal inicial (x_0)",
                "si_unit": "m"
            },
            "v0": {
                "name": "Velocidade horizontal constante (v_0)",
                "si_unit": "m/s"
            },
            "t": {
                "name": "Tempo decorrido (t)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "t >= 0"
        ],
        "description": "Movimento uniforme ao longo do eixo x no lançamento horizontal."
    },
    {
        "id": "horizontal_launch_y",
        "name": "Lançamento Horizontal — Posição Vertical (y)",
        "category": "Física: Cinemática",
        "latex": "y = h - \\frac{1}{2} g \\cdot t^2",
        "latex_rearranged": {
            "y": "y = h - \\frac{1}{2} g \\cdot t^2",
            "h": "h = y + \\frac{1}{2} g \\cdot t^2",
            "t": "t = \\sqrt{\\frac{2(h - y)}{g}}",
            "g": "g = \\frac{2(h - y)}{t^2}"
        },
        "computable": {
            "y": "h - 0.5 * g * t^2",
            "h": "y + 0.5 * g * t^2",
            "t": "sqrt((2 * (h - y)) / g)",
            "g": "(2 * (h - y)) / (t^2)"
        },
        "variables": {
            "y": {
                "name": "Altura instantânea (y)",
                "si_unit": "m"
            },
            "h": {
                "name": "Altura de lançamento (h)",
                "si_unit": "m"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            },
            "t": {
                "name": "Tempo (t)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "g > 0",
            "t >= 0"
        ],
        "description": "Queda livre vertical simultânea ao movimento horizontal."
    },
    {
        "id": "horizontal_launch_fall_time",
        "name": "Lançamento Horizontal — Tempo de Queda",
        "category": "Física: Cinemática",
        "latex": "t_q = \\sqrt{\\frac{2 \\cdot h}{g}}",
        "latex_rearranged": {
            "tq": "t_q = \\sqrt{\\frac{2 \\cdot h}{g}}",
            "h": "h = \\frac{g \\cdot t_q^2}{2}",
            "g": "g = \\frac{2 \\cdot h}{t_q^2}"
        },
        "computable": {
            "tq": "sqrt((2 * h) / g)",
            "h": "(g * tq^2) / 2",
            "g": "(2 * h) / (tq^2)"
        },
        "variables": {
            "tq": {
                "name": "Tempo total de queda (t_q)",
                "si_unit": "s"
            },
            "h": {
                "name": "Altura inicial de lançamento (h)",
                "si_unit": "m"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            }
        },
        "constraints": [
            "h >= 0",
            "g > 0"
        ],
        "description": "Tempo gasto até atingir o solo a partir de uma altura inicial h."
    },
    {
        "id": "horizontal_launch_range",
        "name": "Lançamento Horizontal — Alcance",
        "category": "Física: Cinemática",
        "latex": "A = v_0 \\sqrt{\\frac{2 \\cdot h}{g}}",
        "latex_rearranged": {
            "A": "A = v_0 \\sqrt{\\frac{2 \\cdot h}{g}}",
            "v0": "v_0 = \\frac{A}{\\sqrt{2 \\cdot h / g}}",
            "h": "h = \\frac{g \\cdot A^2}{2 \\cdot v_0^2}"
        },
        "computable": {
            "A": "v0 * sqrt((2 * h) / g)",
            "v0": "A / sqrt((2 * h) / g)",
            "h": "(g * A^2) / (2 * v0^2)"
        },
        "variables": {
            "A": {
                "name": "Alcance horizontal (A)",
                "si_unit": "m"
            },
            "v0": {
                "name": "Velocidade horizontal inicial (v_0)",
                "si_unit": "m/s"
            },
            "h": {
                "name": "Altura de lançamento (h)",
                "si_unit": "m"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            }
        },
        "constraints": [
            "h >= 0",
            "g > 0"
        ],
        "description": "Distância horizontal percorrida antes de tocar o solo."
    },
    {
        "id": "horizontal_launch_vy",
        "name": "Lançamento Horizontal — Velocidade Vertical de Impacto",
        "category": "Física: Cinemática",
        "latex": "v_y = g \\cdot t",
        "latex_rearranged": {
            "vy": "v_y = g \\cdot t",
            "g": "g = \\frac{v_y}{t}",
            "t": "t = \\frac{v_y}{g}"
        },
        "computable": {
            "vy": "g * t",
            "g": "vy / t",
            "t": "vy / g"
        },
        "variables": {
            "vy": {
                "name": "Módulo da velocidade vertical (v_y)",
                "si_unit": "m/s"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            },
            "t": {
                "name": "Tempo decorrido (t)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "g > 0",
            "t >= 0"
        ],
        "description": "Componente vertical da velocidade gerada pela aceleração da gravidade."
    },
    {
        "id": "horizontal_launch_v_total",
        "name": "Lançamento Horizontal — Velocidade Resultante",
        "category": "Física: Cinemática",
        "latex": "v = \\sqrt{v_0^2 + (g \\cdot t)^2}",
        "latex_rearranged": {
            "v": "v = \\sqrt{v_0^2 + g^2 t^2}",
            "v0": "v_0 = \\sqrt{v^2 - g^2 t^2}",
            "t": "t = \\frac{\\sqrt{v^2 - v_0^2}}{g}"
        },
        "computable": {
            "v": "sqrt(v0^2 + (g * t)^2)",
            "v0": "sqrt(v^2 - (g * t)^2)",
            "t": "sqrt(v^2 - v0^2) / g"
        },
        "variables": {
            "v": {
                "name": "Velocidade resultante (v)",
                "si_unit": "m/s"
            },
            "v0": {
                "name": "Velocidade horizontal (v_0)",
                "si_unit": "m/s"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            },
            "t": {
                "name": "Tempo de queda (t)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "g > 0",
            "t >= 0"
        ],
        "description": "Módulo do vetor velocidade resultante no instante t do lançamento horizontal."
    },
    {
        "id": "newtons_second_law",
        "name": "2ª Lei de Newton — Força Resultante",
        "category": "Física: Dinâmica",
        "latex": "F_R = m \\cdot a",
        "latex_rearranged": {
            "F": "F_R = m \\cdot a",
            "m": "m = \\frac{F_R}{a}",
            "a": "a = \\frac{F_R}{m}"
        },
        "computable": {
            "F": "m * a",
            "m": "F / a",
            "a": "F / m"
        },
        "variables": {
            "F": {
                "name": "Força resultante (F_R)",
                "si_unit": "N"
            },
            "m": {
                "name": "Massa inercial (m)",
                "si_unit": "kg"
            },
            "a": {
                "name": "Aceleração (a)",
                "si_unit": "m/s^2"
            }
        },
        "constraints": [
            "m > 0"
        ],
        "description": "Princípio Fundamental da Dinâmica: a força resultante é o produto da massa pela aceleração."
    },
    {
        "id": "weight",
        "name": "Força Peso",
        "category": "Física: Dinâmica",
        "latex": "P = m \\cdot g",
        "latex_rearranged": {
            "P": "P = m \\cdot g",
            "m": "m = \\frac{P}{g}",
            "g": "g = \\frac{P}{m}"
        },
        "computable": {
            "P": "m * g",
            "m": "P / g",
            "g": "P / m"
        },
        "variables": {
            "P": {
                "name": "Força peso (P)",
                "si_unit": "N"
            },
            "m": {
                "name": "Massa do corpo (m)",
                "si_unit": "kg"
            },
            "g": {
                "name": "Aceleração da gravidade local (g)",
                "si_unit": "m/s^2"
            }
        },
        "constraints": [
            "m > 0",
            "g > 0"
        ],
        "description": "Força gravitacional de atração exercida por um planeta sobre a massa de um corpo."
    },
    {
        "id": "normal_horizontal",
        "name": "Força Normal (Superfície Horizontal)",
        "category": "Física: Dinâmica",
        "latex": "N = m \\cdot g",
        "latex_rearranged": {
            "N": "N = m \\cdot g",
            "m": "m = \\frac{N}{g}",
            "g": "g = \\frac{N}{m}"
        },
        "computable": {
            "N": "m * g",
            "m": "N / g",
            "g": "N / m"
        },
        "variables": {
            "N": {
                "name": "Força normal de apoio (N)",
                "si_unit": "N"
            },
            "m": {
                "name": "Massa (m)",
                "si_unit": "kg"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            }
        },
        "constraints": [
            "m > 0",
            "g > 0"
        ],
        "description": "Força de reação normal da superfície em plano horizontal em equilíbrio vertical."
    },
    {
        "id": "normal_inclined",
        "name": "Força Normal (Plano Inclinado)",
        "category": "Física: Dinâmica",
        "latex": "N = m \\cdot g \\cdot \\cos\\theta",
        "latex_rearranged": {
            "N": "N = m \\cdot g \\cdot \\cos\\theta",
            "m": "m = \\frac{N}{g \\cdot \\cos\\theta}",
            "theta": "\\theta = \\arccos\\left(\\frac{N}{m \\cdot g}\\right)"
        },
        "computable": {
            "N": "m * g * cos(theta)",
            "m": "N / (g * cos(theta))",
            "theta": "acos(N / (m * g))"
        },
        "variables": {
            "N": {
                "name": "Força normal (N)",
                "si_unit": "N"
            },
            "m": {
                "name": "Massa (m)",
                "si_unit": "kg"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            },
            "theta": {
                "name": "Ângulo de inclinação (θ)",
                "si_unit": "rad"
            }
        },
        "constraints": [
            "m > 0",
            "g > 0"
        ],
        "description": "Equilíbrio perpendicular em superfície inclinada sem aceleração normal."
    },
    {
        "id": "friction_static_max",
        "name": "Força de Atrito Estático Máximo",
        "category": "Física: Dinâmica",
        "latex": "f_{at} = \\mu_e \\cdot N",
        "latex_rearranged": {
            "fat": "f_{at} = \\mu_e \\cdot N",
            "mue": "\\mu_e = \\frac{f_{at}}{N}",
            "N": "N = \\frac{f_{at}}{\\mu_e}"
        },
        "computable": {
            "fat": "mue * N",
            "mue": "fat / N",
            "N": "fat / mue"
        },
        "variables": {
            "fat": {
                "name": "Força de atrito estático máximo (f_at)",
                "si_unit": "N"
            },
            "mue": {
                "name": "Coeficiente de atrito estático (μ_e)",
                "si_unit": ""
            },
            "N": {
                "name": "Força normal (N)",
                "si_unit": "N"
            }
        },
        "constraints": [
            "mue >= 0",
            "N > 0"
        ],
        "description": "Força máxima de atrito antes do início do escorregamento (iminência de movimento)."
    },
    {
        "id": "friction_kinetic",
        "name": "Força de Atrito Cinético",
        "category": "Física: Dinâmica",
        "latex": "f_{at} = \\mu_c \\cdot N",
        "latex_rearranged": {
            "fat": "f_{at} = \\mu_c \\cdot N",
            "muc": "\\mu_c = \\frac{f_{at}}{N}",
            "N": "N = \\frac{f_{at}}{\\mu_c}"
        },
        "computable": {
            "fat": "muc * N",
            "muc": "fat / N",
            "N": "fat / muc"
        },
        "variables": {
            "fat": {
                "name": "Força de atrito cinético (f_at)",
                "si_unit": "N"
            },
            "muc": {
                "name": "Coeficiente de atrito cinético (μ_c)",
                "si_unit": ""
            },
            "N": {
                "name": "Força normal (N)",
                "si_unit": "N"
            }
        },
        "constraints": [
            "muc >= 0",
            "N > 0"
        ],
        "description": "Força resistiva que atua durante o deslizamento relativo entre superfícies."
    },
    {
        "id": "elastic_force",
        "name": "Força Elástica (Lei de Hooke)",
        "category": "Física: Dinâmica",
        "latex": "F_{el} = k \\cdot x",
        "latex_rearranged": {
            "Fel": "F_{el} = k \\cdot x",
            "k": "k = \\frac{F_{el}}{x}",
            "x": "x = \\frac{F_{el}}{k}"
        },
        "computable": {
            "Fel": "k * x",
            "k": "Fel / x",
            "x": "Fel / k"
        },
        "variables": {
            "Fel": {
                "name": "Módulo da força elástica (F_el)",
                "si_unit": "N"
            },
            "k": {
                "name": "Constante elástica da mola (k)",
                "si_unit": "N/m"
            },
            "x": {
                "name": "Deformação / alongamento (x)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "k > 0"
        ],
        "description": "Força restauradora proporcional à elongação da mola."
    },
    {
        "id": "centripetal_force_v",
        "name": "Força Centrípeta (Velocidade Linear)",
        "category": "Física: Dinâmica",
        "latex": "F_c = \\frac{m \\cdot v^2}{r}",
        "latex_rearranged": {
            "Fc": "F_c = \\frac{m \\cdot v^2}{r}",
            "m": "m = \\frac{F_c \\cdot r}{v^2}",
            "v": "v = \\sqrt{\\frac{F_c \\cdot r}{m}}",
            "r": "r = \\frac{m \\cdot v^2}{F_c}"
        },
        "computable": {
            "Fc": "(m * v^2) / r",
            "m": "(Fc * r) / (v^2)",
            "v": "sqrt((Fc * r) / m)",
            "r": "(m * v^2) / Fc"
        },
        "variables": {
            "Fc": {
                "name": "Força centrípeta resultante (F_c)",
                "si_unit": "N"
            },
            "m": {
                "name": "Massa do corpo (m)",
                "si_unit": "kg"
            },
            "v": {
                "name": "Velocidade linear tangencial (v)",
                "si_unit": "m/s"
            },
            "r": {
                "name": "Raio da curva (r)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "m > 0",
            "r > 0"
        ],
        "description": "Resultante das forças apontada para o centro de curvatura que curva a trajetória."
    },
    {
        "id": "centripetal_force_omega",
        "name": "Força Centrípeta (Velocidade Angular)",
        "category": "Física: Dinâmica",
        "latex": "F_c = m \\cdot \\omega^2 \\cdot r",
        "latex_rearranged": {
            "Fc": "F_c = m \\cdot \\omega^2 \\cdot r",
            "m": "m = \\frac{F_c}{\\omega^2 \\cdot r}",
            "omega": "\\omega = \\sqrt{\\frac{F_c}{m \\cdot r}}",
            "r": "r = \\frac{F_c}{m \\cdot \\omega^2}"
        },
        "computable": {
            "Fc": "m * (omega^2) * r",
            "m": "Fc / ((omega^2) * r)",
            "omega": "sqrt(Fc / (m * r))",
            "r": "Fc / (m * (omega^2))"
        },
        "variables": {
            "Fc": {
                "name": "Força centrípeta (F_c)",
                "si_unit": "N"
            },
            "m": {
                "name": "Massa (m)",
                "si_unit": "kg"
            },
            "omega": {
                "name": "Velocidade angular (ω)",
                "si_unit": "rad/s"
            },
            "r": {
                "name": "Raio (r)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "m > 0",
            "r > 0"
        ],
        "description": "Força centrípeta calculada diretamente pela velocidade angular de rotação."
    },
    {
        "id": "inclined_plane_parallel",
        "name": "Plano Inclinado — Componente Tangente do Peso",
        "category": "Física: Dinâmica",
        "latex": "P_{\\parallel} = m \\cdot g \\cdot \\sin\\theta",
        "latex_rearranged": {
            "Ppar": "P_{\\parallel} = m \\cdot g \\cdot \\sin\\theta",
            "m": "m = \\frac{P_{\\parallel}}{g \\cdot \\sin\\theta}",
            "theta": "\\theta = \\arcsin\\left(\\frac{P_{\\parallel}}{m \\cdot g}\\right)"
        },
        "computable": {
            "Ppar": "m * g * sin(theta)",
            "m": "Ppar / (g * sin(theta))",
            "theta": "asin(Ppar / (m * g))"
        },
        "variables": {
            "Ppar": {
                "name": "Componente paralela do peso (P_∥)",
                "si_unit": "N"
            },
            "m": {
                "name": "Massa (m)",
                "si_unit": "kg"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            },
            "theta": {
                "name": "Ângulo do plano com a horizontal (θ)",
                "si_unit": "rad"
            }
        },
        "constraints": [
            "m > 0",
            "g > 0"
        ],
        "description": "Força que puxa o corpo ao longo da rampa descendente do plano inclinado."
    },
    {
        "id": "inclined_plane_perpendicular",
        "name": "Plano Inclinado — Componente Normal do Peso",
        "category": "Física: Dinâmica",
        "latex": "P_{\\perp} = m \\cdot g \\cdot \\cos\\theta",
        "latex_rearranged": {
            "Pperp": "P_{\\perp} = m \\cdot g \\cdot \\cos\\theta",
            "m": "m = \\frac{P_{\\perp}}{g \\cdot \\cos\\theta}",
            "theta": "\\theta = \\arccos\\left(\\frac{P_{\\perp}}{m \\cdot g}\\right)"
        },
        "computable": {
            "Pperp": "m * g * cos(theta)",
            "m": "Pperp / (g * cos(theta))",
            "theta": "acos(Pperp / (m * g))"
        },
        "variables": {
            "Pperp": {
                "name": "Componente perpendicular do peso (P_⊥)",
                "si_unit": "N"
            },
            "m": {
                "name": "Massa (m)",
                "si_unit": "kg"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            },
            "theta": {
                "name": "Ângulo com a horizontal (θ)",
                "si_unit": "rad"
            }
        },
        "constraints": [
            "m > 0",
            "g > 0"
        ],
        "description": "Componente da força peso que comprime o corpo contra a superfície da rampa."
    },
    {
        "id": "mechanical_work",
        "name": "Trabalho Mecânico de Força Constante",
        "category": "Física: Energia",
        "latex": "W = F \\cdot d \\cdot \\cos\\theta",
        "latex_rearranged": {
            "W": "W = F \\cdot d \\cdot \\cos\\theta",
            "F": "F = \\frac{W}{d \\cdot \\cos\\theta}",
            "d": "d = \\frac{W}{F \\cdot \\cos\\theta}",
            "theta": "\\theta = \\arccos\\left(\\frac{W}{F \\cdot d}\\right)"
        },
        "computable": {
            "W": "F * d * cos(theta)",
            "F": "W / (d * cos(theta))",
            "d": "W / (F * cos(theta))",
            "theta": "acos(W / (F * d))"
        },
        "variables": {
            "W": {
                "name": "Trabalho realizado (W)",
                "si_unit": "J"
            },
            "F": {
                "name": "Módulo da força (F)",
                "si_unit": "N"
            },
            "d": {
                "name": "Deslocamento (d)",
                "si_unit": "m"
            },
            "theta": {
                "name": "Ângulo entre força e deslocamento (θ)",
                "si_unit": "rad"
            }
        },
        "description": "Energia transferida pela ação de uma força ao longo de um deslocamento."
    },
    {
        "id": "work_energy_theorem",
        "name": "Teorema Trabalho-Energia Cinética",
        "category": "Física: Energia",
        "latex": "W_{\\text{res}} = E_{c,f} - E_{c,i}",
        "latex_rearranged": {
            "Wres": "W_{\\text{res}} = E_{c,f} - E_{c,i}",
            "Ecf": "E_{c,f} = E_{c,i} + W_{\\text{res}}",
            "Eci": "E_{c,i} = E_{c,f} - W_{\\text{res}}"
        },
        "computable": {
            "Wres": "Ecf - Eci",
            "Ecf": "Eci + Wres",
            "Eci": "Ecf - Wres"
        },
        "variables": {
            "Wres": {
                "name": "Trabalho da força resultante (W_res)",
                "si_unit": "J"
            },
            "Ecf": {
                "name": "Energia cinética final (E_cf)",
                "si_unit": "J"
            },
            "Eci": {
                "name": "Energia cinética inicial (E_ci)",
                "si_unit": "J"
            }
        },
        "description": "O trabalho total da resultante das forças equivale à variação da energia cinética."
    },
    {
        "id": "kinetic_energy",
        "name": "Energia Cinética Translacional",
        "category": "Física: Energia",
        "latex": "E_c = \\frac{1}{2} m \\cdot v^2",
        "latex_rearranged": {
            "Ec": "E_c = \\frac{1}{2} m \\cdot v^2",
            "m": "m = \\frac{2 \\cdot E_c}{v^2}",
            "v": "v = \\sqrt{\\frac{2 \\cdot E_c}{m}}"
        },
        "computable": {
            "Ec": "0.5 * m * v^2",
            "m": "(2 * Ec) / (v^2)",
            "v": "sqrt((2 * Ec) / m)"
        },
        "variables": {
            "Ec": {
                "name": "Energia cinética (E_c)",
                "si_unit": "J"
            },
            "m": {
                "name": "Massa (m)",
                "si_unit": "kg"
            },
            "v": {
                "name": "Velocidade (v)",
                "si_unit": "m/s"
            }
        },
        "constraints": [
            "m > 0",
            "Ec >= 0"
        ],
        "description": "Energia associada ao estado de movimento translacional de um corpo."
    },
    {
        "id": "rotational_kinetic_energy",
        "name": "Energia Cinética Rotacional",
        "category": "Física: Energia",
        "latex": "E_{c,\\text{rot}} = \\frac{1}{2} I \\cdot \\omega^2",
        "latex_rearranged": {
            "Ecrot": "E_{c,\\text{rot}} = \\frac{1}{2} I \\cdot \\omega^2",
            "I": "I = \\frac{2 \\cdot E_{c,\\text{rot}}}{\\omega^2}",
            "omega": "\\omega = \\sqrt{\\frac{2 \\cdot E_{c,\\text{rot}}}{I}}"
        },
        "computable": {
            "Ecrot": "0.5 * I * omega^2",
            "I": "(2 * Ecrot) / (omega^2)",
            "omega": "sqrt((2 * Ecrot) / I)"
        },
        "variables": {
            "Ecrot": {
                "name": "Energia cinética rotacional (E_c,rot)",
                "si_unit": "J"
            },
            "I": {
                "name": "Momento de inércia (I)",
                "si_unit": "kg·m^2"
            },
            "omega": {
                "name": "Velocidade angular (ω)",
                "si_unit": "rad/s"
            }
        },
        "constraints": [
            "I > 0"
        ],
        "description": "Energia associada à rotação de um corpo rígido em torno de um eixo fixo."
    },
    {
        "id": "gravitational_potential_surface",
        "name": "Energia Potencial Gravitacional (Superfície)",
        "category": "Física: Energia",
        "latex": "E_p = m \\cdot g \\cdot h",
        "latex_rearranged": {
            "Ep": "E_p = m \\cdot g \\cdot h",
            "m": "m = \\frac{E_p}{g \\cdot h}",
            "g": "g = \\frac{E_p}{m \\cdot h}",
            "h": "h = \\frac{E_p}{m \\cdot g}"
        },
        "computable": {
            "Ep": "m * g * h",
            "m": "Ep / (g * h)",
            "g": "Ep / (m * h)",
            "h": "Ep / (m * g)"
        },
        "variables": {
            "Ep": {
                "name": "Energia potencial gravitacional (E_p)",
                "si_unit": "J"
            },
            "m": {
                "name": "Massa (m)",
                "si_unit": "kg"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            },
            "h": {
                "name": "Altura relativa ao nível de referência (h)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "m > 0",
            "g > 0"
        ],
        "description": "Energia armazenada em virtude da posição relativa no campo gravitacional constante."
    },
    {
        "id": "gravitational_potential_delta",
        "name": "Variação de Energia Potencial Gravitacional",
        "category": "Física: Energia",
        "latex": "\\Delta E_p = m \\cdot g \\cdot (h_f - h_i)",
        "latex_rearranged": {
            "dEp": "\\Delta E_p = m \\cdot g \\cdot \\Delta h",
            "m": "m = \\frac{\\Delta E_p}{g \\cdot \\Delta h}",
            "dh": "\\Delta h = \\frac{\\Delta E_p}{m \\cdot g}"
        },
        "computable": {
            "dEp": "m * g * dh",
            "m": "dEp / (g * dh)",
            "dh": "dEp / (m * g)"
        },
        "variables": {
            "dEp": {
                "name": "Variação de energia potencial (ΔE_p)",
                "si_unit": "J"
            },
            "m": {
                "name": "Massa (m)",
                "si_unit": "kg"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            },
            "dh": {
                "name": "Diferença de altura (Δh)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "m > 0",
            "g > 0"
        ],
        "description": "Trabalho realizado contra o campo gravitacional ao elevar uma massa por Δh."
    },
    {
        "id": "gravitational_potential_universal",
        "name": "Energia Potencial Gravitacional Newtoniana",
        "category": "Física: Energia",
        "latex": "U_g = -\\frac{G \\cdot m_1 \\cdot m_2}{r}",
        "latex_rearranged": {
            "Ug": "U_g = -\\frac{G \\cdot m_1 \\cdot m_2}{r}",
            "r": "r = -\\frac{G \\cdot m_1 \\cdot m_2}{U_g}"
        },
        "computable": {
            "Ug": "-(G * m1 * m2) / r",
            "r": "-(G * m1 * m2) / Ug"
        },
        "variables": {
            "Ug": {
                "name": "Energia potencial gravitacional (U_g)",
                "si_unit": "J"
            },
            "G": {
                "name": "Constante gravitacional (G)",
                "si_unit": "N·m^2/kg^2"
            },
            "m1": {
                "name": "Massa 1 (m_1)",
                "si_unit": "kg"
            },
            "m2": {
                "name": "Massa 2 (m_2)",
                "si_unit": "kg"
            },
            "r": {
                "name": "Distância entre os centros (r)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "r > 0",
            "m1 > 0",
            "m2 > 0"
        ],
        "description": "Energia de atração gravitacional entre duas massas pontuais (referencial nulo no infinito)."
    },
    {
        "id": "elastic_potential_energy",
        "name": "Energia Potencial Elástica",
        "category": "Física: Energia",
        "latex": "E_{pe} = \\frac{1}{2} k \\cdot x^2",
        "latex_rearranged": {
            "Epe": "E_{pe} = \\frac{1}{2} k \\cdot x^2",
            "k": "k = \\frac{2 \\cdot E_{pe}}{x^2}",
            "x": "x = \\sqrt{\\frac{2 \\cdot E_{pe}}{k}}"
        },
        "computable": {
            "Epe": "0.5 * k * x^2",
            "k": "(2 * Epe) / (x^2)",
            "x": "sqrt((2 * Epe) / k)"
        },
        "variables": {
            "Epe": {
                "name": "Energia potencial elástica (E_pe)",
                "si_unit": "J"
            },
            "k": {
                "name": "Constante elástica (k)",
                "si_unit": "N/m"
            },
            "x": {
                "name": "Deformação linear (x)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "k > 0",
            "Epe >= 0"
        ],
        "description": "Energia armazenada em um elemento elástico deformado linearmente."
    },
    {
        "id": "mechanical_energy_sum",
        "name": "Energia Mecânica Total",
        "category": "Física: Energia",
        "latex": "E_m = E_c + E_p",
        "latex_rearranged": {
            "Em": "E_m = E_c + E_p",
            "Ec": "E_c = E_m - E_p",
            "Ep": "E_p = E_m - E_c"
        },
        "computable": {
            "Em": "Ec + Ep",
            "Ec": "Em - Ep",
            "Ep": "Em - Ec"
        },
        "variables": {
            "Em": {
                "name": "Energia mecânica total (E_m)",
                "si_unit": "J"
            },
            "Ec": {
                "name": "Energia cinética (E_c)",
                "si_unit": "J"
            },
            "Ep": {
                "name": "Energia potencial total (E_p)",
                "si_unit": "J"
            }
        },
        "description": "Soma das energias associadas ao movimento e à configuração das posições conservativas."
    },
    {
        "id": "mechanical_power_work",
        "name": "Potência Mecânica Média",
        "category": "Física: Energia",
        "latex": "P = \\frac{W}{\\Delta t}",
        "latex_rearranged": {
            "P": "P = \\frac{W}{\\Delta t}",
            "W": "W = P \\cdot \\Delta t",
            "dt": "\\Delta t = \\frac{W}{P}"
        },
        "computable": {
            "P": "W / dt",
            "W": "P * dt",
            "dt": "W / P"
        },
        "variables": {
            "P": {
                "name": "Potência média (P)",
                "si_unit": "W"
            },
            "W": {
                "name": "Trabalho realizado (W)",
                "si_unit": "J"
            },
            "dt": {
                "name": "Intervalo de tempo (Δt)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "dt > 0"
        ],
        "description": "Taxa de realização de trabalho ou transferência de energia por unidade de tempo."
    },
    {
        "id": "mechanical_power_velocity",
        "name": "Potência Mecânica Instantânea",
        "category": "Física: Energia",
        "latex": "P = F \\cdot v \\cdot \\cos\\theta",
        "latex_rearranged": {
            "P": "P = F \\cdot v \\cdot \\cos\\theta",
            "F": "F = \\frac{P}{v \\cdot \\cos\\theta}",
            "v": "v = \\frac{P}{F \\cdot \\cos\\theta}"
        },
        "computable": {
            "P": "F * v * cos(theta)",
            "F": "P / (v * cos(theta))",
            "v": "P / (F * cos(theta))"
        },
        "variables": {
            "P": {
                "name": "Potência instantânea (P)",
                "si_unit": "W"
            },
            "F": {
                "name": "Força aplicada (F)",
                "si_unit": "N"
            },
            "v": {
                "name": "Velocidade instantânea (v)",
                "si_unit": "m/s"
            },
            "theta": {
                "name": "Ângulo entre os vetores (θ)",
                "si_unit": "rad"
            }
        },
        "description": "Potência desenvolvida por uma força instantânea agindo sobre uma partícula em movimento."
    },
    {
        "id": "mechanical_power_parallel",
        "name": "Potência Mecânica (Força e Velocidade Colineares)",
        "category": "Física: Energia",
        "latex": "P = F \\cdot v",
        "latex_rearranged": {
            "P": "P = F \\cdot v",
            "F": "F = \\frac{P}{v}",
            "v": "v = \\frac{P}{F}"
        },
        "computable": {
            "P": "F * v",
            "F": "P / v",
            "v": "P / F"
        },
        "variables": {
            "P": {
                "name": "Potência (P)",
                "si_unit": "W"
            },
            "F": {
                "name": "Força (F)",
                "si_unit": "N"
            },
            "v": {
                "name": "Velocidade (v)",
                "si_unit": "m/s"
            }
        },
        "description": "Potência mecânica com força e velocidade na mesma direção e sentido (θ = 0)."
    },
    {
        "id": "efficiency_power",
        "name": "Rendimento por Potência",
        "category": "Física: Energia",
        "latex": "\\eta = \\frac{P_{\\text{útil}}}{P_{\\text{total}}}",
        "latex_rearranged": {
            "eta": "\\eta = \\frac{P_{\\text{útil}}}{P_{\\text{total}}}",
            "Putil": "P_{\\text{útil}} = \\eta \\cdot P_{\\text{total}}",
            "Ptotal": "P_{\\text{total}} = \\frac{P_{\\text{útil}}}{\\eta}"
        },
        "computable": {
            "eta": "Putil / Ptotal",
            "Putil": "eta * Ptotal",
            "Ptotal": "Putil / eta"
        },
        "variables": {
            "eta": {
                "name": "Rendimento (η, 0 a 1)",
                "si_unit": ""
            },
            "Putil": {
                "name": "Potência útil aproveitada (P_útil)",
                "si_unit": "W"
            },
            "Ptotal": {
                "name": "Potência total consumida (P_total)",
                "si_unit": "W"
            }
        },
        "constraints": [
            "Ptotal > 0",
            "eta <= 1"
        ],
        "description": "Fração da potência fornecida que é efetivamente convertida em trabalho útil."
    },
    {
        "id": "efficiency_work",
        "name": "Rendimento por Trabalho",
        "category": "Física: Energia",
        "latex": "\\eta = \\frac{W_{\\text{útil}}}{W_{\\text{total}}}",
        "latex_rearranged": {
            "eta": "\\eta = \\frac{W_{\\text{útil}}}{W_{\\text{total}}}",
            "Wutil": "W_{\\text{útil}} = \\eta \\cdot W_{\\text{total}}",
            "Wtotal": "W_{\\text{total}} = \\frac{W_{\\text{útil}}}{\\eta}"
        },
        "computable": {
            "eta": "Wutil / Wtotal",
            "Wutil": "eta * Wtotal",
            "Wtotal": "Wutil / eta"
        },
        "variables": {
            "eta": {
                "name": "Rendimento (η)",
                "si_unit": ""
            },
            "Wutil": {
                "name": "Trabalho útil realizado (W_útil)",
                "si_unit": "J"
            },
            "Wtotal": {
                "name": "Trabalho / energia total (W_total)",
                "si_unit": "J"
            }
        },
        "constraints": [
            "Wtotal > 0",
            "eta <= 1"
        ],
        "description": "Eficiência de conversão em termos da razão entre os trabalhos mecânicos."
    },
    {
        "id": "linear_momentum",
        "name": "Quantidade de Movimento (Momento Linear)",
        "category": "Física: Impulso e Momento",
        "latex": "p = m \\cdot v",
        "latex_rearranged": {
            "p": "p = m \\cdot v",
            "m": "m = \\frac{p}{v}",
            "v": "v = \\frac{p}{m}"
        },
        "computable": {
            "p": "m * v",
            "m": "p / v",
            "v": "p / m"
        },
        "variables": {
            "p": {
                "name": "Quantidade de movimento (p)",
                "si_unit": "kg·m/s"
            },
            "m": {
                "name": "Massa (m)",
                "si_unit": "kg"
            },
            "v": {
                "name": "Velocidade (v)",
                "si_unit": "m/s"
            }
        },
        "constraints": [
            "m > 0"
        ],
        "description": "Grandeza vetorial que mede o estado dinâmico de movimento de um corpo."
    },
    {
        "id": "impulse_force",
        "name": "Impulso de Força Constante",
        "category": "Física: Impulso e Momento",
        "latex": "I = F \\cdot \\Delta t",
        "latex_rearranged": {
            "I": "I = F \\cdot \\Delta t",
            "F": "F = \\frac{I}{\\Delta t}",
            "dt": "\\Delta t = \\frac{I}{F}"
        },
        "computable": {
            "I": "F * dt",
            "F": "I / dt",
            "dt": "I / F"
        },
        "variables": {
            "I": {
                "name": "Impulso exercido (I)",
                "si_unit": "N·s"
            },
            "F": {
                "name": "Força constante (F)",
                "si_unit": "N"
            },
            "dt": {
                "name": "Intervalo de tempo de atuação (Δt)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "dt > 0"
        ],
        "description": "Ação acumulada de uma força ao longo do intervalo de tempo em que age."
    },
    {
        "id": "impulse_momentum_theorem",
        "name": "Teorema do Impulso",
        "category": "Física: Impulso e Momento",
        "latex": "I = p_f - p_i",
        "latex_rearranged": {
            "I": "I = p_f - p_i",
            "pf": "p_f = p_i + I",
            "pi": "p_i = p_f - I"
        },
        "computable": {
            "I": "pf - pi",
            "pf": "pi + I",
            "pi": "pf - I"
        },
        "variables": {
            "I": {
                "name": "Impulso resultante (I)",
                "si_unit": "N·s"
            },
            "pf": {
                "name": "Momento linear final (p_f)",
                "si_unit": "kg·m/s"
            },
            "pi": {
                "name": "Momento linear inicial (p_i)",
                "si_unit": "kg·m/s"
            }
        },
        "description": "O impulso da força resultante é igual à variação da quantidade de movimento do corpo."
    },
    {
        "id": "coefficient_restitution",
        "name": "Coeficiente de Restituição em Colisão",
        "category": "Física: Impulso e Momento",
        "latex": "e = \\frac{v_{2f} - v_{1f}}{v_{1i} - v_{2i}}",
        "latex_rearranged": {
            "e": "e = \\frac{v_{2f} - v_{1f}}{v_{1i} - v_{2i}}",
            "v2f": "v_{2f} = v_{1f} + e(v_{1i} - v_{2i})",
            "v1f": "v_{1f} = v_{2f} - e(v_{1i} - v_{2i})"
        },
        "computable": {
            "e": "(v2f - v1f) / (v1i - v2i)",
            "v2f": "v1f + e * (v1i - v2i)",
            "v1f": "v2f - e * (v1i - v2i)"
        },
        "variables": {
            "e": {
                "name": "Coeficiente de restituição (e)",
                "si_unit": ""
            },
            "v2f": {
                "name": "Velocidade final de 2 (v_2f)",
                "si_unit": "m/s"
            },
            "v1f": {
                "name": "Velocidade final de 1 (v_1f)",
                "si_unit": "m/s"
            },
            "v1i": {
                "name": "Velocidade inicial de 1 (v_1i)",
                "si_unit": "m/s"
            },
            "v2i": {
                "name": "Velocidade inicial de 2 (v_2i)",
                "si_unit": "m/s"
            }
        },
        "constraints": [
            "e >= 0",
            "e <= 1"
        ],
        "description": "Razão entre as velocidades relativas de afastamento e de aproximação em choque mecânico."
    },
    {
        "id": "density",
        "name": "Densidade / Massa Específica",
        "category": "Física: Hidrostática",
        "latex": "\\rho = \\frac{m}{V}",
        "latex_rearranged": {
            "rho": "\\rho = \\frac{m}{V}",
            "m": "m = \\rho \\cdot V",
            "V": "V = \\frac{m}{\\rho}"
        },
        "computable": {
            "rho": "m / V",
            "m": "rho * V",
            "V": "m / rho"
        },
        "variables": {
            "rho": {
                "name": "Densidade volumétrica (ρ)",
                "si_unit": "kg/m^3"
            },
            "m": {
                "name": "Massa (m)",
                "si_unit": "kg"
            },
            "V": {
                "name": "Volume (V)",
                "si_unit": "m^3"
            }
        },
        "constraints": [
            "V > 0",
            "rho > 0"
        ],
        "description": "Concentração mássica por unidade de volume ocupado."
    },
    {
        "id": "specific_weight",
        "name": "Peso Específico",
        "category": "Física: Hidrostática",
        "latex": "\\gamma = \\rho \\cdot g",
        "latex_rearranged": {
            "gamma": "\\gamma = \\rho \\cdot g",
            "rho": "\\rho = \\frac{\\gamma}{g}",
            "g": "g = \\frac{\\gamma}{\\rho}"
        },
        "computable": {
            "gamma": "rho * g",
            "rho": "gamma / g",
            "g": "gamma / rho"
        },
        "variables": {
            "gamma": {
                "name": "Peso específico (γ)",
                "si_unit": "N/m^3"
            },
            "rho": {
                "name": "Massa específica (ρ)",
                "si_unit": "kg/m^3"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            }
        },
        "constraints": [
            "rho > 0",
            "g > 0"
        ],
        "description": "Peso de uma substância contida em um volume unitário."
    },
    {
        "id": "pressure_force_area",
        "name": "Pressão Mecânica",
        "category": "Física: Hidrostática",
        "latex": "p = \\frac{F_\\perp}{A}",
        "latex_rearranged": {
            "p": "p = \\frac{F}{A}",
            "F": "F = p \\cdot A",
            "A": "A = \\frac{F}{p}"
        },
        "computable": {
            "p": "F / A",
            "F": "p * A",
            "A": "F / p"
        },
        "variables": {
            "p": {
                "name": "Pressão (p)",
                "si_unit": "Pa"
            },
            "F": {
                "name": "Força normal (F)",
                "si_unit": "N"
            },
            "A": {
                "name": "Área de contato (A)",
                "si_unit": "m^2"
            }
        },
        "constraints": [
            "A > 0"
        ],
        "description": "Distribuição da componente normal de uma força distribuída sobre uma área."
    },
    {
        "id": "stevin_pressure_diff",
        "name": "Teorema de Stevin — Diferença de Pressão",
        "category": "Física: Hidrostática",
        "latex": "\\Delta p = \\rho \\cdot g \\cdot \\Delta h",
        "latex_rearranged": {
            "dp": "\\Delta p = \\rho \\cdot g \\cdot \\Delta h",
            "rho": "\\rho = \\frac{\\Delta p}{g \\cdot \\Delta h}",
            "dh": "\\Delta h = \\frac{\\Delta p}{\\rho \\cdot g}"
        },
        "computable": {
            "dp": "rho * g * dh",
            "rho": "dp / (g * dh)",
            "dh": "dp / (rho * g)"
        },
        "variables": {
            "dp": {
                "name": "Diferença de pressão hidrostática (Δp)",
                "si_unit": "Pa"
            },
            "rho": {
                "name": "Densidade do fluido (ρ)",
                "si_unit": "kg/m^3"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            },
            "dh": {
                "name": "Diferença de profundidade (Δh)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "rho > 0",
            "g > 0"
        ],
        "description": "Aumento da pressão com a profundidade em uma coluna de fluido homogêneo e incompressível."
    },
    {
        "id": "stevin_pressure_total",
        "name": "Teorema de Stevin — Pressão Hidrostática Total",
        "category": "Física: Hidrostática",
        "latex": "p = p_0 + \\rho \\cdot g \\cdot h",
        "latex_rearranged": {
            "p": "p = p_0 + \\rho \\cdot g \\cdot h",
            "p0": "p_0 = p - \\rho \\cdot g \\cdot h",
            "h": "h = \\frac{p - p_0}{\\rho \\cdot g}",
            "rho": "\\rho = \\frac{p - p_0}{g \\cdot h}"
        },
        "computable": {
            "p": "p0 + rho * g * h",
            "p0": "p - rho * g * h",
            "h": "(p - p0) / (rho * g)",
            "rho": "(p - p0) / (g * h)"
        },
        "variables": {
            "p": {
                "name": "Pressão absoluta no ponto (p)",
                "si_unit": "Pa"
            },
            "p0": {
                "name": "Pressão na superfície livre (p_0)",
                "si_unit": "Pa"
            },
            "rho": {
                "name": "Densidade do líquido (ρ)",
                "si_unit": "kg/m^3"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            },
            "h": {
                "name": "Profundidade abaixo da superfície (h)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "rho > 0",
            "g > 0",
            "h >= 0"
        ],
        "description": "Pressão absoluta somando a atmosférica na superfície à coluna manométrica de líquido."
    },
    {
        "id": "pascal_hydraulic_press",
        "name": "Princípio de Pascal (Prensa Hidráulica)",
        "category": "Física: Hidrostática",
        "latex": "\\frac{F_1}{A_1} = \\frac{F_2}{A_2}",
        "latex_rearranged": {
            "F1": "F_1 = F_2 \\cdot \\frac{A_1}{A_2}",
            "F2": "F_2 = F_1 \\cdot \\frac{A_2}{A_1}",
            "A1": "A_1 = A_2 \\cdot \\frac{F_1}{F_2}",
            "A2": "A_2 = A_1 \\cdot \\frac{F_2}{F_1}"
        },
        "computable": {
            "F1": "F2 * (A1 / A2)",
            "F2": "F1 * (A2 / A1)",
            "A1": "A2 * (F1 / F2)",
            "A2": "A1 * (F2 / F1)"
        },
        "variables": {
            "F1": {
                "name": "Força no pistão 1 (F_1)",
                "si_unit": "N"
            },
            "A1": {
                "name": "Área do pistão 1 (A_1)",
                "si_unit": "m^2"
            },
            "F2": {
                "name": "Força no pistão 2 (F_2)",
                "si_unit": "N"
            },
            "A2": {
                "name": "Área do pistão 2 (A_2)",
                "si_unit": "m^2"
            }
        },
        "constraints": [
            "A1 > 0",
            "A2 > 0"
        ],
        "description": "Transmissão integral de acréscimo de pressão em fluido confinado, multiplicando forças."
    },
    {
        "id": "buoyancy_force",
        "name": "Empuxo Hidrostático (Princípio de Arquimedes)",
        "category": "Física: Hidrostática",
        "latex": "E = \\rho_f \\cdot V_d \\cdot g",
        "latex_rearranged": {
            "E": "E = \\rho_f \\cdot V_d \\cdot g",
            "rhof": "\\rho_f = \\frac{E}{V_d \\cdot g}",
            "Vd": "V_d = \\frac{E}{\\rho_f \\cdot g}",
            "g": "g = \\frac{E}{\\rho_f \\cdot V_d}"
        },
        "computable": {
            "E": "rhof * Vd * g",
            "rhof": "E / (Vd * g)",
            "Vd": "E / (rhof * g)",
            "g": "E / (rhof * Vd)"
        },
        "variables": {
            "E": {
                "name": "Força de empuxo vertical para cima (E)",
                "si_unit": "N"
            },
            "rhof": {
                "name": "Densidade do fluido (ρ_f)",
                "si_unit": "kg/m^3"
            },
            "Vd": {
                "name": "Volume de fluido deslocado (V_d)",
                "si_unit": "m^3"
            },
            "g": {
                "name": "Gravidade (g)",
                "si_unit": "m/s^2"
            }
        },
        "constraints": [
            "rhof > 0",
            "Vd > 0",
            "g > 0"
        ],
        "description": "Força vertical ascendente exercida pelo fluido sobre um corpo submerso, igual ao peso do fluido deslocado."
    },
    {
        "id": "barometric_pressure",
        "name": "Pressão Atmosférica (Experimento de Torricelli)",
        "category": "Física: Hidrostática",
        "latex": "p_{\\text{atm}} = \\rho \\cdot g \\cdot h",
        "latex_rearranged": {
            "patm": "p_{\\text{atm}} = \\rho \\cdot g \\cdot h",
            "h": "h = \\frac{p_{\\text{atm}}}{\\rho \\cdot g}",
            "rho": "\\rho = \\frac{p_{\\text{atm}}}{g \\cdot h}"
        },
        "computable": {
            "patm": "rho * g * h",
            "h": "patm / (rho * g)",
            "rho": "patm / (g * h)"
        },
        "variables": {
            "patm": {
                "name": "Pressão atmosférica (p_atm)",
                "si_unit": "Pa"
            },
            "rho": {
                "name": "Densidade do líquido manométrico (ρ)",
                "si_unit": "kg/m^3"
            },
            "g": {
                "name": "Gravidade local (g)",
                "si_unit": "m/s^2"
            },
            "h": {
                "name": "Altura da coluna de líquido (h)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "rho > 0",
            "g > 0",
            "h > 0"
        ],
        "description": "Equilíbrio entre a pressão atmosférica externa e a coluna hidrostática líquida de mercúrio."
    },
    {
        "id": "universal_gravitation",
        "name": "Lei da Gravitação Universal de Newton",
        "category": "Física: Gravitação",
        "latex": "F_g = G \\cdot \\frac{m_1 \\cdot m_2}{r^2}",
        "latex_rearranged": {
            "Fg": "F_g = G \\cdot \\frac{m_1 \\cdot m_2}{r^2}",
            "m1": "m_1 = \\frac{F_g \\cdot r^2}{G \\cdot m_2}",
            "m2": "m_2 = \\frac{F_g \\cdot r^2}{G \\cdot m_1}",
            "r": "r = \\sqrt{\\frac{G \\cdot m_1 \\cdot m_2}{F_g}}"
        },
        "computable": {
            "Fg": "(G * m1 * m2) / (r^2)",
            "m1": "(Fg * (r^2)) / (G * m2)",
            "m2": "(Fg * (r^2)) / (G * m1)",
            "r": "sqrt((G * m1 * m2) / Fg)"
        },
        "variables": {
            "Fg": {
                "name": "Força gravitacional (F_g)",
                "si_unit": "N"
            },
            "G": {
                "name": "Constante gravitacional (G)",
                "si_unit": "N·m^2/kg^2"
            },
            "m1": {
                "name": "Massa 1 (m_1)",
                "si_unit": "kg"
            },
            "m2": {
                "name": "Massa 2 (m_2)",
                "si_unit": "kg"
            },
            "r": {
                "name": "Distância entre centros de massa (r)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "r > 0",
            "m1 > 0",
            "m2 > 0"
        ],
        "description": "Força mútua de atração atrativa entre duas partículas materiais no universo."
    },
    {
        "id": "gravitational_field_surface",
        "name": "Campo Gravitacional (Aceleração da Gravidade)",
        "category": "Física: Gravitação",
        "latex": "g = \\frac{G \\cdot M}{r^2}",
        "latex_rearranged": {
            "g": "g = \\frac{G \\cdot M}{r^2}",
            "M": "M = \\frac{g \\cdot r^2}{G}",
            "r": "r = \\sqrt{\\frac{G \\cdot M}{g}}"
        },
        "computable": {
            "g": "(G * M) / (r^2)",
            "M": "(g * (r^2)) / G",
            "r": "sqrt((G * M) / g)"
        },
        "variables": {
            "g": {
                "name": "Aceleração da gravidade (g)",
                "si_unit": "m/s^2"
            },
            "G": {
                "name": "Constante G",
                "si_unit": "N·m^2/kg^2"
            },
            "M": {
                "name": "Massa do corpo atrator (M)",
                "si_unit": "kg"
            },
            "r": {
                "name": "Distância ao centro do corpo (r)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "r > 0",
            "M > 0"
        ],
        "description": "Intensidade do campo gravitacional gerado por uma massa esférica a uma distância r."
    },
    {
        "id": "gravitational_field_altitude",
        "name": "Campo Gravitacional a uma Altitude h",
        "category": "Física: Gravitação",
        "latex": "g = \\frac{G \\cdot M}{(R_p + h)^2}",
        "latex_rearranged": {
            "g": "g = \\frac{G \\cdot M}{(R_p + h)^2}",
            "h": "h = \\sqrt{\\frac{G \\cdot M}{g}} - R_p",
            "M": "M = \\frac{g \\cdot (R_p + h)^2}{G}"
        },
        "computable": {
            "g": "(G * M) / ((Rp + h)^2)",
            "h": "sqrt((G * M) / g) - Rp",
            "M": "(g * ((Rp + h)^2)) / G"
        },
        "variables": {
            "g": {
                "name": "Gravidade na altitude (g)",
                "si_unit": "m/s^2"
            },
            "G": {
                "name": "Constante G",
                "si_unit": "N·m^2/kg^2"
            },
            "M": {
                "name": "Massa do planeta (M)",
                "si_unit": "kg"
            },
            "Rp": {
                "name": "Raio do planeta (R_p)",
                "si_unit": "m"
            },
            "h": {
                "name": "Altitude sobre a superfície (h)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "Rp > 0",
            "h >= 0"
        ],
        "description": "Aceleração da gravidade reduzida pela altitude em relação à superfície esférica planetária."
    },
    {
        "id": "gravitational_potential_universal_ug",
        "name": "Energia Potencial Gravitacional Universal",
        "category": "Física: Gravitação",
        "latex": "U_g = -\\frac{G \\cdot M \\cdot m}{r}",
        "latex_rearranged": {
            "Ug": "U_g = -\\frac{G \\cdot M \\cdot m}{r}",
            "r": "r = -\\frac{G \\cdot M \\cdot m}{U_g}"
        },
        "computable": {
            "Ug": "-(G * M * m) / r",
            "r": "-(G * M * m) / Ug"
        },
        "variables": {
            "Ug": {
                "name": "Energia potencial gravitacional (U_g)",
                "si_unit": "J"
            },
            "G": {
                "name": "Constante G",
                "si_unit": "N·m^2/kg^2"
            },
            "M": {
                "name": "Massa do planeta (M)",
                "si_unit": "kg"
            },
            "m": {
                "name": "Massa do satélite (m)",
                "si_unit": "kg"
            },
            "r": {
                "name": "Raio orbital (r)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "r > 0"
        ],
        "description": "Energia potencial de ligação gravitacional em campo newtoniano."
    },
    {
        "id": "gravitational_potential_delta_universal",
        "name": "Variação de Energia Potencial Newtoniana",
        "category": "Física: Gravitação",
        "latex": "\\Delta U_g = G \\cdot M \\cdot m \\left(\\frac{1}{r_i} - \\frac{1}{r_f}\\right)",
        "latex_rearranged": {
            "dUg": "\\Delta U_g = G \\cdot M \\cdot m \\left(\\frac{1}{r_i} - \\frac{1}{r_f}\\right)"
        },
        "computable": {
            "dUg": "G * M * m * (1/ri - 1/rf)"
        },
        "variables": {
            "dUg": {
                "name": "Variação da energia potencial (ΔU_g)",
                "si_unit": "J"
            },
            "G": {
                "name": "Constante G",
                "si_unit": "N·m^2/kg^2"
            },
            "M": {
                "name": "Massa primária (M)",
                "si_unit": "kg"
            },
            "m": {
                "name": "Massa do corpo (m)",
                "si_unit": "kg"
            },
            "ri": {
                "name": "Raio inicial (r_i)",
                "si_unit": "m"
            },
            "rf": {
                "name": "Raio final (r_f)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "ri > 0",
            "rf > 0"
        ],
        "description": "Trabalho realizado para transferir uma massa entre duas distâncias orbitais r_i e r_f."
    },
    {
        "id": "orbital_velocity",
        "name": "Velocidade Orbital Circular",
        "category": "Física: Gravitação",
        "latex": "v_{\\text{orb}} = \\sqrt{\\frac{G \\cdot M}{r}}",
        "latex_rearranged": {
            "vorb": "v_{\\text{orb}} = \\sqrt{\\frac{G \\cdot M}{r}}",
            "r": "r = \\frac{G \\cdot M}{v_{\\text{orb}}^2}",
            "M": "M = \\frac{v_{\\text{orb}}^2 \\cdot r}{G}"
        },
        "computable": {
            "vorb": "sqrt((G * M) / r)",
            "r": "(G * M) / (vorb^2)",
            "M": "(vorb^2 * r) / G"
        },
        "variables": {
            "vorb": {
                "name": "Velocidade orbital (v_orb)",
                "si_unit": "m/s"
            },
            "G": {
                "name": "Constante G",
                "si_unit": "N·m^2/kg^2"
            },
            "M": {
                "name": "Massa central (M)",
                "si_unit": "kg"
            },
            "r": {
                "name": "Raio orbital da trajetória (r)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "r > 0",
            "M > 0"
        ],
        "description": "Velocidade necessária para manter uma órbita circular estável em torno de um astro."
    },
    {
        "id": "escape_velocity",
        "name": "Velocidade de Escape",
        "category": "Física: Gravitação",
        "latex": "v_{\\text{esc}} = \\sqrt{\\frac{2 \\cdot G \\cdot M}{r}}",
        "latex_rearranged": {
            "vesc": "v_{\\text{esc}} = \\sqrt{\\frac{2 \\cdot G \\cdot M}{r}}",
            "r": "r = \\frac{2 \\cdot G \\cdot M}{v_{\\text{esc}}^2}",
            "M": "M = \\frac{v_{\\text{esc}}^2 \\cdot r}{2 \\cdot G}"
        },
        "computable": {
            "vesc": "sqrt((2 * G * M) / r)",
            "r": "(2 * G * M) / (vesc^2)",
            "M": "(vesc^2 * r) / (2 * G)"
        },
        "variables": {
            "vesc": {
                "name": "Velocidade de escape (v_esc)",
                "si_unit": "m/s"
            },
            "G": {
                "name": "Constante G",
                "si_unit": "N·m^2/kg^2"
            },
            "M": {
                "name": "Massa do corpo atrator (M)",
                "si_unit": "kg"
            },
            "r": {
                "name": "Distância radial inicial (r)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "r > 0",
            "M > 0"
        ],
        "description": "Velocidade mínima para um projétil escapar indefinidamente da atração gravitacional sem propulsão adicional."
    },
    {
        "id": "kepler_third_law",
        "name": "3ª Lei de Kepler (Harmônica Geral)",
        "category": "Física: Gravitação",
        "latex": "\\frac{T^2}{a^3} = \\frac{4\\pi^2}{G \\cdot M}",
        "latex_rearranged": {
            "T": "T = 2\\pi \\sqrt{\\frac{a^3}{G \\cdot M}}",
            "a": "a = \\left(\\frac{G \\cdot M \\cdot T^2}{4\\pi^2}\\right)^{1/3}",
            "M": "M = \\frac{4\\pi^2 \\cdot a^3}{G \\cdot T^2}"
        },
        "computable": {
            "T": "2 * pi * sqrt((a^3) / (G * M))",
            "a": "cbrt((G * M * (T^2)) / (4 * (pi^2)))",
            "M": "(4 * (pi^2) * (a^3)) / (G * (T^2))"
        },
        "variables": {
            "T": {
                "name": "Período orbital (T)",
                "si_unit": "s"
            },
            "a": {
                "name": "Semi-eixo maior da órbita (a)",
                "si_unit": "m"
            },
            "G": {
                "name": "Constante G",
                "si_unit": "N·m^2/kg^2"
            },
            "M": {
                "name": "Massa do corpo central (M)",
                "si_unit": "kg"
            }
        },
        "constraints": [
            "a > 0",
            "M > 0",
            "T > 0"
        ],
        "description": "Relação universal de proporcionalidade entre o quadrado do período e o cubo do semi-eixo maior orbital."
    },
    {
        "id": "kepler_third_simple",
        "name": "3ª Lei de Kepler (Constante Solar K)",
        "category": "Física: Gravitação",
        "latex": "T^2 = K \\cdot a^3",
        "latex_rearranged": {
            "T": "T = \\sqrt{K \\cdot a^3}",
            "a": "a = \\sqrt[3]{\\frac{T^2}{K}}",
            "K": "K = \\frac{T^2}{a^3}"
        },
        "computable": {
            "T": "sqrt(K * (a^3))",
            "a": "cbrt((T^2) / K)",
            "K": "(T^2) / (a^3)"
        },
        "variables": {
            "T": {
                "name": "Período orbital (T)",
                "si_unit": "s"
            },
            "a": {
                "name": "Semi-eixo maior orbital (a)",
                "si_unit": "m"
            },
            "K": {
                "name": "Constante de Kepler do sistema (K)",
                "si_unit": "s^2/m^3"
            }
        },
        "constraints": [
            "a > 0",
            "K > 0"
        ],
        "description": "Formulação histórica da 3ª Lei de Kepler para corpos orbitando o mesmo centro gravitacional."
    },
    {
        "id": "temp_celsius_to_kelvin",
        "name": "Escalas — Celsius e Kelvin",
        "category": "Física: Termologia",
        "latex": "T_K = T_C + 273{,}15",
        "latex_rearranged": {
            "TK": "T_K = T_C + 273{,}15",
            "TC": "T_C = T_K - 273{,}15"
        },
        "computable": {
            "TK": "TC + 273.15",
            "TC": "TK - 273.15"
        },
        "variables": {
            "TK": {
                "name": "Temperatura absoluta (T_K)",
                "si_unit": "K"
            },
            "TC": {
                "name": "Temperatura Celsius (T_C)",
                "si_unit": "°C"
            }
        },
        "constraints": [
            "TK >= 0"
        ],
        "description": "Conversão direta entre a escala Celsius e a escala termodinâmica absoluta Kelvin."
    },
    {
        "id": "temp_celsius_to_fahrenheit",
        "name": "Escalas — Celsius e Fahrenheit",
        "category": "Física: Termologia",
        "latex": "T_F = \\frac{9}{5} T_C + 32",
        "latex_rearranged": {
            "TF": "T_F = \\frac{9}{5} T_C + 32",
            "TC": "T_C = \\frac{5}{9}(T_F - 32)"
        },
        "computable": {
            "TF": "(9 / 5) * TC + 32",
            "TC": "(5 / 9) * (TF - 32)"
        },
        "variables": {
            "TF": {
                "name": "Temperatura Fahrenheit (T_F)",
                "si_unit": "°F"
            },
            "TC": {
                "name": "Temperatura Celsius (T_C)",
                "si_unit": "°C"
            }
        },
        "description": "Relação termométrica de equivalência linear entre as escalas Celsius e Fahrenheit."
    },
    {
        "id": "thermal_expansion_linear",
        "name": "Dilatação Térmica Linear",
        "category": "Física: Termologia",
        "latex": "\\Delta L = \\alpha \\cdot L_0 \\cdot \\Delta T",
        "latex_rearranged": {
            "dL": "\\Delta L = \\alpha \\cdot L_0 \\cdot \\Delta T",
            "alpha": "\\alpha = \\frac{\\Delta L}{L_0 \\cdot \\Delta T}",
            "L0": "L_0 = \\frac{\\Delta L}{\\alpha \\cdot \\Delta T}",
            "dT": "\\Delta T = \\frac{\\Delta L}{\\alpha \\cdot L_0}"
        },
        "computable": {
            "dL": "alpha * L0 * dT",
            "alpha": "dL / (L0 * dT)",
            "L0": "dL / (alpha * dT)",
            "dT": "dL / (alpha * L0)"
        },
        "variables": {
            "dL": {
                "name": "Variação de comprimento (ΔL)",
                "si_unit": "m"
            },
            "alpha": {
                "name": "Coeficiente de dilatação linear (α)",
                "si_unit": "1/K"
            },
            "L0": {
                "name": "Comprimento inicial (L_0)",
                "si_unit": "m"
            },
            "dT": {
                "name": "Variação de temperatura (ΔT)",
                "si_unit": "K"
            }
        },
        "constraints": [
            "L0 > 0"
        ],
        "description": "Variação unidimensional de dimensão de sólidos sob aquecimento ou resfriamento."
    },
    {
        "id": "thermal_expansion_linear_final",
        "name": "Dilatação Linear — Comprimento Final",
        "category": "Física: Termologia",
        "latex": "L = L_0 (1 + \\alpha \\cdot \\Delta T)",
        "latex_rearranged": {
            "L": "L = L_0 (1 + \\alpha \\cdot \\Delta T)",
            "L0": "L_0 = \\frac{L}{1 + \\alpha \\cdot \\Delta T}",
            "dT": "\\Delta T = \\frac{L / L_0 - 1}{\\alpha}"
        },
        "computable": {
            "L": "L0 * (1 + alpha * dT)",
            "L0": "L / (1 + alpha * dT)",
            "dT": "(L / L0 - 1) / alpha"
        },
        "variables": {
            "L": {
                "name": "Comprimento final (L)",
                "si_unit": "m"
            },
            "L0": {
                "name": "Comprimento inicial (L_0)",
                "si_unit": "m"
            },
            "alpha": {
                "name": "Coeficiente linear (α)",
                "si_unit": "1/K"
            },
            "dT": {
                "name": "Variação de temperatura (ΔT)",
                "si_unit": "K"
            }
        },
        "constraints": [
            "L0 > 0"
        ],
        "description": "Comprimento atingido por uma barra homogênea após variação de temperatura."
    },
    {
        "id": "thermal_expansion_area",
        "name": "Dilatação Térmica Superficial",
        "category": "Física: Termologia",
        "latex": "\\Delta A = \\beta \\cdot A_0 \\cdot \\Delta T",
        "latex_rearranged": {
            "dA": "\\Delta A = \\beta \\cdot A_0 \\cdot \\Delta T",
            "beta": "\\beta = \\frac{\\Delta A}{A_0 \\cdot \\Delta T}",
            "A0": "A_0 = \\frac{\\Delta A}{\\beta \\cdot \\Delta T}",
            "dT": "\\Delta T = \\frac{\\Delta A}{\\beta \\cdot A_0}"
        },
        "computable": {
            "dA": "beta * A0 * dT",
            "beta": "dA / (A0 * dT)",
            "A0": "dA / (beta * dT)",
            "dT": "dA / (beta * A0)"
        },
        "variables": {
            "dA": {
                "name": "Variação de área (ΔA)",
                "si_unit": "m^2"
            },
            "beta": {
                "name": "Coeficiente superficial (β ≈ 2α)",
                "si_unit": "1/K"
            },
            "A0": {
                "name": "Área inicial (A_0)",
                "si_unit": "m^2"
            },
            "dT": {
                "name": "Variação de temperatura (ΔT)",
                "si_unit": "K"
            }
        },
        "constraints": [
            "A0 > 0"
        ],
        "description": "Dilatação bidimensional em placas e superfícies sólidas."
    },
    {
        "id": "thermal_expansion_volume",
        "name": "Dilatação Térmica Volumétrica",
        "category": "Física: Termologia",
        "latex": "\\Delta V = \\gamma \\cdot V_0 \\cdot \\Delta T",
        "latex_rearranged": {
            "dV": "\\Delta V = \\gamma \\cdot V_0 \\cdot \\Delta T",
            "gamma": "\\gamma = \\frac{\\Delta V}{V_0 \\cdot \\Delta T}",
            "V0": "V_0 = \\frac{\\Delta V}{\\gamma \\cdot \\Delta T}",
            "dT": "\\Delta T = \\frac{\\Delta V}{\\gamma \\cdot V_0}"
        },
        "computable": {
            "dV": "gamma * V0 * dT",
            "gamma": "dV / (V0 * dT)",
            "V0": "dV / (gamma * dT)",
            "dT": "dV / (gamma * V0)"
        },
        "variables": {
            "dV": {
                "name": "Variação de volume (ΔV)",
                "si_unit": "m^3"
            },
            "gamma": {
                "name": "Coeficiente volumétrico (γ ≈ 3α)",
                "si_unit": "1/K"
            },
            "V0": {
                "name": "Volume inicial (V_0)",
                "si_unit": "m^3"
            },
            "dT": {
                "name": "Variação de temperatura (ΔT)",
                "si_unit": "K"
            }
        },
        "constraints": [
            "V0 > 0"
        ],
        "description": "Expansão volumétrica de líquidos ou sólidos homogêneos tridimensionais."
    },
    {
        "id": "sensible_heat",
        "name": "Calor Sensível (Equação Fundamental da Calorimetria)",
        "category": "Física: Termologia",
        "latex": "Q = m \\cdot c \\cdot \\Delta T",
        "latex_rearranged": {
            "Q": "Q = m \\cdot c \\cdot \\Delta T",
            "m": "m = \\frac{Q}{c \\cdot \\Delta T}",
            "c": "c = \\frac{Q}{m \\cdot \\Delta T}",
            "dT": "\\Delta T = \\frac{Q}{m \\cdot c}"
        },
        "computable": {
            "Q": "m * c * dT",
            "m": "Q / (c * dT)",
            "c": "Q / (m * dT)",
            "dT": "Q / (m * c)"
        },
        "variables": {
            "Q": {
                "name": "Quantidade de calor trocado (Q)",
                "si_unit": "J"
            },
            "m": {
                "name": "Massa do corpo (m)",
                "si_unit": "kg"
            },
            "c": {
                "name": "Calor específico da substância (c)",
                "si_unit": "J/(kg·K)"
            },
            "dT": {
                "name": "Variação de temperatura (ΔT)",
                "si_unit": "K"
            }
        },
        "constraints": [
            "m > 0",
            "c > 0"
        ],
        "description": "Calor transferido que acarreta variação de temperatura sem transição de fase."
    },
    {
        "id": "heat_capacity",
        "name": "Capacidade Térmica de um Corpo",
        "category": "Física: Termologia",
        "latex": "C = m \\cdot c",
        "latex_rearranged": {
            "C": "C = m \\cdot c",
            "m": "m = \\frac{C}{c}",
            "c": "c = \\frac{C}{m}"
        },
        "computable": {
            "C": "m * c",
            "m": "C / c",
            "c": "C / m"
        },
        "variables": {
            "C": {
                "name": "Capacidade térmica (C)",
                "si_unit": "J/K"
            },
            "m": {
                "name": "Massa (m)",
                "si_unit": "kg"
            },
            "c": {
                "name": "Calor específico (c)",
                "si_unit": "J/(kg·K)"
            }
        },
        "constraints": [
            "m > 0",
            "c > 0"
        ],
        "description": "Constante térmica de um corpo inteiro que quantifica sua inércia às variações de temperatura."
    },
    {
        "id": "heat_capacity_delta",
        "name": "Calor em Função da Capacidade Térmica",
        "category": "Física: Termologia",
        "latex": "Q = C \\cdot \\Delta T",
        "latex_rearranged": {
            "Q": "Q = C \\cdot \\Delta T",
            "C": "C = \\frac{Q}{\\Delta T}",
            "dT": "\\Delta T = \\frac{Q}{C}"
        },
        "computable": {
            "Q": "C * dT",
            "C": "Q / dT",
            "dT": "Q / C"
        },
        "variables": {
            "Q": {
                "name": "Calor trocado (Q)",
                "si_unit": "J"
            },
            "C": {
                "name": "Capacidade térmica do sistema (C)",
                "si_unit": "J/K"
            },
            "dT": {
                "name": "Variação de temperatura (ΔT)",
                "si_unit": "K"
            }
        },
        "constraints": [
            "C > 0"
        ],
        "description": "Relação macroscópica de transferência de calor proporcional à capacidade térmica."
    },
    {
        "id": "latent_heat",
        "name": "Calor Latente de Mudança de Fase",
        "category": "Física: Termologia",
        "latex": "Q = m \\cdot L",
        "latex_rearranged": {
            "Q": "Q = m \\cdot L",
            "m": "m = \\frac{Q}{L}",
            "L": "L = \\frac{Q}{m}"
        },
        "computable": {
            "Q": "m * L",
            "m": "Q / L",
            "L": "Q / m"
        },
        "variables": {
            "Q": {
                "name": "Calor latente trocado (Q)",
                "si_unit": "J"
            },
            "m": {
                "name": "Massa transformada (m)",
                "si_unit": "kg"
            },
            "L": {
                "name": "Calor latente específico de fase (L)",
                "si_unit": "J/kg"
            }
        },
        "constraints": [
            "m > 0"
        ],
        "description": "Calor trocado a temperatura estritamente constante durante a fusão, ebulição ou sublimação."
    },
    {
        "id": "thermal_conduction_fourier",
        "name": "Condução Térmica (Lei de Fourier)",
        "category": "Física: Termologia",
        "latex": "\\Phi = \\frac{k \\cdot A \\cdot \\Delta T}{d}",
        "latex_rearranged": {
            "Phi": "\\Phi = \\frac{k \\cdot A \\cdot \\Delta T}{d}",
            "k": "k = \\frac{\\Phi \\cdot d}{A \\cdot \\Delta T}",
            "A": "A = \\frac{\\Phi \\cdot d}{k \\cdot \\Delta T}",
            "dT": "\\Delta T = \\frac{\\Phi \\cdot d}{k \\cdot A}",
            "d": "d = \\frac{k \\cdot A \\cdot \\Delta T}{\\Phi}"
        },
        "computable": {
            "Phi": "(k * A * dT) / d",
            "k": "(Phi * d) / (A * dT)",
            "A": "(Phi * d) / (k * dT)",
            "dT": "(Phi * d) / (k * A)",
            "d": "(k * A * dT) / Phi"
        },
        "variables": {
            "Phi": {
                "name": "Fluxo de calor por condução (Φ)",
                "si_unit": "W"
            },
            "k": {
                "name": "Condutividade térmica do material (k)",
                "si_unit": "W/(m·K)"
            },
            "A": {
                "name": "Área da seção de passagem (A)",
                "si_unit": "m^2"
            },
            "dT": {
                "name": "Diferença de temperatura (ΔT)",
                "si_unit": "K"
            },
            "d": {
                "name": "Espessura da parede (d)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "d > 0",
            "A > 0",
            "k > 0"
        ],
        "description": "Taxa temporal de transferência de calor por contato microscópico através de uma parede plana."
    },
    {
        "id": "thermal_resistance",
        "name": "Resistência Térmica Condutiva",
        "category": "Física: Termologia",
        "latex": "R_{\\text{tér}} = \\frac{d}{k \\cdot A}",
        "latex_rearranged": {
            "Rter": "R_{\\text{tér}} = \\frac{d}{k \\cdot A}",
            "d": "d = R_{\\text{tér}} \\cdot k \\cdot A",
            "k": "k = \\frac{d}{R_{\\text{tér}} \\cdot A}",
            "A": "A = \\frac{d}{R_{\\text{tér}} \\cdot k}"
        },
        "computable": {
            "Rter": "d / (k * A)",
            "d": "Rter * k * A",
            "k": "d / (Rter * A)",
            "A": "d / (Rter * k)"
        },
        "variables": {
            "Rter": {
                "name": "Resistência térmica (R_tér)",
                "si_unit": "K/W"
            },
            "d": {
                "name": "Espessura (d)",
                "si_unit": "m"
            },
            "k": {
                "name": "Condutividade térmica (k)",
                "si_unit": "W/(m·K)"
            },
            "A": {
                "name": "Área (A)",
                "si_unit": "m^2"
            }
        },
        "constraints": [
            "d > 0",
            "A > 0",
            "k > 0"
        ],
        "description": "Oposição de uma camada material ao fluxo condutivo de calor."
    },
    {
        "id": "first_law_thermodynamics",
        "name": "1ª Lei da Termodinâmica",
        "category": "Física: Termodinâmica",
        "latex": "\\Delta U = Q - W",
        "latex_rearranged": {
            "dU": "\\Delta U = Q - W",
            "Q": "Q = \\Delta U + W",
            "W": "W = Q - \\Delta U"
        },
        "computable": {
            "dU": "Q - W",
            "Q": "dU + W",
            "W": "Q - dU"
        },
        "variables": {
            "dU": {
                "name": "Variação da energia interna (ΔU)",
                "si_unit": "J"
            },
            "Q": {
                "name": "Calor absorvido pelo sistema (Q)",
                "si_unit": "J"
            },
            "W": {
                "name": "Trabalho realizado pelo gás (W)",
                "si_unit": "J"
            }
        },
        "description": "Princípio da conservação de energia em transformações termodinâmicas."
    },
    {
        "id": "thermal_efficiency_heat",
        "name": "Rendimento de Máquina Térmica (Calores)",
        "category": "Física: Termodinâmica",
        "latex": "\\eta = \\frac{W}{Q_q}",
        "latex_rearranged": {
            "eta": "\\eta = \\frac{W}{Q_q}",
            "W": "W = \\eta \\cdot Q_q",
            "Qq": "Q_q = \\frac{W}{\\eta}"
        },
        "computable": {
            "eta": "W / Qq",
            "W": "eta * Qq",
            "Qq": "W / eta"
        },
        "variables": {
            "eta": {
                "name": "Rendimento térmico (η)",
                "si_unit": ""
            },
            "W": {
                "name": "Trabalho útil de saída (W)",
                "si_unit": "J"
            },
            "Qq": {
                "name": "Calor retirado da fonte quente (Q_q)",
                "si_unit": "J"
            }
        },
        "constraints": [
            "Qq > 0",
            "eta <= 1"
        ],
        "description": "Eficiência de um ciclo termodinâmico na conversão de calor em trabalho mecânico."
    },
    {
        "id": "thermal_efficiency_temps",
        "name": "Rendimento Máximo de Carnot",
        "category": "Física: Termodinâmica",
        "latex": "\\eta_{\\text{Carnot}} = 1 - \\frac{T_f}{T_q}",
        "latex_rearranged": {
            "eta": "\\eta_{\\text{Carnot}} = 1 - \\frac{T_f}{T_q}",
            "Tf": "T_f = T_q (1 - \\eta)",
            "Tq": "T_q = \\frac{T_f}{1 - \\eta}"
        },
        "computable": {
            "eta": "1 - (Tf / Tq)",
            "Tf": "Tq * (1 - eta)",
            "Tq": "Tf / (1 - eta)"
        },
        "variables": {
            "eta": {
                "name": "Rendimento de Carnot (η)",
                "si_unit": ""
            },
            "Tf": {
                "name": "Temperatura absoluta da fonte fria (T_f)",
                "si_unit": "K"
            },
            "Tq": {
                "name": "Temperatura absoluta da fonte quente (T_q)",
                "si_unit": "K"
            }
        },
        "constraints": [
            "Tf > 0",
            "Tq > Tf"
        ],
        "description": "Limite teórico máximo inultrapassável de rendimento para qualquer máquina térmica entre duas temperaturas."
    },
    {
        "id": "entropy_change",
        "name": "Variação de Entropia (Processo Reversível)",
        "category": "Física: Termodinâmica",
        "latex": "\\Delta S = \\frac{\\Delta Q}{T}",
        "latex_rearranged": {
            "dS": "\\Delta S = \\frac{\\Delta Q}{T}",
            "dQ": "\\Delta Q = T \\cdot \\Delta S",
            "T": "T = \\frac{\\Delta Q}{\\Delta S}"
        },
        "computable": {
            "dS": "dQ / T",
            "dQ": "T * dS",
            "T": "dQ / dS"
        },
        "variables": {
            "dS": {
                "name": "Variação de entropia (ΔS)",
                "si_unit": "J/K"
            },
            "dQ": {
                "name": "Calor transferido reversivelmente (ΔQ)",
                "si_unit": "J"
            },
            "T": {
                "name": "Temperatura absoluta de troca (T)",
                "si_unit": "K"
            }
        },
        "constraints": [
            "T > 0"
        ],
        "description": "Definição de Clausius para a variação da função de estado termodinâmica entropia."
    },
    {
        "id": "ideal_gas_law",
        "name": "Equação de Estado dos Gases Ideais (Clapeyron)",
        "category": "Física: Termodinâmica",
        "latex": "p \\cdot V = n \\cdot R_g \\cdot T",
        "latex_rearranged": {
            "p": "p = \\frac{n \\cdot R_g \\cdot T}{V}",
            "V": "V = \\frac{n \\cdot R_g \\cdot T}{p}",
            "n": "n = \\frac{p \\cdot V}{R_g \\cdot T}",
            "T": "T = \\frac{p \\cdot V}{n \\cdot R_g}"
        },
        "computable": {
            "p": "(n * Rg * T) / V",
            "V": "(n * Rg * T) / p",
            "n": "(p * V) / (Rg * T)",
            "T": "(p * V) / (n * Rg)"
        },
        "variables": {
            "p": {
                "name": "Pressão absoluta (p)",
                "si_unit": "Pa"
            },
            "V": {
                "name": "Volume ocupado (V)",
                "si_unit": "m^3"
            },
            "n": {
                "name": "Quantidade de matéria (n)",
                "si_unit": "mol"
            },
            "Rg": {
                "name": "Constante universal dos gases (R_g)",
                "si_unit": "J/(mol·K)"
            },
            "T": {
                "name": "Temperatura absoluta (T)",
                "si_unit": "K"
            }
        },
        "constraints": [
            "p > 0",
            "V > 0",
            "n > 0",
            "T > 0"
        ],
        "description": "Relação macroscópica unificada entre pressão, volume, mols e temperatura de um gás perfeito."
    },
    {
        "id": "ideal_gas_molecular",
        "name": "Equação dos Gases Ideais (Forma Microscópica)",
        "category": "Física: Termodinâmica",
        "latex": "p \\cdot V = N \\cdot k_B \\cdot T",
        "latex_rearranged": {
            "p": "p = \\frac{N \\cdot k_B \\cdot T}{V}",
            "V": "V = \\frac{N \\cdot k_B \\cdot T}{p}",
            "N": "N = \\frac{p \\cdot V}{k_B \\cdot T}",
            "T": "T = \\frac{p \\cdot V}{N \\cdot k_B}"
        },
        "computable": {
            "p": "(N * kB * T) / V",
            "V": "(N * kB * T) / p",
            "N": "(p * V) / (kB * T)",
            "T": "(p * V) / (N * kB)"
        },
        "variables": {
            "p": {
                "name": "Pressão (p)",
                "si_unit": "Pa"
            },
            "V": {
                "name": "Volume (V)",
                "si_unit": "m^3"
            },
            "N": {
                "name": "Número total de moléculas (N)",
                "si_unit": ""
            },
            "kB": {
                "name": "Constante de Boltzmann (k_B)",
                "si_unit": "J/K"
            },
            "T": {
                "name": "Temperatura (T)",
                "si_unit": "K"
            }
        },
        "constraints": [
            "p > 0",
            "V > 0",
            "T > 0"
        ],
        "description": "Equação cinética dos gases ideais em função do número discreto de partículas e k_B."
    },
    {
        "id": "gas_isothermal",
        "name": "Transformação Gasosa Isotérmica (Boyle-Mariotte)",
        "category": "Física: Termodinâmica",
        "latex": "p_1 \\cdot V_1 = p_2 \\cdot V_2",
        "latex_rearranged": {
            "p1": "p_1 = \\frac{p_2 \\cdot V_2}{V_1}",
            "V1": "V_1 = \\frac{p_2 \\cdot V_2}{p_1}",
            "p2": "p_2 = \\frac{p_1 \\cdot V_1}{V_2}",
            "V2": "V_2 = \\frac{p_1 \\cdot V_1}{p_2}"
        },
        "computable": {
            "p1": "(p2 * V2) / V1",
            "V1": "(p2 * V2) / p1",
            "p2": "(p1 * V1) / V2",
            "V2": "(p1 * V1) / p2"
        },
        "variables": {
            "p1": {
                "name": "Pressão inicial (p_1)",
                "si_unit": "Pa"
            },
            "V1": {
                "name": "Volume inicial (V_1)",
                "si_unit": "m^3"
            },
            "p2": {
                "name": "Pressão final (p_2)",
                "si_unit": "Pa"
            },
            "V2": {
                "name": "Volume final (V_2)",
                "si_unit": "m^3"
            }
        },
        "constraints": [
            "p1 > 0",
            "V1 > 0",
            "p2 > 0",
            "V2 > 0"
        ],
        "description": "Transformação a temperatura estritamente constante; pressão inversamente proporcional ao volume."
    },
    {
        "id": "gas_isobaric",
        "name": "Transformação Gasosa Isobárica (Charles)",
        "category": "Física: Termodinâmica",
        "latex": "\\frac{V_1}{T_1} = \\frac{V_2}{T_2}",
        "latex_rearranged": {
            "V1": "V_1 = V_2 \\cdot \\frac{T_1}{T_2}",
            "T1": "T_1 = T_2 \\cdot \\frac{V_1}{V_2}",
            "V2": "V_2 = V_1 \\cdot \\frac{T_2}{T_1}",
            "T2": "T_2 = T_1 \\cdot \\frac{V_2}{V_1}"
        },
        "computable": {
            "V1": "V2 * (T1 / T2)",
            "T1": "T2 * (V1 / V2)",
            "V2": "V1 * (T2 / T1)",
            "T2": "T1 * (V2 / V1)"
        },
        "variables": {
            "V1": {
                "name": "Volume inicial (V_1)",
                "si_unit": "m^3"
            },
            "T1": {
                "name": "Temperatura inicial (T_1)",
                "si_unit": "K"
            },
            "V2": {
                "name": "Volume final (V_2)",
                "si_unit": "m^3"
            },
            "T2": {
                "name": "Temperatura final (T_2)",
                "si_unit": "K"
            }
        },
        "constraints": [
            "V1 > 0",
            "T1 > 0",
            "V2 > 0",
            "T2 > 0"
        ],
        "description": "Transformação a pressão constante; volume diretamente proporcional à temperatura absoluta."
    },
    {
        "id": "gas_isochoric",
        "name": "Transformação Gasosa Isocórica (Gay-Lussac)",
        "category": "Física: Termodinâmica",
        "latex": "\\frac{p_1}{T_1} = \\frac{p_2}{T_2}",
        "latex_rearranged": {
            "p1": "p_1 = p_2 \\cdot \\frac{T_1}{T_2}",
            "T1": "T_1 = T_2 \\cdot \\frac{p_1}{p_2}",
            "p2": "p_2 = p_1 \\cdot \\frac{T_2}{T_1}",
            "T2": "T_2 = T_1 \\cdot \\frac{p_2}{p_1}"
        },
        "computable": {
            "p1": "p2 * (T1 / T2)",
            "T1": "T2 * (p1 / p2)",
            "p2": "p1 * (T2 / T1)",
            "T2": "T1 * (p2 / p1)"
        },
        "variables": {
            "p1": {
                "name": "Pressão inicial (p_1)",
                "si_unit": "Pa"
            },
            "T1": {
                "name": "Temperatura inicial (T_1)",
                "si_unit": "K"
            },
            "p2": {
                "name": "Pressão final (p_2)",
                "si_unit": "Pa"
            },
            "T2": {
                "name": "Temperatura final (T_2)",
                "si_unit": "K"
            }
        },
        "constraints": [
            "p1 > 0",
            "T1 > 0",
            "p2 > 0",
            "T2 > 0"
        ],
        "description": "Transformação a volume constante; pressão diretamente proporcional à temperatura absoluta."
    },
    {
        "id": "ideal_gas_internal_energy",
        "name": "Energia Interna de Gás Ideal",
        "category": "Física: Termodinâmica",
        "latex": "\\Delta U = n \\cdot C_v \\cdot \\Delta T",
        "latex_rearranged": {
            "dU": "\\Delta U = n \\cdot C_v \\cdot \\Delta T",
            "n": "n = \\frac{\\Delta U}{C_v \\cdot \\Delta T}",
            "Cv": "C_v = \\frac{\\Delta U}{n \\cdot \\Delta T}",
            "dT": "\\Delta T = \\frac{\\Delta U}{n \\cdot C_v}"
        },
        "computable": {
            "dU": "n * Cv * dT",
            "n": "dU / (Cv * dT)",
            "Cv": "dU / (n * dT)",
            "dT": "dU / (n * Cv)"
        },
        "variables": {
            "dU": {
                "name": "Variação de energia interna (ΔU)",
                "si_unit": "J"
            },
            "n": {
                "name": "Número de mols (n)",
                "si_unit": "mol"
            },
            "Cv": {
                "name": "Capacidade calorífica molar isocórica (C_v)",
                "si_unit": "J/(mol·K)"
            },
            "dT": {
                "name": "Variação de temperatura (ΔT)",
                "si_unit": "K"
            }
        },
        "constraints": [
            "n > 0",
            "Cv > 0"
        ],
        "description": "Energia cinética interna microscópica do gás dependente unicamente de sua temperatura."
    },
    {
        "id": "wave_velocity_lambda_f",
        "name": "Equação Fundamental da Ondulatória",
        "category": "Física: Ondas",
        "latex": "v = \\lambda \\cdot f",
        "latex_rearranged": {
            "v": "v = \\lambda \\cdot f",
            "lambda": "\\lambda = \\frac{v}{f}",
            "f": "f = \\frac{v}{\\lambda}"
        },
        "computable": {
            "v": "lambda * f",
            "lambda": "v / f",
            "f": "v / lambda"
        },
        "variables": {
            "v": {
                "name": "Velocidade de propagação da onda (v)",
                "si_unit": "m/s"
            },
            "lambda": {
                "name": "Comprimento de onda (λ)",
                "si_unit": "m"
            },
            "f": {
                "name": "Frequência (f)",
                "si_unit": "Hz"
            }
        },
        "constraints": [
            "lambda > 0",
            "f > 0"
        ],
        "description": "Relação fundamental ligando a velocidade de propagação de uma onda ao seu comprimento e frequência."
    },
    {
        "id": "wave_period_freq",
        "name": "Período e Frequência de Onda",
        "category": "Física: Ondas",
        "latex": "T = \\frac{1}{f}",
        "latex_rearranged": {
            "T": "T = \\frac{1}{f}",
            "f": "f = \\frac{1}{T}"
        },
        "computable": {
            "T": "1 / f",
            "f": "1 / T"
        },
        "variables": {
            "T": {
                "name": "Período temporal da oscilação (T)",
                "si_unit": "s"
            },
            "f": {
                "name": "Frequência (f)",
                "si_unit": "Hz"
            }
        },
        "constraints": [
            "f > 0",
            "T > 0"
        ],
        "description": "O período é o inverso da frequência da perturbação ondulatória."
    },
    {
        "id": "wave_angular_frequency",
        "name": "Frequência Angular / Pulsação",
        "category": "Física: Ondas",
        "latex": "\\omega = 2 \\pi f",
        "latex_rearranged": {
            "omega": "\\omega = 2 \\pi f",
            "f": "f = \\frac{\\omega}{2 \\pi}"
        },
        "computable": {
            "omega": "2 * pi * f",
            "f": "omega / (2 * pi)"
        },
        "variables": {
            "omega": {
                "name": "Frequência angular (ω)",
                "si_unit": "rad/s"
            },
            "f": {
                "name": "Frequência (f)",
                "si_unit": "Hz"
            }
        },
        "constraints": [
            "f >= 0"
        ],
        "description": "Taxa de rotação de fase angular da onda."
    },
    {
        "id": "wave_speed_string_taylor",
        "name": "Velocidade de Onda em Corda Tensa (Fórmula de Taylor)",
        "category": "Física: Ondas",
        "latex": "v = \\sqrt{\\frac{F_T}{\\mu_\\ell}}",
        "latex_rearranged": {
            "v": "v = \\sqrt{\\frac{F_T}{\\mu_\\ell}}",
            "FT": "F_T = \\mu_\\ell \\cdot v^2",
            "mul": "\\mu_\\ell = \\frac{F_T}{v^2}"
        },
        "computable": {
            "v": "sqrt(FT / mul)",
            "FT": "mul * (v^2)",
            "mul": "FT / (v^2)"
        },
        "variables": {
            "v": {
                "name": "Velocidade da onda transversal (v)",
                "si_unit": "m/s"
            },
            "FT": {
                "name": "Força de tração / tensão na corda (F_T)",
                "si_unit": "N"
            },
            "mul": {
                "name": "Densidade linear de massa (μ_ℓ)",
                "si_unit": "kg/m"
            }
        },
        "constraints": [
            "FT > 0",
            "mul > 0"
        ],
        "description": "Velocidade de pulsos transversais em uma corda ideal sob tração constante."
    },
    {
        "id": "sound_intensity_area",
        "name": "Intensidade Sonora por Área",
        "category": "Física: Ondas",
        "latex": "I_s = \\frac{P}{A}",
        "latex_rearranged": {
            "Is": "I_s = \\frac{P}{A}",
            "P": "P = I_s \\cdot A",
            "A": "A = \\frac{P}{I_s}"
        },
        "computable": {
            "Is": "P / A",
            "P": "Is * A",
            "A": "P / Is"
        },
        "variables": {
            "Is": {
                "name": "Intensidade acústica (I_s)",
                "si_unit": "W/m^2"
            },
            "P": {
                "name": "Potência sonora emitida pela fonte (P)",
                "si_unit": "W"
            },
            "A": {
                "name": "Área da frente de onda (A)",
                "si_unit": "m^2"
            }
        },
        "constraints": [
            "A > 0"
        ],
        "description": "Fluxo de potência sonora incidente por unidade de área receptora."
    },
    {
        "id": "sound_intensity_spherical",
        "name": "Intensidade Sonora Esférica Isométrica",
        "category": "Física: Ondas",
        "latex": "I_s = \\frac{P}{4 \\pi \\cdot r^2}",
        "latex_rearranged": {
            "Is": "I_s = \\frac{P}{4\\pi r^2}",
            "P": "P = I_s \\cdot 4\\pi r^2",
            "r": "r = \\sqrt{\\frac{P}{4\\pi I_s}}"
        },
        "computable": {
            "Is": "P / (4 * pi * (r^2))",
            "P": "Is * 4 * pi * (r^2)",
            "r": "sqrt(P / (4 * pi * Is))"
        },
        "variables": {
            "Is": {
                "name": "Intensidade sonora esférica (I_s)",
                "si_unit": "W/m^2"
            },
            "P": {
                "name": "Potência acústica total da fonte (P)",
                "si_unit": "W"
            },
            "r": {
                "name": "Distância radial à fonte puntiforme (r)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "r > 0"
        ],
        "description": "Atenuação esférica da energia do som inversamente proporcional ao quadrado da distância."
    },
    {
        "id": "sound_level_db",
        "name": "Nível de Intensidade Sonora (Decibéis)",
        "category": "Física: Ondas",
        "latex": "\\beta = 10 \\log_{10}\\left(\\frac{I_s}{I_0}\\right)",
        "latex_rearranged": {
            "beta": "\\beta = 10 \\log_{10}(I_s / I_0)",
            "Is": "I_s = I_0 \\cdot 10^{\\beta / 10}"
        },
        "computable": {
            "beta": "10 * log10(Is / I0)",
            "Is": "I0 * (10^(beta / 10))"
        },
        "variables": {
            "beta": {
                "name": "Nível de intensidade sonora (β)",
                "si_unit": "dB"
            },
            "Is": {
                "name": "Intensidade sonora real (I_s)",
                "si_unit": "W/m^2"
            },
            "I0": {
                "name": "Limiar de audibilidade humano (I_0 = 10⁻¹²)",
                "si_unit": "W/m^2"
            }
        },
        "constraints": [
            "Is > 0",
            "I0 > 0"
        ],
        "description": "Escala logarítmica correspondente à sensibilidade fisiológica auditiva humana."
    },
    {
        "id": "doppler_effect_source_moving",
        "name": "Efeito Doppler — Fonte em Movimento",
        "category": "Física: Ondas",
        "latex": "f_o = f_s \\cdot \\frac{v}{v - v_f}",
        "latex_rearranged": {
            "fo": "f_o = f_s \\cdot \\frac{v}{v - v_f}",
            "fs": "f_s = f_o \\cdot \\frac{v - v_f}{v}"
        },
        "computable": {
            "fo": "fs * (v / (v - vf))",
            "fs": "fo * ((v - vf) / v)"
        },
        "variables": {
            "fo": {
                "name": "Frequência percebida pelo observador (f_o)",
                "si_unit": "Hz"
            },
            "fs": {
                "name": "Frequência própria emitida pela fonte (f_s)",
                "si_unit": "Hz"
            },
            "v": {
                "name": "Velocidade do som no meio (v)",
                "si_unit": "m/s"
            },
            "vf": {
                "name": "Velocidade da fonte em aproximação (v_f)",
                "si_unit": "m/s"
            }
        },
        "constraints": [
            "v > vf"
        ],
        "description": "Frequência aparente quando a fonte emissora aproxima-se do observador em repouso."
    },
    {
        "id": "doppler_effect_observer_moving",
        "name": "Efeito Doppler — Observador em Movimento",
        "category": "Física: Ondas",
        "latex": "f_o = f_s \\cdot \\frac{v + v_o}{v}",
        "latex_rearranged": {
            "fo": "f_o = f_s \\cdot \\frac{v + v_o}{v}",
            "fs": "f_s = f_o \\cdot \\frac{v}{v + v_o}"
        },
        "computable": {
            "fo": "fs * ((v + vo) / v)",
            "fs": "fo * (v / (v + vo))"
        },
        "variables": {
            "fo": {
                "name": "Frequência percebida (f_o)",
                "si_unit": "Hz"
            },
            "fs": {
                "name": "Frequência da fonte estática (f_s)",
                "si_unit": "Hz"
            },
            "v": {
                "name": "Velocidade do som (v)",
                "si_unit": "m/s"
            },
            "vo": {
                "name": "Velocidade do observador em aproximação (v_o)",
                "si_unit": "m/s"
            }
        },
        "constraints": [
            "v > 0"
        ],
        "description": "Frequência aparente de uma fonte sonora estática captada por um observador que se aproxima."
    },
    {
        "id": "standing_wave_string_pipe_open",
        "name": "Ondas Estacionárias — Corda ou Tubo Aberto",
        "category": "Física: Ondas",
        "latex": "f_n = \\frac{n \\cdot v}{2 \\cdot L}",
        "latex_rearranged": {
            "fn": "f_n = \\frac{n \\cdot v}{2 \\cdot L}",
            "v": "v = \\frac{2 \\cdot L \\cdot f_n}{n}",
            "L": "L = \\frac{n \\cdot v}{2 \\cdot f_n}"
        },
        "computable": {
            "fn": "(n * v) / (2 * L)",
            "v": "(2 * L * fn) / n",
            "L": "(n * v) / (2 * fn)"
        },
        "variables": {
            "fn": {
                "name": "Frequência do n-ésimo harmônico (f_n)",
                "si_unit": "Hz"
            },
            "n": {
                "name": "Número do harmônico (n = 1, 2, 3...)",
                "si_unit": ""
            },
            "v": {
                "name": "Velocidade da onda (v)",
                "si_unit": "m/s"
            },
            "L": {
                "name": "Comprimento da corda ou tubo acústico (L)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "L > 0",
            "n >= 1"
        ],
        "description": "Frequências naturais de ressonância em extremidades com condições de contorno idênticas."
    },
    {
        "id": "standing_wave_pipe_closed",
        "name": "Ondas Estacionárias — Tubo Sonoro Fechado",
        "category": "Física: Ondas",
        "latex": "f_n = \\frac{(2n - 1) \\cdot v}{4 \\cdot L}",
        "latex_rearranged": {
            "fn": "f_n = \\frac{(2n - 1) \\cdot v}{4 \\cdot L}",
            "v": "v = \\frac{4 \\cdot L \\cdot f_n}{2n - 1}",
            "L": "L = \\frac{(2n - 1) \\cdot v}{4 \\cdot f_n}"
        },
        "computable": {
            "fn": "((2 * n - 1) * v) / (4 * L)",
            "v": "(4 * L * fn) / (2 * n - 1)",
            "L": "((2 * n - 1) * v) / (4 * fn)"
        },
        "variables": {
            "fn": {
                "name": "Frequência do harmônico ímpar (f_n)",
                "si_unit": "Hz"
            },
            "n": {
                "name": "Índice do modo ímpar (n = 1, 2, 3...)",
                "si_unit": ""
            },
            "v": {
                "name": "Velocidade do som (v)",
                "si_unit": "m/s"
            },
            "L": {
                "name": "Comprimento do tubo fechado em uma ponta (L)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "L > 0",
            "n >= 1"
        ],
        "description": "Ressonâncias acústicas em tubos semiabertos, apresentando somente harmônicos ímpares."
    },
    {
        "id": "plane_mirrors_images",
        "name": "Espelhos Planos Inclinados — Número de Imagens",
        "category": "Física: Ótica",
        "latex": "N = \\frac{360^\\circ}{\\theta} - 1",
        "latex_rearranged": {
            "N": "N = \\frac{360}{\\theta} - 1",
            "theta": "\\theta = \\frac{360}{N + 1}"
        },
        "computable": {
            "N": "(360 / theta) - 1",
            "theta": "360 / (N + 1)"
        },
        "variables": {
            "N": {
                "name": "Número de imagens formadas (N)",
                "si_unit": ""
            },
            "theta": {
                "name": "Ângulo entre os dois espelhos planos em graus (θ)",
                "si_unit": "graus"
            }
        },
        "constraints": [
            "theta > 0",
            "theta <= 180"
        ],
        "description": "Multiplicação de reflexões de um objeto posicionado entre dois espelhos que formam um ângulo θ."
    },
    {
        "id": "refractive_index",
        "name": "Índice de Refração Absoluto",
        "category": "Física: Ótica",
        "latex": "n = \\frac{c}{v}",
        "latex_rearranged": {
            "n": "n = \\frac{c}{v}",
            "v": "v = \\frac{c}{n}"
        },
        "computable": {
            "n": "c / v",
            "v": "c / n"
        },
        "variables": {
            "n": {
                "name": "Índice de refração do meio (n)",
                "si_unit": ""
            },
            "c": {
                "name": "Velocidade da luz no vácuo (c = 3×10⁸)",
                "si_unit": "m/s"
            },
            "v": {
                "name": "Velocidade da luz no meio material (v)",
                "si_unit": "m/s"
            }
        },
        "constraints": [
            "n >= 1",
            "v > 0"
        ],
        "description": "Redução da velocidade da onda luminosa ao propagar-se no interior de um meio refringente."
    },
    {
        "id": "snells_law",
        "name": "Lei de Snell-Descartes da Refração",
        "category": "Física: Ótica",
        "latex": "n_1 \\cdot \\sin\\theta_1 = n_2 \\cdot \\sin\\theta_2",
        "latex_rearranged": {
            "n1": "n_1 = \\frac{n_2 \\sin\\theta_2}{\\sin\\theta_1}",
            "n2": "n_2 = \\frac{n_1 \\sin\\theta_1}{\\sin\\theta_2}",
            "theta1": "\\theta_1 = \\arcsin\\left(\\frac{n_2 \\sin\\theta_2}{n_1}\\right)",
            "theta2": "\\theta_2 = \\arcsin\\left(\\frac{n_1 \\sin\\theta_1}{n_2}\\right)"
        },
        "computable": {
            "n1": "(n2 * sin(theta2)) / sin(theta1)",
            "n2": "(n1 * sin(theta1)) / sin(theta2)",
            "theta1": "asin((n2 * sin(theta2)) / n1)",
            "theta2": "asin((n1 * sin(theta1)) / n2)"
        },
        "variables": {
            "n1": {
                "name": "Índice de refração do meio 1 (n_1)",
                "si_unit": ""
            },
            "n2": {
                "name": "Índice de refração do meio 2 (n_2)",
                "si_unit": ""
            },
            "theta1": {
                "name": "Ângulo de incidência com a normal (θ_1)",
                "si_unit": "rad"
            },
            "theta2": {
                "name": "Ângulo de refração com a normal (θ_2)",
                "si_unit": "rad"
            }
        },
        "constraints": [
            "n1 > 0",
            "n2 > 0"
        ],
        "description": "Desvio angular do raio luminoso ao atravessar a interface plana entre dois meios ópticos."
    },
    {
        "id": "critical_angle_total_reflection",
        "name": "Ângulo Limite e Reflexão Total",
        "category": "Física: Ótica",
        "latex": "\\sin\\theta_c = \\frac{n_2}{n_1}",
        "latex_rearranged": {
            "thetac": "\\theta_c = \\arcsin\\left(\\frac{n_2}{n_1}\\right)",
            "n2": "n_2 = n_1 \\cdot \\sin\\theta_c",
            "n1": "n_1 = \\frac{n_2}{\\sin\\theta_c}"
        },
        "computable": {
            "thetac": "asin(n2 / n1)",
            "n2": "n1 * sin(thetac)",
            "n1": "n2 / sin(thetac)"
        },
        "variables": {
            "thetac": {
                "name": "Ângulo crítico limite (θ_c)",
                "si_unit": "rad"
            },
            "n2": {
                "name": "Índice de refração do meio menos refringente (n_2)",
                "si_unit": ""
            },
            "n1": {
                "name": "Índice de refração do meio mais refringente (n_1)",
                "si_unit": ""
            }
        },
        "constraints": [
            "n1 > n2"
        ],
        "description": "Ângulo de incidência mínimo a partir do qual ocorre reflexão total interna da luz incidente."
    },
    {
        "id": "gauss_mirror",
        "name": "Equação de Gauss (Espelhos e Lentes)",
        "category": "Física: Ótica",
        "latex": "\\frac{1}{f} = \\frac{1}{p} + \\frac{1}{p'}",
        "latex_rearranged": {
            "f": "f = \\frac{p \\cdot p'}{p + p'}",
            "p": "p = \\frac{f \\cdot p'}{p' - f}",
            "pp": "p' = \\frac{f \\cdot p}{p - f}"
        },
        "computable": {
            "f": "(p * pp) / (p + pp)",
            "p": "(f * pp) / (pp - f)",
            "pp": "(f * p) / (p - f)"
        },
        "variables": {
            "f": {
                "name": "Distância focal (f)",
                "si_unit": "m"
            },
            "p": {
                "name": "Posição do objeto ao vértice (p)",
                "si_unit": "m"
            },
            "pp": {
                "name": "Posição da imagem ao vértice (p')",
                "si_unit": "m"
            }
        },
        "description": "Equação conjugada dos pontos estigmáticos para espelhos esféricos e lentes delgadas."
    },
    {
        "id": "focal_length_radius",
        "name": "Distância Focal e Raio de Curvatura",
        "category": "Física: Ótica",
        "latex": "f = \\frac{R_c}{2}",
        "latex_rearranged": {
            "f": "f = \\frac{R_c}{2}",
            "Rc": "R_c = 2 \\cdot f"
        },
        "computable": {
            "f": "Rc / 2",
            "Rc": "2 * f"
        },
        "variables": {
            "f": {
                "name": "Distância focal (f)",
                "si_unit": "m"
            },
            "Rc": {
                "name": "Raio de curvatura da superfície esférica (R_c)",
                "si_unit": "m"
            }
        },
        "description": "Para pequenos ângulos paraxiais de Gauss, o foco localiza-se na metade do raio de curvatura."
    },
    {
        "id": "magnification_linear",
        "name": "Aumento Linear Transversal (Posições)",
        "category": "Física: Ótica",
        "latex": "m = -\\frac{p'}{p}",
        "latex_rearranged": {
            "m": "m = -\\frac{p'}{p}",
            "pp": "p' = -m \\cdot p",
            "p": "p = -\\frac{p'}{m}"
        },
        "computable": {
            "m": "-(pp / p)",
            "pp": "-(m * p)",
            "p": "-(pp / m)"
        },
        "variables": {
            "m": {
                "name": "Ampliação linear transversal (m)",
                "si_unit": ""
            },
            "pp": {
                "name": "Distância da imagem (p')",
                "si_unit": "m"
            },
            "p": {
                "name": "Distância do objeto (p)",
                "si_unit": "m"
            }
        },
        "description": "Razão de escala e orientação da imagem (m < 0 invertida, m > 0 direita)."
    },
    {
        "id": "magnification_height",
        "name": "Aumento Linear Transversal (Alturas)",
        "category": "Física: Ótica",
        "latex": "m = \\frac{h_i}{h_o}",
        "latex_rearranged": {
            "m": "m = \\frac{h_i}{h_o}",
            "hi": "h_i = m \\cdot h_o",
            "ho": "h_o = \\frac{h_i}{m}"
        },
        "computable": {
            "m": "hi / ho",
            "hi": "m * ho",
            "ho": "hi / m"
        },
        "variables": {
            "m": {
                "name": "Aumento linear (m)",
                "si_unit": ""
            },
            "hi": {
                "name": "Altura da imagem conjugada (h_i)",
                "si_unit": "m"
            },
            "ho": {
                "name": "Altura do objeto real (h_o)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "ho != 0"
        ],
        "description": "Razão direta de proporção geométrica entre as dimensões lineares da imagem e do objeto."
    },
    {
        "id": "lens_maker_equation",
        "name": "Equação dos Fabricantes de Lentes (Halley)",
        "category": "Física: Ótica",
        "latex": "\\frac{1}{f} = \\left(\\frac{n_\\ell}{n_m} - 1\\right)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)",
        "latex_rearranged": {
            "f": "f = \\frac{1}{\\left(\\frac{n_\\ell}{n_m} - 1\\right)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)}"
        },
        "computable": {
            "f": "1 / ((nl / nm - 1) * (1/R1 - 1/R2))"
        },
        "variables": {
            "f": {
                "name": "Distância focal resultante da lente (f)",
                "si_unit": "m"
            },
            "nl": {
                "name": "Índice de refração da lente (n_ℓ)",
                "si_unit": ""
            },
            "nm": {
                "name": "Índice de refração do meio envolvente (n_m)",
                "si_unit": ""
            },
            "R1": {
                "name": "Raio da face anterior 1 (R_1)",
                "si_unit": "m"
            },
            "R2": {
                "name": "Raio da face posterior 2 (R_2)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "nm > 0",
            "nl > 0"
        ],
        "description": "Determinação do poder dióptrico de uma lente esférica delgada a partir dos raios de curvatura e materiais."
    },
    {
        "id": "lens_vergence",
        "name": "Vergência de Lente (Grau)",
        "category": "Física: Ótica",
        "latex": "V = \\frac{1}{f}",
        "latex_rearranged": {
            "V": "V = \\frac{1}{f}",
            "f": "f = \\frac{1}{V}"
        },
        "computable": {
            "V": "1 / f",
            "f": "1 / V"
        },
        "variables": {
            "V": {
                "name": "Vergência óptica (V)",
                "si_unit": "di (1/m)"
            },
            "f": {
                "name": "Distância focal em metros (f)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "f != 0"
        ],
        "description": "Convergência ou divergência da lente medida em dioptrias (graus)."
    },
    {
        "id": "lenses_contact_vergence",
        "name": "Vergência de Lentes Justapostas em Contato",
        "category": "Física: Ótica",
        "latex": "V_{\\text{eq}} = V_1 + V_2",
        "latex_rearranged": {
            "Veq": "V_{\\text{eq}} = V_1 + V_2",
            "V1": "V_1 = V_{\\text{eq}} - V_2",
            "V2": "V_2 = V_{\\text{eq}} - V_1"
        },
        "computable": {
            "Veq": "V1 + V2",
            "V1": "Veq - V2",
            "V2": "Veq - V1"
        },
        "variables": {
            "Veq": {
                "name": "Vergência equivalente do conjunto (V_eq)",
                "si_unit": "di"
            },
            "V1": {
                "name": "Vergência da primeira lente (V_1)",
                "si_unit": "di"
            },
            "V2": {
                "name": "Vergência da segunda lente (V_2)",
                "si_unit": "di"
            }
        },
        "description": "Adição direta de dioptrias em lentes delgadas justapostas axialmente."
    },
    {
        "id": "quantization_electric_charge",
        "name": "Quantização da Carga Elétrica",
        "category": "Física: Eletricidade",
        "latex": "q = n \\cdot e",
        "latex_rearranged": {
            "q": "q = n \\cdot e",
            "n": "n = \\frac{q}{e}"
        },
        "computable": {
            "q": "n * e",
            "n": "q / e"
        },
        "variables": {
            "q": {
                "name": "Carga elétrica total líquida (q)",
                "si_unit": "C"
            },
            "n": {
                "name": "Número inteiro de elétrons em excesso ou falta (n)",
                "si_unit": ""
            },
            "e": {
                "name": "Carga elementar (e = 1,602×10⁻¹⁹)",
                "si_unit": "C"
            }
        },
        "description": "A carga elétrica livre existe sempre como múltiplo inteiro da carga elementar do elétron."
    },
    {
        "id": "coulombs_law",
        "name": "Lei de Coulomb (Força Eletrostática)",
        "category": "Física: Eletricidade",
        "latex": "F_e = k_e \\cdot \\frac{|q_1 \\cdot q_2|}{r^2}",
        "latex_rearranged": {
            "Fe": "F_e = k_e \\frac{|q_1 \\cdot q_2|}{r^2}",
            "q1": "|q_1| = \\frac{F_e \\cdot r^2}{k_e \\cdot |q_2|}",
            "q2": "|q_2| = \\frac{F_e \\cdot r^2}{k_e \\cdot |q_1|}",
            "r": "r = \\sqrt{\\frac{k_e \\cdot |q_1 \\cdot q_2|}{F_e}}"
        },
        "computable": {
            "Fe": "(ke * abs(q1) * abs(q2)) / (r^2)",
            "q1": "(Fe * (r^2)) / (ke * abs(q2))",
            "q2": "(Fe * (r^2)) / (ke * abs(q1))",
            "r": "sqrt((ke * abs(q1) * abs(q2)) / Fe)"
        },
        "variables": {
            "Fe": {
                "name": "Módulo da força eletrostática (F_e)",
                "si_unit": "N"
            },
            "ke": {
                "name": "Constante eletrostática de Coulomb (k_e ≈ 8,99×10⁹)",
                "si_unit": "N·m^2/C^2"
            },
            "q1": {
                "name": "Carga puntiforme 1 (q_1)",
                "si_unit": "C"
            },
            "q2": {
                "name": "Carga puntiforme 2 (q_2)",
                "si_unit": "C"
            },
            "r": {
                "name": "Distância entre as cargas (r)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "r > 0"
        ],
        "description": "Força mútua de atração ou repulsão entre duas cargas puntiformes em repouso."
    },
    {
        "id": "coulomb_constant_permittivity",
        "name": "Constante de Coulomb e Permissividade",
        "category": "Física: Eletricidade",
        "latex": "k_e = \\frac{1}{4 \\pi \\varepsilon_0}",
        "latex_rearranged": {
            "ke": "k_e = \\frac{1}{4\\pi \\varepsilon_0}",
            "eps0": "\\varepsilon_0 = \\frac{1}{4\\pi k_e}"
        },
        "computable": {
            "ke": "1 / (4 * pi * eps0)",
            "eps0": "1 / (4 * pi * ke)"
        },
        "variables": {
            "ke": {
                "name": "Constante de Coulomb (k_e)",
                "si_unit": "N·m^2/C^2"
            },
            "eps0": {
                "name": "Permissividade elétrica do vácuo (ε_0 ≈ 8,854×10⁻¹²)",
                "si_unit": "F/m"
            }
        },
        "constraints": [
            "eps0 > 0"
        ],
        "description": "Definição eletromagnética da constante de Coulomb a partir da permissividade dielétrica do vácuo."
    },
    {
        "id": "electric_field_force",
        "name": "Campo Elétrico (Definição pela Força)",
        "category": "Física: Eletricidade",
        "latex": "E = \\frac{F_e}{q_0}",
        "latex_rearranged": {
            "E": "E = \\frac{F_e}{q_0}",
            "Fe": "F_e = q_0 \\cdot E",
            "q0": "q_0 = \\frac{F_e}{E}"
        },
        "computable": {
            "E": "Fe / q0",
            "Fe": "q0 * E",
            "q0": "Fe / E"
        },
        "variables": {
            "E": {
                "name": "Módulo do vetor campo elétrico (E)",
                "si_unit": "N/C"
            },
            "Fe": {
                "name": "Força elétrica sentida (F_e)",
                "si_unit": "N"
            },
            "q0": {
                "name": "Carga de prova de teste (q_0)",
                "si_unit": "C"
            }
        },
        "constraints": [
            "q0 != 0"
        ],
        "description": "Intensidade da força elétrica exercida por unidade de carga positiva de prova colocada no ponto."
    },
    {
        "id": "electric_field_point_charge",
        "name": "Campo Elétrico de Carga Puntiforme",
        "category": "Física: Eletricidade",
        "latex": "E = k_e \\cdot \\frac{|Q|}{r^2}",
        "latex_rearranged": {
            "E": "E = k_e \\cdot \\frac{|Q|}{r^2}",
            "Q": "|Q| = \\frac{E \\cdot r^2}{k_e}",
            "r": "r = \\sqrt{\\frac{k_e \\cdot |Q|}{E}}"
        },
        "computable": {
            "E": "(ke * abs(Q)) / (r^2)",
            "Q": "(E * (r^2)) / ke",
            "r": "sqrt((ke * abs(Q)) / E)"
        },
        "variables": {
            "E": {
                "name": "Campo elétrico gerado (E)",
                "si_unit": "N/C"
            },
            "ke": {
                "name": "Constante eletrostática (k_e)",
                "si_unit": "N·m^2/C^2"
            },
            "Q": {
                "name": "Carga geradora da fonte (Q)",
                "si_unit": "C"
            },
            "r": {
                "name": "Distância radial ao ponto (r)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "r > 0"
        ],
        "description": "Campo radial estático criado isoladamente por uma carga puntiforme no espaço."
    },
    {
        "id": "electric_force_charge_field",
        "name": "Força Elétrica em Carga Imersa em Campo",
        "category": "Física: Eletricidade",
        "latex": "F_e = q \\cdot E",
        "latex_rearranged": {
            "Fe": "F_e = q \\cdot E",
            "q": "q = \\frac{F_e}{E}",
            "E": "E = \\frac{F_e}{q}"
        },
        "computable": {
            "Fe": "q * E",
            "q": "Fe / E",
            "E": "Fe / q"
        },
        "variables": {
            "Fe": {
                "name": "Força elétrica atuante (F_e)",
                "si_unit": "N"
            },
            "q": {
                "name": "Carga da partícula (q)",
                "si_unit": "C"
            },
            "E": {
                "name": "Campo elétrico no ponto (E)",
                "si_unit": "N/C"
            }
        },
        "description": "Ação mecânica exercida diretamente pelo vetor campo elétrico existente sobre uma carga."
    },
    {
        "id": "electric_field_uniform_voltage",
        "name": "Campo Elétrico Uniforme e DDP",
        "category": "Física: Eletricidade",
        "latex": "E = \\frac{|\\Delta V|}{d}",
        "latex_rearranged": {
            "E": "E = \\frac{|\\Delta V|}{d}",
            "dV": "|\\Delta V| = E \\cdot d",
            "d": "d = \\frac{|\\Delta V|}{E}"
        },
        "computable": {
            "E": "abs(dV) / d",
            "dV": "E * d",
            "d": "abs(dV) / E"
        },
        "variables": {
            "E": {
                "name": "Campo elétrico uniforme (E)",
                "si_unit": "V/m"
            },
            "dV": {
                "name": "Diferença de potencial (ΔV ou U)",
                "si_unit": "V"
            },
            "d": {
                "name": "Distância paralela às linhas de força (d)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "d > 0"
        ],
        "description": "Gradiente constante de potencial elétrico entre placas planas condutoras paralelas."
    },
    {
        "id": "electric_potential_energy_v",
        "name": "Potencial Elétrico pela Energia",
        "category": "Física: Eletricidade",
        "latex": "V = \\frac{U_e}{q}",
        "latex_rearranged": {
            "V": "V = \\frac{U_e}{q}",
            "Ue": "U_e = q \\cdot V",
            "q": "q = \\frac{U_e}{V}"
        },
        "computable": {
            "V": "Ue / q",
            "Ue": "q * V",
            "q": "Ue / V"
        },
        "variables": {
            "V": {
                "name": "Potencial elétrico (V)",
                "si_unit": "V"
            },
            "Ue": {
                "name": "Energia potencial eletrostática (U_e)",
                "si_unit": "J"
            },
            "q": {
                "name": "Carga elétrica (q)",
                "si_unit": "C"
            }
        },
        "constraints": [
            "q != 0"
        ],
        "description": "Energia potencial elétrica por unidade de carga colocada em um determinado ponto do espaço."
    },
    {
        "id": "electric_potential_point_charge",
        "name": "Potencial Elétrico de Carga Puntiforme",
        "category": "Física: Eletricidade",
        "latex": "V = k_e \\cdot \\frac{Q}{r}",
        "latex_rearranged": {
            "V": "V = k_e \\cdot \\frac{Q}{r}",
            "Q": "Q = \\frac{V \\cdot r}{k_e}",
            "r": "r = \\frac{k_e \\cdot Q}{V}"
        },
        "computable": {
            "V": "(ke * Q) / r",
            "Q": "(V * r) / ke",
            "r": "(ke * Q) / V"
        },
        "variables": {
            "V": {
                "name": "Potencial eletrostático (V)",
                "si_unit": "V"
            },
            "ke": {
                "name": "Constante de Coulomb (k_e)",
                "si_unit": "N·m^2/C^2"
            },
            "Q": {
                "name": "Carga elétrica fonte (Q)",
                "si_unit": "C"
            },
            "r": {
                "name": "Distância radial à carga (r)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "r > 0"
        ],
        "description": "Potencial escalar esfericamente simétrico gerado por uma carga puntiforme em relação ao infinito."
    },
    {
        "id": "electric_potential_energy_charge",
        "name": "Energia Potencial de Par de Cargas",
        "category": "Física: Eletricidade",
        "latex": "U_e = k_e \\cdot \\frac{q \\cdot Q}{r}",
        "latex_rearranged": {
            "Ue": "U_e = k_e \\cdot \\frac{q \\cdot Q}{r}",
            "r": "r = \\frac{k_e \\cdot q \\cdot Q}{U_e}"
        },
        "computable": {
            "Ue": "(ke * q * Q) / r",
            "r": "(ke * q * Q) / Ue"
        },
        "variables": {
            "Ue": {
                "name": "Energia potencial mútua (U_e)",
                "si_unit": "J"
            },
            "ke": {
                "name": "Constante k_e",
                "si_unit": "N·m^2/C^2"
            },
            "q": {
                "name": "Carga 1 (q)",
                "si_unit": "C"
            },
            "Q": {
                "name": "Carga 2 (Q)",
                "si_unit": "C"
            },
            "r": {
                "name": "Distância de separação (r)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "r > 0"
        ],
        "description": "Energia necessária para aproximar duas cargas elétricas desde uma separação infinita até a distância r."
    },
    {
        "id": "work_electric_force",
        "name": "Trabalho da Força Elétrica em DDP",
        "category": "Física: Eletricidade",
        "latex": "W_{el} = q(V_i - V_f)",
        "latex_rearranged": {
            "Wel": "W_{el} = q(V_i - V_f)",
            "q": "q = \\frac{W_{el}}{V_i - V_f}"
        },
        "computable": {
            "Wel": "q * (Vi - Vf)",
            "q": "Wel / (Vi - Vf)"
        },
        "variables": {
            "Wel": {
                "name": "Trabalho da força elétrica (W_el)",
                "si_unit": "J"
            },
            "q": {
                "name": "Carga transportada (q)",
                "si_unit": "C"
            },
            "Vi": {
                "name": "Potencial no ponto inicial (V_i)",
                "si_unit": "V"
            },
            "Vf": {
                "name": "Potencial no ponto final (V_f)",
                "si_unit": "V"
            }
        },
        "description": "Trabalho motor ou resistente realizado pelo campo conservativo elétrico no deslocamento da carga."
    },
    {
        "id": "electric_current_average",
        "name": "Corrente Elétrica Média",
        "category": "Física: Eletricidade",
        "latex": "I = \\frac{\\Delta Q}{\\Delta t}",
        "latex_rearranged": {
            "I": "I = \\frac{\\Delta Q}{\\Delta t}",
            "dQ": "\\Delta Q = I \\cdot \\Delta t",
            "dt": "\\Delta t = \\frac{\\Delta Q}{I}"
        },
        "computable": {
            "I": "dQ / dt",
            "dQ": "I * dt",
            "dt": "dQ / I"
        },
        "variables": {
            "I": {
                "name": "Intensidade da corrente elétrica (I)",
                "si_unit": "A"
            },
            "dQ": {
                "name": "Carga líquida que atravessa a seção transversal (ΔQ)",
                "si_unit": "C"
            },
            "dt": {
                "name": "Intervalo de tempo decorrido (Δt)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "dt > 0"
        ],
        "description": "Taxa média de transporte ordenado de carga através de uma seção de um condutor."
    },
    {
        "id": "electric_current_drift",
        "name": "Corrente Elétrica Microscópica (Velocidade de Deriva)",
        "category": "Física: Eletricidade",
        "latex": "I = n_c \\cdot |q| \\cdot A \\cdot v_d",
        "latex_rearranged": {
            "I": "I = n_c \\cdot |q| \\cdot A \\cdot v_d",
            "vd": "v_d = \\frac{I}{n_c \\cdot |q| \\cdot A}",
            "A": "A = \\frac{I}{n_c \\cdot |q| \\cdot v_d}"
        },
        "computable": {
            "I": "nc * abs(q) * A * vd",
            "vd": "I / (nc * abs(q) * A)",
            "A": "I / (nc * abs(q) * vd)"
        },
        "variables": {
            "I": {
                "name": "Corrente de condução (I)",
                "si_unit": "A"
            },
            "nc": {
                "name": "Densidade de portadores livres por volume (n_c)",
                "si_unit": "1/m^3"
            },
            "q": {
                "name": "Carga de cada portador livre (q)",
                "si_unit": "C"
            },
            "A": {
                "name": "Área da seção reta (A)",
                "si_unit": "m^2"
            },
            "vd": {
                "name": "Velocidade média de deriva dos elétrons (v_d)",
                "si_unit": "m/s"
            }
        },
        "constraints": [
            "A > 0",
            "nc > 0"
        ],
        "description": "Descrição microscópica do fluxo de corrente a partir da velocidade média de arraste dos portadores."
    },
    {
        "id": "first_ohm_law",
        "name": "1ª Lei de Ohm",
        "category": "Física: Eletricidade",
        "latex": "U = R \\cdot I",
        "latex_rearranged": {
            "U": "U = R \\cdot I",
            "R": "R = \\frac{U}{I}",
            "I": "I = \\frac{U}{R}"
        },
        "computable": {
            "U": "R * I",
            "R": "U / I",
            "I": "U / R"
        },
        "variables": {
            "U": {
                "name": "Diferença de potencial / tensão (U)",
                "si_unit": "V"
            },
            "R": {
                "name": "Resistência elétrica do condutor (R)",
                "si_unit": "Ω"
            },
            "I": {
                "name": "Corrente elétrica (I)",
                "si_unit": "A"
            }
        },
        "constraints": [
            "R > 0"
        ],
        "description": "Proporcionalidade direta entre a tensão aplicada e a intensidade da corrente em resistores ôhmicos."
    },
    {
        "id": "second_ohm_law",
        "name": "2ª Lei de Ohm (Resistividade Geométrica)",
        "category": "Física: Eletricidade",
        "latex": "R = \\rho_e \\cdot \\frac{L}{A}",
        "latex_rearranged": {
            "R": "R = \\rho_e \\cdot \\frac{L}{A}",
            "rhoe": "\\rho_e = \\frac{R \\cdot A}{L}",
            "L": "L = \\frac{R \\cdot A}{\\rho_e}",
            "A": "A = \\frac{\\rho_e \\cdot L}{R}"
        },
        "computable": {
            "R": "(rhoe * L) / A",
            "rhoe": "(R * A) / L",
            "L": "(R * A) / rhoe",
            "A": "(rhoe * L) / R"
        },
        "variables": {
            "R": {
                "name": "Resistência ôhmica (R)",
                "si_unit": "Ω"
            },
            "rhoe": {
                "name": "Resistividade elétrica do material (ρ_e)",
                "si_unit": "Ω·m"
            },
            "L": {
                "name": "Comprimento do condutor (L)",
                "si_unit": "m"
            },
            "A": {
                "name": "Área da seção transversal (A)",
                "si_unit": "m^2"
            }
        },
        "constraints": [
            "A > 0",
            "L > 0",
            "rhoe > 0"
        ],
        "description": "Cálculo da resistência elétrica a partir das dimensões geométricas do fio e do material condutor."
    },
    {
        "id": "resistance_temperature",
        "name": "Variação da Resistência com a Temperatura",
        "category": "Física: Eletricidade",
        "latex": "R = R_0 (1 + \\alpha_R \\cdot \\Delta T)",
        "latex_rearranged": {
            "R": "R = R_0 (1 + \\alpha_R \\cdot \\Delta T)",
            "R0": "R_0 = \\frac{R}{1 + \\alpha_R \\cdot \\Delta T}",
            "dT": "\\Delta T = \\frac{R / R_0 - 1}{\\alpha_R}"
        },
        "computable": {
            "R": "R0 * (1 + alphaR * dT)",
            "R0": "R / (1 + alphaR * dT)",
            "dT": "(R / R0 - 1) / alphaR"
        },
        "variables": {
            "R": {
                "name": "Resistência na temperatura final (R)",
                "si_unit": "Ω"
            },
            "R0": {
                "name": "Resistência na temperatura de referência inicial (R_0)",
                "si_unit": "Ω"
            },
            "alphaR": {
                "name": "Coeficiente de temperatura do resistor (α_R)",
                "si_unit": "1/°C"
            },
            "dT": {
                "name": "Variação de temperatura (ΔT)",
                "si_unit": "°C"
            }
        },
        "constraints": [
            "R0 > 0"
        ],
        "description": "Comportamento térmico da resistividade em metais condutores."
    },
    {
        "id": "electric_power_ui",
        "name": "Potência Elétrica (P = U·I)",
        "category": "Física: Eletricidade",
        "latex": "P = U \\cdot I",
        "latex_rearranged": {
            "P": "P = U \\cdot I",
            "U": "U = \\frac{P}{I}",
            "I": "I = \\frac{P}{U}"
        },
        "computable": {
            "P": "U * I",
            "U": "P / I",
            "I": "P / U"
        },
        "variables": {
            "P": {
                "name": "Potência elétrica (P)",
                "si_unit": "W"
            },
            "U": {
                "name": "Tensão / ddp (U)",
                "si_unit": "V"
            },
            "I": {
                "name": "Corrente elétrica (I)",
                "si_unit": "A"
            }
        },
        "description": "Taxa de transferência ou transformação de energia elétrica em um elemento de circuito."
    },
    {
        "id": "electric_power_ri2",
        "name": "Potência Elétrica Dissipada (P = R·I²)",
        "category": "Física: Eletricidade",
        "latex": "P = R \\cdot I^2",
        "latex_rearranged": {
            "P": "P = R \\cdot I^2",
            "R": "R = \\frac{P}{I^2}",
            "I": "I = \\sqrt{\\frac{P}{R}}"
        },
        "computable": {
            "P": "R * (I^2)",
            "R": "P / (I^2)",
            "I": "sqrt(P / R)"
        },
        "variables": {
            "P": {
                "name": "Potência dissipada por efeito térmico (P)",
                "si_unit": "W"
            },
            "R": {
                "name": "Resistência elétrica (R)",
                "si_unit": "Ω"
            },
            "I": {
                "name": "Corrente que atravessa o resistor (I)",
                "si_unit": "A"
            }
        },
        "constraints": [
            "R > 0"
        ],
        "description": "Dissipação térmica de potência elétrica em um condutor de resistência R."
    },
    {
        "id": "electric_power_u2r",
        "name": "Potência Elétrica por Tensão (P = U²/R)",
        "category": "Física: Eletricidade",
        "latex": "P = \\frac{U^2}{R}",
        "latex_rearranged": {
            "P": "P = \\frac{U^2}{R}",
            "U": "U = \\sqrt{P \\cdot R}",
            "R": "R = \\frac{U^2}{P}"
        },
        "computable": {
            "P": "(U^2) / R",
            "U": "sqrt(P * R)",
            "R": "(U^2) / P"
        },
        "variables": {
            "P": {
                "name": "Potência consumida (P)",
                "si_unit": "W"
            },
            "U": {
                "name": "Tensão elétrica aplicada (U)",
                "si_unit": "V"
            },
            "R": {
                "name": "Resistência ôhmica (R)",
                "si_unit": "Ω"
            }
        },
        "constraints": [
            "R > 0"
        ],
        "description": "Expressão da potência em função da tensão e da resistência do aparelho."
    },
    {
        "id": "electric_energy",
        "name": "Energia Elétrica Consumida",
        "category": "Física: Eletricidade",
        "latex": "E_{el} = P \\cdot \\Delta t",
        "latex_rearranged": {
            "Eel": "E_{el} = P \\cdot \\Delta t",
            "P": "P = \\frac{E_{el}}{\\Delta t}",
            "dt": "\\Delta t = \\frac{E_{el}}{P}"
        },
        "computable": {
            "Eel": "P * dt",
            "P": "Eel / dt",
            "dt": "Eel / P"
        },
        "variables": {
            "Eel": {
                "name": "Energia elétrica consumida (E_el)",
                "si_unit": "J"
            },
            "P": {
                "name": "Potência do aparelho (P)",
                "si_unit": "W"
            },
            "dt": {
                "name": "Tempo de funcionamento (Δt)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "dt > 0"
        ],
        "description": "Consumo acumulado de energia elétrica ao longo do período de operação (1 kWh = 3,6×10⁶ J)."
    },
    {
        "id": "joule_heating_effect",
        "name": "Efeito Joule (Calor Dissipado)",
        "category": "Física: Eletricidade",
        "latex": "Q_J = R \\cdot I^2 \\cdot \\Delta t",
        "latex_rearranged": {
            "QJ": "Q_J = R \\cdot I^2 \\cdot \\Delta t",
            "R": "R = \\frac{Q_J}{I^2 \\cdot \\Delta t}",
            "dt": "\\Delta t = \\frac{Q_J}{R \\cdot I^2}"
        },
        "computable": {
            "QJ": "R * (I^2) * dt",
            "R": "QJ / ((I^2) * dt)",
            "dt": "QJ / (R * (I^2))"
        },
        "variables": {
            "QJ": {
                "name": "Calor gerado por efeito Joule (Q_J)",
                "si_unit": "J"
            },
            "R": {
                "name": "Resistência (R)",
                "si_unit": "Ω"
            },
            "I": {
                "name": "Corrente elétrica (I)",
                "si_unit": "A"
            },
            "dt": {
                "name": "Tempo de passagem da corrente (Δt)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "R > 0",
            "dt > 0"
        ],
        "description": "Conversão irreversível de energia elétrica em energia térmica devido a colisões atômicas."
    },
    {
        "id": "resistors_series",
        "name": "Associação de Resistores em Série",
        "category": "Física: Eletricidade",
        "type": "DYNAMIC_LIST",
        "listVariable": "R_list",
        "itemFields": [
            "R"
        ],
        "targetVariable": "Req",
        "latex": "R_{eq} = R_1 + R_2 + \\dots + R_n",
        "latex_rearranged": {
            "Req": "R_{eq} = \\sum_{i=1}^n R_i"
        },
        "computable": {
            "Req": "sum(R_list)"
        },
        "variables": {
            "Req": {
                "name": "Resistência equivalente (R_eq)",
                "si_unit": "Ω"
            },
            "R_list": {
                "name": "Lista de resistores individuais (R_i)",
                "si_unit": "Ω"
            }
        },
        "description": "Soma das resistências em circuito em série onde a mesma corrente atravessa todos os componentes."
    },
    {
        "id": "resistors_parallel",
        "name": "Associação de Resistores em Paralelo",
        "category": "Física: Eletricidade",
        "type": "DYNAMIC_LIST",
        "listVariable": "R_list",
        "itemFields": [
            "R"
        ],
        "targetVariable": "Req",
        "latex": "\\frac{1}{R_{eq}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots + \\frac{1}{R_n}",
        "latex_rearranged": {
            "Req": "R_{eq} = \\left(\\sum_{i=1}^n \\frac{1}{R_i}\\right)^{-1}"
        },
        "computable": {
            "Req": "1 / sum_inv(R_list)"
        },
        "variables": {
            "Req": {
                "name": "Resistência equivalente em paralelo (R_eq)",
                "si_unit": "Ω"
            },
            "R_list": {
                "name": "Lista de resistências ligadas em paralelo",
                "si_unit": "Ω"
            }
        },
        "description": "Soma dos inversos das resistências onde a tensão aplicada sobre cada ramo é idêntica."
    },
    {
        "id": "resistors_two_parallel",
        "name": "Dois Resistores em Paralelo",
        "category": "Física: Eletricidade",
        "latex": "R_{eq} = \\frac{R_1 \\cdot R_2}{R_1 + R_2}",
        "latex_rearranged": {
            "Req": "R_{eq} = \\frac{R_1 \\cdot R_2}{R_1 + R_2}",
            "R1": "R_1 = \\frac{R_{eq} \\cdot R_2}{R_2 - R_{eq}}",
            "R2": "R_2 = \\frac{R_{eq} \\cdot R_1}{R_1 - R_{eq}}"
        },
        "computable": {
            "Req": "(R1 * R2) / (R1 + R2)",
            "R1": "(Req * R2) / (R2 - Req)",
            "R2": "(Req * R1) / (R1 - Req)"
        },
        "variables": {
            "Req": {
                "name": "Resistência equivalente (R_eq)",
                "si_unit": "Ω"
            },
            "R1": {
                "name": "Resistor 1 (R_1)",
                "si_unit": "Ω"
            },
            "R2": {
                "name": "Resistor 2 (R_2)",
                "si_unit": "Ω"
            }
        },
        "constraints": [
            "R1 > 0",
            "R2 > 0"
        ],
        "description": "Fórmula simplificada de produto pela soma para associação de dois resistores em paralelo."
    },
    {
        "id": "capacitance_definition",
        "name": "Capacitância Eletrostática",
        "category": "Física: Eletricidade",
        "latex": "C = \\frac{Q}{U}",
        "latex_rearranged": {
            "C": "C = \\frac{Q}{U}",
            "Q": "Q = C \\cdot U",
            "U": "U = \\frac{Q}{C}"
        },
        "computable": {
            "C": "Q / U",
            "Q": "C * U",
            "U": "Q / C"
        },
        "variables": {
            "C": {
                "name": "Capacitância (C)",
                "si_unit": "F"
            },
            "Q": {
                "name": "Carga acumulada nas armaduras (Q)",
                "si_unit": "C"
            },
            "U": {
                "name": "Diferença de potencial (U)",
                "si_unit": "V"
            }
        },
        "constraints": [
            "C > 0",
            "U > 0"
        ],
        "description": "Capacidade de armazenamento de carga elétrica sob determinada ddp."
    },
    {
        "id": "capacitance_parallel_plate",
        "name": "Capacitor de Placas Paralelas",
        "category": "Física: Eletricidade",
        "latex": "C = \\varepsilon \\cdot \\frac{A}{d}",
        "latex_rearranged": {
            "C": "C = \\varepsilon \\cdot \\frac{A}{d}",
            "eps": "\\varepsilon = \\frac{C \\cdot d}{A}",
            "A": "A = \\frac{C \\cdot d}{\\varepsilon}",
            "d": "d = \\frac{\\varepsilon \\cdot A}{C}"
        },
        "computable": {
            "C": "(eps * A) / d",
            "eps": "(C * d) / A",
            "A": "(C * d) / eps",
            "d": "(eps * A) / C"
        },
        "variables": {
            "C": {
                "name": "Capacitância geométrica (C)",
                "si_unit": "F"
            },
            "eps": {
                "name": "Permissividade do meio dielétrico (ε)",
                "si_unit": "F/m"
            },
            "A": {
                "name": "Área de cada placa (A)",
                "si_unit": "m^2"
            },
            "d": {
                "name": "Distância de separação entre as armaduras (d)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "d > 0",
            "A > 0"
        ],
        "description": "Capacitância de placas condutoras paralelas planas separadas por um meio dielétrico de espessura d."
    },
    {
        "id": "capacitor_energy_cu2",
        "name": "Energia em Capacitor (E = ½ C·U²)",
        "category": "Física: Eletricidade",
        "latex": "E_C = \\frac{1}{2} C \\cdot U^2",
        "latex_rearranged": {
            "EC": "E_C = \\frac{1}{2} C \\cdot U^2",
            "C": "C = \\frac{2 \\cdot E_C}{U^2}",
            "U": "U = \\sqrt{\\frac{2 \\cdot E_C}{C}}"
        },
        "computable": {
            "EC": "0.5 * C * (U^2)",
            "C": "(2 * EC) / (U^2)",
            "U": "sqrt((2 * EC) / C)"
        },
        "variables": {
            "EC": {
                "name": "Energia eletrostática armazenada (E_C)",
                "si_unit": "J"
            },
            "C": {
                "name": "Capacitância (C)",
                "si_unit": "F"
            },
            "U": {
                "name": "Tensão elétrica (U)",
                "si_unit": "V"
            }
        },
        "constraints": [
            "C > 0"
        ],
        "description": "Energia acumulada no campo elétrico entre as armaduras do capacitor carregado."
    },
    {
        "id": "capacitor_energy_qu",
        "name": "Energia em Capacitor (E = ½ Q·U)",
        "category": "Física: Eletricidade",
        "latex": "E_C = \\frac{1}{2} Q \\cdot U",
        "latex_rearranged": {
            "EC": "E_C = \\frac{1}{2} Q \\cdot U",
            "Q": "Q = \\frac{2 \\cdot E_C}{U}",
            "U": "U = \\frac{2 \\cdot E_C}{Q}"
        },
        "computable": {
            "EC": "0.5 * Q * U",
            "Q": "(2 * EC) / U",
            "U": "(2 * EC) / Q"
        },
        "variables": {
            "EC": {
                "name": "Energia acumulada (E_C)",
                "si_unit": "J"
            },
            "Q": {
                "name": "Carga total armazenada (Q)",
                "si_unit": "C"
            },
            "U": {
                "name": "Tensão nos terminais (U)",
                "si_unit": "V"
            }
        },
        "description": "Energia calculada a partir da área do gráfico triangular carga versus tensão."
    },
    {
        "id": "capacitor_energy_q2c",
        "name": "Energia em Capacitor (E = ½ Q²/C)",
        "category": "Física: Eletricidade",
        "latex": "E_C = \\frac{Q^2}{2 \\cdot C}",
        "latex_rearranged": {
            "EC": "E_C = \\frac{Q^2}{2 \\cdot C}",
            "Q": "Q = \\sqrt{2 \\cdot E_C \\cdot C}",
            "C": "C = \\frac{Q^2}{2 \\cdot E_C}"
        },
        "computable": {
            "EC": "(Q^2) / (2 * C)",
            "Q": "sqrt(2 * EC * C)",
            "C": "(Q^2) / (2 * EC)"
        },
        "variables": {
            "EC": {
                "name": "Energia acumulada (E_C)",
                "si_unit": "J"
            },
            "Q": {
                "name": "Carga (Q)",
                "si_unit": "C"
            },
            "C": {
                "name": "Capacitância (C)",
                "si_unit": "F"
            }
        },
        "constraints": [
            "C > 0"
        ],
        "description": "Energia armazenada expressa em termos da carga constante em circuito isolado."
    },
    {
        "id": "capacitors_parallel",
        "name": "Associação de Capacitores em Paralelo",
        "category": "Física: Eletricidade",
        "type": "DYNAMIC_LIST",
        "listVariable": "C_list",
        "itemFields": [
            "C"
        ],
        "targetVariable": "Ceq",
        "latex": "C_{eq} = C_1 + C_2 + \\dots + C_n",
        "latex_rearranged": {
            "Ceq": "C_{eq} = \\sum_{i=1}^n C_i"
        },
        "computable": {
            "Ceq": "sum(C_list)"
        },
        "variables": {
            "Ceq": {
                "name": "Capacitância equivalente (C_eq)",
                "si_unit": "F"
            },
            "C_list": {
                "name": "Capacitores em paralelo (C_i)",
                "si_unit": "F"
            }
        },
        "description": "Em paralelo, as cargas somam-se sob a mesma tensão, aumentando a capacitância equivalente."
    },
    {
        "id": "capacitors_series",
        "name": "Associação de Capacitores em Série",
        "category": "Física: Eletricidade",
        "type": "DYNAMIC_LIST",
        "listVariable": "C_list",
        "itemFields": [
            "C"
        ],
        "targetVariable": "Ceq",
        "latex": "\\frac{1}{C_{eq}} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\dots + \\frac{1}{C_n}",
        "latex_rearranged": {
            "Ceq": "C_{eq} = \\left(\\sum_{i=1}^n \\frac{1}{C_i}\\right)^{-1}"
        },
        "computable": {
            "Ceq": "1 / sum_inv(C_list)"
        },
        "variables": {
            "Ceq": {
                "name": "Capacitância equivalente (C_eq)",
                "si_unit": "F"
            },
            "C_list": {
                "name": "Capacitores em série (C_i)",
                "si_unit": "F"
            }
        },
        "description": "Em série, a tensão total divide-se enquanto a carga em cada capacitor é a mesma."
    },
    {
        "id": "generator_terminal_voltage",
        "name": "Equação do Gerador Elétrico Real",
        "category": "Física: Eletricidade",
        "latex": "U = \\mathcal{E} - I \\cdot r_i",
        "latex_rearranged": {
            "U": "U = \\mathcal{E} - I \\cdot r_i",
            "E_emf": "\\mathcal{E} = U + I \\cdot r_i",
            "I": "I = \\frac{\\mathcal{E} - U}{r_i}",
            "ri": "r_i = \\frac{\\mathcal{E} - U}{I}"
        },
        "computable": {
            "U": "E_emf - I * ri",
            "E_emf": "U + I * ri",
            "I": "(E_emf - U) / ri",
            "ri": "(E_emf - U) / I"
        },
        "variables": {
            "U": {
                "name": "Tensão nos terminais úteis (U)",
                "si_unit": "V"
            },
            "E_emf": {
                "name": "Força eletromotriz nominal (ℰ)",
                "si_unit": "V"
            },
            "I": {
                "name": "Corrente fornecida pelo gerador (I)",
                "si_unit": "A"
            },
            "ri": {
                "name": "Resistência interna do gerador (r_i)",
                "si_unit": "Ω"
            }
        },
        "constraints": [
            "ri >= 0"
        ],
        "description": "Queda na tensão terminal externa devido às perdas resistivas internas do gerador."
    },
    {
        "id": "pouillet_law",
        "name": "Lei de Pouillet (Circuito Simples)",
        "category": "Física: Eletricidade",
        "latex": "I = \\frac{\\mathcal{E}}{R + r_i}",
        "latex_rearranged": {
            "I": "I = \\frac{\\mathcal{E}}{R + r_i}",
            "E_emf": "\\mathcal{E} = I(R + r_i)",
            "R": "R = \\frac{\\mathcal{E}}{I} - r_i",
            "ri": "r_i = \\frac{\\mathcal{E}}{I} - R"
        },
        "computable": {
            "I": "E_emf / (R + ri)",
            "E_emf": "I * (R + ri)",
            "R": "(E_emf / I) - ri",
            "ri": "(E_emf / I) - R"
        },
        "variables": {
            "I": {
                "name": "Corrente no circuito (I)",
                "si_unit": "A"
            },
            "E_emf": {
                "name": "Força eletromotriz total (ℰ)",
                "si_unit": "V"
            },
            "R": {
                "name": "Resistência externa de carga (R)",
                "si_unit": "Ω"
            },
            "ri": {
                "name": "Resistência interna da fonte (r_i)",
                "si_unit": "Ω"
            }
        },
        "constraints": [
            "R + ri > 0"
        ],
        "description": "Intensidade da corrente elétrica em uma malha contendo um gerador e resistores de carga."
    },
    {
        "id": "magnetic_force_charge",
        "name": "Força Magnética sobre Carga Móvel (Lorentz)",
        "category": "Física: Eletromagnetismo",
        "latex": "F_m = |q| \\cdot v \\cdot B \\cdot \\sin\\theta",
        "latex_rearranged": {
            "Fm": "F_m = |q| \\cdot v \\cdot B \\cdot \\sin\\theta",
            "B": "B = \\frac{F_m}{|q| \\cdot v \\cdot \\sin\\theta}",
            "v": "v = \\frac{F_m}{|q| \\cdot B \\cdot \\sin\\theta}",
            "theta": "\\theta = \\arcsin\\left(\\frac{F_m}{|q| \\cdot v \\cdot B}\\right)"
        },
        "computable": {
            "Fm": "abs(q) * v * B * sin(theta)",
            "B": "Fm / (abs(q) * v * sin(theta))",
            "v": "Fm / (abs(q) * B * sin(theta))",
            "theta": "asin(Fm / (abs(q) * v * B))"
        },
        "variables": {
            "Fm": {
                "name": "Módulo da força magnética (F_m)",
                "si_unit": "N"
            },
            "q": {
                "name": "Carga da partícula (q)",
                "si_unit": "C"
            },
            "v": {
                "name": "Velocidade da carga (v)",
                "si_unit": "m/s"
            },
            "B": {
                "name": "Campo magnético de indução (B)",
                "si_unit": "T"
            },
            "theta": {
                "name": "Ângulo entre velocidade e campo (θ)",
                "si_unit": "rad"
            }
        },
        "description": "Força defletora perpendicular tanto à velocidade quanto ao vetor de campo magnético."
    },
    {
        "id": "magnetic_force_wire",
        "name": "Força Magnética sobre Condutor Retilíneo",
        "category": "Física: Eletromagnetismo",
        "latex": "F_m = B \\cdot I \\cdot L \\cdot \\sin\\theta",
        "latex_rearranged": {
            "Fm": "F_m = B \\cdot I \\cdot L \\cdot \\sin\\theta",
            "B": "B = \\frac{F_m}{I \\cdot L \\cdot \\sin\\theta}",
            "I": "I = \\frac{F_m}{B \\cdot L \\cdot \\sin\\theta}",
            "L": "L = \\frac{F_m}{B \\cdot I \\cdot \\sin\\theta}"
        },
        "computable": {
            "Fm": "B * I * L * sin(theta)",
            "B": "Fm / (I * L * sin(theta))",
            "I": "Fm / (B * L * sin(theta))",
            "L": "Fm / (B * I * sin(theta))"
        },
        "variables": {
            "Fm": {
                "name": "Força magnética no fio (F_m)",
                "si_unit": "N"
            },
            "B": {
                "name": "Campo magnético externo (B)",
                "si_unit": "T"
            },
            "I": {
                "name": "Corrente elétrica contínua (I)",
                "si_unit": "A"
            },
            "L": {
                "name": "Comprimento imerso do condutor (L)",
                "si_unit": "m"
            },
            "theta": {
                "name": "Ângulo com as linhas de campo (θ)",
                "si_unit": "rad"
            }
        },
        "description": "Resultante macroscópica das forças magnéticas sobre os elétrons condutores em movimento no fio."
    },
    {
        "id": "magnetic_orbit_radius",
        "name": "Raio da Trajetória Circular de Carga em Campo B",
        "category": "Física: Eletromagnetismo",
        "latex": "r = \\frac{m \\cdot v}{|q| \\cdot B}",
        "latex_rearranged": {
            "r": "r = \\frac{m \\cdot v}{|q| \\cdot B}",
            "m": "m = \\frac{|q| \\cdot B \\cdot r}{v}",
            "v": "v = \\frac{|q| \\cdot B \\cdot r}{m}",
            "B": "B = \\frac{m \\cdot v}{|q| \\cdot r}"
        },
        "computable": {
            "r": "(m * v) / (abs(q) * B)",
            "m": "(abs(q) * B * r) / v",
            "v": "(abs(q) * B * r) / m",
            "B": "(m * v) / (abs(q) * r)"
        },
        "variables": {
            "r": {
                "name": "Raio ciclotrônico da hélice / círculo (r)",
                "si_unit": "m"
            },
            "m": {
                "name": "Massa da partícula (m)",
                "si_unit": "kg"
            },
            "v": {
                "name": "Velocidade perpendicular (v)",
                "si_unit": "m/s"
            },
            "q": {
                "name": "Carga da partícula (q)",
                "si_unit": "C"
            },
            "B": {
                "name": "Campo magnético uniforme (B)",
                "si_unit": "T"
            }
        },
        "constraints": [
            "m > 0",
            "B > 0"
        ],
        "description": "Equilíbrio entre a força centrípeta mecânica e a força magnética de deflexão de Lorentz."
    },
    {
        "id": "cyclotron_period",
        "name": "Período do Movimento Cíclotron",
        "category": "Física: Eletromagnetismo",
        "latex": "T = \\frac{2\\pi \\cdot m}{|q| \\cdot B}",
        "latex_rearranged": {
            "T": "T = \\frac{2\\pi \\cdot m}{|q| \\cdot B}",
            "m": "m = \\frac{|q| \\cdot B \\cdot T}{2\\pi}",
            "B": "B = \\frac{2\\pi \\cdot m}{|q| \\cdot T}"
        },
        "computable": {
            "T": "(2 * pi * m) / (abs(q) * B)",
            "m": "(abs(q) * B * T) / (2 * pi)",
            "B": "(2 * pi * m) / (abs(q) * T)"
        },
        "variables": {
            "T": {
                "name": "Período de revolução (T)",
                "si_unit": "s"
            },
            "m": {
                "name": "Massa (m)",
                "si_unit": "kg"
            },
            "q": {
                "name": "Carga elétrica (q)",
                "si_unit": "C"
            },
            "B": {
                "name": "Campo magnético (B)",
                "si_unit": "T"
            }
        },
        "constraints": [
            "m > 0",
            "B > 0"
        ],
        "description": "Tempo para efetuar uma rotação orbital completa; independe do raio e da velocidade escalar."
    },
    {
        "id": "cyclotron_frequency",
        "name": "Frequência de Cíclotron",
        "category": "Física: Eletromagnetismo",
        "latex": "f_c = \\frac{|q| \\cdot B}{2\\pi \\cdot m}",
        "latex_rearranged": {
            "fc": "f_c = \\frac{|q| \\cdot B}{2\\pi \\cdot m}",
            "B": "B = \\frac{2\\pi \\cdot m \\cdot f_c}{|q|}",
            "m": "m = \\frac{|q| \\cdot B}{2\\pi \\cdot f_c}"
        },
        "computable": {
            "fc": "(abs(q) * B) / (2 * pi * m)",
            "B": "(2 * pi * m * fc) / abs(q)",
            "m": "(abs(q) * B) / (2 * pi * fc)"
        },
        "variables": {
            "fc": {
                "name": "Frequência ciclotrônica (f_c)",
                "si_unit": "Hz"
            },
            "q": {
                "name": "Carga (q)",
                "si_unit": "C"
            },
            "B": {
                "name": "Campo magnético (B)",
                "si_unit": "T"
            },
            "m": {
                "name": "Massa (m)",
                "si_unit": "kg"
            }
        },
        "constraints": [
            "m > 0",
            "B > 0"
        ],
        "description": "Frequência de rotação da partícula carregada acelerada em campos magnéticos uniformes."
    },
    {
        "id": "magnetic_field_wire",
        "name": "Campo Magnético de Fio Retilíneo Longo (Biot-Savart)",
        "category": "Física: Eletromagnetismo",
        "latex": "B = \\frac{\\mu_0 \\cdot I}{2\\pi \\cdot r}",
        "latex_rearranged": {
            "B": "B = \\frac{\\mu_0 \\cdot I}{2\\pi \\cdot r}",
            "I": "I = \\frac{2\\pi \\cdot r \\cdot B}{\\mu_0}",
            "r": "r = \\frac{\\mu_0 \\cdot I}{2\\pi \\cdot B}"
        },
        "computable": {
            "B": "(mu0 * I) / (2 * pi * r)",
            "I": "(2 * pi * r * B) / mu0",
            "r": "(mu0 * I) / (2 * pi * B)"
        },
        "variables": {
            "B": {
                "name": "Módulo do campo magnético (B)",
                "si_unit": "T"
            },
            "mu0": {
                "name": "Permeabilidade magnética do vácuo (μ_0 = 4π×10⁻⁷)",
                "si_unit": "T·m/A"
            },
            "I": {
                "name": "Corrente elétrica conduzida (I)",
                "si_unit": "A"
            },
            "r": {
                "name": "Distância radial perpendicular ao eixo do fio (r)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "r > 0"
        ],
        "description": "Linhas circulares concêntricas de indução magnética geradas por uma corrente contínua retilínea."
    },
    {
        "id": "magnetic_field_circular_loop",
        "name": "Campo no Centro de Espira Circular",
        "category": "Física: Eletromagnetismo",
        "latex": "B = \\frac{\\mu_0 \\cdot I}{2 \\cdot R_e}",
        "latex_rearranged": {
            "B": "B = \\frac{\\mu_0 \\cdot I}{2 \\cdot R_e}",
            "I": "I = \\frac{2 \\cdot R_e \\cdot B}{\\mu_0}",
            "Re": "R_e = \\frac{\\mu_0 \\cdot I}{2 \\cdot B}"
        },
        "computable": {
            "B": "(mu0 * I) / (2 * Re)",
            "I": "(2 * Re * B) / mu0",
            "Re": "(mu0 * I) / (2 * B)"
        },
        "variables": {
            "B": {
                "name": "Campo magnético central (B)",
                "si_unit": "T"
            },
            "mu0": {
                "name": "Permeabilidade μ_0",
                "si_unit": "T·m/A"
            },
            "I": {
                "name": "Corrente circulante (I)",
                "si_unit": "A"
            },
            "Re": {
                "name": "Raio geométrico da espira (R_e)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "Re > 0"
        ],
        "description": "Intensidade do campo magnético estático perpendicular ao plano da espira no seu ponto central."
    },
    {
        "id": "magnetic_field_coil",
        "name": "Campo no Centro de Bobina Chata",
        "category": "Física: Eletromagnetismo",
        "latex": "B = \\frac{\\mu_0 \\cdot N_e \\cdot I}{2 \\cdot R_e}",
        "latex_rearranged": {
            "B": "B = \\frac{\\mu_0 \\cdot N_e \\cdot I}{2 \\cdot R_e}",
            "I": "I = \\frac{2 \\cdot R_e \\cdot B}{\\mu_0 \\cdot N_e}",
            "Ne": "N_e = \\frac{2 \\cdot R_e \\cdot B}{\\mu_0 \\cdot I}"
        },
        "computable": {
            "B": "(mu0 * Ne * I) / (2 * Re)",
            "I": "(2 * Re * B) / (mu0 * Ne)",
            "Ne": "(2 * Re * B) / (mu0 * I)"
        },
        "variables": {
            "B": {
                "name": "Campo magnético no centro (B)",
                "si_unit": "T"
            },
            "mu0": {
                "name": "Permeabilidade μ_0",
                "si_unit": "T·m/A"
            },
            "Ne": {
                "name": "Número de espiras justapostas (N_e)",
                "si_unit": ""
            },
            "I": {
                "name": "Corrente elétrica (I)",
                "si_unit": "A"
            },
            "Re": {
                "name": "Raio médio da bobina (R_e)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "Re > 0",
            "Ne >= 1"
        ],
        "description": "Soma vetorial dos campos individuais de N espiras circulares concentradas."
    },
    {
        "id": "magnetic_field_solenoid",
        "name": "Campo Magnético no Interior de Solenoide Longo",
        "category": "Física: Eletromagnetismo",
        "latex": "B = \\mu_0 \\cdot n_e \\cdot I",
        "latex_rearranged": {
            "B": "B = \\mu_0 \\cdot n_e \\cdot I",
            "ne": "n_e = \\frac{B}{\\mu_0 \\cdot I}",
            "I": "I = \\frac{B}{\\mu_0 \\cdot n_e}"
        },
        "computable": {
            "B": "mu0 * ne * I",
            "ne": "B / (mu0 * I)",
            "I": "B / (mu0 * ne)"
        },
        "variables": {
            "B": {
                "name": "Campo magnético interno uniforme (B)",
                "si_unit": "T"
            },
            "mu0": {
                "name": "Permeabilidade μ_0",
                "si_unit": "T·m/A"
            },
            "ne": {
                "name": "Densidade linear de espiras (n_e = N / L)",
                "si_unit": "espiras/m"
            },
            "I": {
                "name": "Corrente elétrica no solenoide (I)",
                "si_unit": "A"
            }
        },
        "constraints": [
            "ne > 0"
        ],
        "description": "Campo magnético axial altamente uniforme e confinado no núcleo de uma bobina helicoidal longa."
    },
    {
        "id": "magnetic_flux",
        "name": "Fluxo Magnético Através de uma Superfície",
        "category": "Física: Eletromagnetismo",
        "latex": "\\Phi_B = B \\cdot A \\cdot \\cos\\theta",
        "latex_rearranged": {
            "phiB": "\\Phi_B = B \\cdot A \\cdot \\cos\\theta",
            "B": "B = \\frac{\\Phi_B}{A \\cdot \\cos\\theta}",
            "A": "A = \\frac{\\Phi_B}{B \\cdot \\cos\\theta}",
            "theta": "\\theta = \\arccos\\left(\\frac{\\Phi_B}{B \\cdot A}\\right)"
        },
        "computable": {
            "phiB": "B * A * cos(theta)",
            "B": "phiB / (A * cos(theta))",
            "A": "phiB / (B * cos(theta))",
            "theta": "acos(phiB / (B * A))"
        },
        "variables": {
            "phiB": {
                "name": "Fluxo magnético (Φ_B)",
                "si_unit": "Wb"
            },
            "B": {
                "name": "Indução magnética (B)",
                "si_unit": "T"
            },
            "A": {
                "name": "Área da superfície de contorno (A)",
                "si_unit": "m^2"
            },
            "theta": {
                "name": "Ângulo com o vetor normal à área (θ)",
                "si_unit": "rad"
            }
        },
        "description": "Quantidade de linhas de indução de campo magnético que atravessam uma dada área orientada."
    },
    {
        "id": "faraday_law_average",
        "name": "Lei da Indução de Faraday-Neumann",
        "category": "Física: Eletromagnetismo",
        "latex": "\\mathcal{E}_{\\text{méd}} = -N_e \\cdot \\frac{\\Delta \\Phi_B}{\\Delta t}",
        "latex_rearranged": {
            "E_emf": "\\mathcal{E}_{\\text{méd}} = -N_e \\frac{\\Delta \\Phi_B}{\\Delta t}",
            "dphiB": "\\Delta \\Phi_B = -\\frac{\\mathcal{E}_{\\text{méd}} \\cdot \\Delta t}{N_e}",
            "dt": "\\Delta t = -\\frac{N_e \\cdot \\Delta \\Phi_B}{\\mathcal{E}_{\\text{méd}}}"
        },
        "computable": {
            "E_emf": "-(Ne * dphiB) / dt",
            "dphiB": "-(E_emf * dt) / Ne",
            "dt": "-(Ne * dphiB) / E_emf"
        },
        "variables": {
            "E_emf": {
                "name": "Força eletromotriz induzida (ℰ)",
                "si_unit": "V"
            },
            "Ne": {
                "name": "Número de espiras do circuito indutor (N_e)",
                "si_unit": ""
            },
            "dphiB": {
                "name": "Variação do fluxo magnético (ΔΦ_B)",
                "si_unit": "Wb"
            },
            "dt": {
                "name": "Intervalo de tempo de variação (Δt)",
                "si_unit": "s"
            }
        },
        "constraints": [
            "dt > 0",
            "Ne >= 1"
        ],
        "description": "Geração de força eletromotriz por variação temporal de fluxo magnético (sinal negativo: Lei de Lenz)."
    },
    {
        "id": "motional_emf",
        "name": "Força Eletromotriz Cinética (Barra Móvel)",
        "category": "Física: Eletromagnetismo",
        "latex": "|\\mathcal{E}| = B \\cdot L \\cdot v",
        "latex_rearranged": {
            "E_emf": "|\\mathcal{E}| = B \\cdot L \\cdot v",
            "B": "B = \\frac{|\\mathcal{E}|}{L \\cdot v}",
            "L": "L = \\frac{|\\mathcal{E}|}{B \\cdot v}",
            "v": "v = \\frac{|\\mathcal{E}|}{B \\cdot L}"
        },
        "computable": {
            "E_emf": "B * L * v",
            "B": "E_emf / (L * v)",
            "L": "E_emf / (B * v)",
            "v": "E_emf / (B * L)"
        },
        "variables": {
            "E_emf": {
                "name": "Módulo da FEM induzida por movimento (ℰ)",
                "si_unit": "V"
            },
            "B": {
                "name": "Campo magnético perpendicular (B)",
                "si_unit": "T"
            },
            "L": {
                "name": "Comprimento da haste condutora (L)",
                "si_unit": "m"
            },
            "v": {
                "name": "Velocidade de translação da barra (v)",
                "si_unit": "m/s"
            }
        },
        "description": "Indução eletromagnética decorrente da força magnética que separa cargas em um condutor em movimento."
    },
    {
        "id": "induced_current",
        "name": "Corrente Induzida em Circuito Fechado",
        "category": "Física: Eletromagnetismo",
        "latex": "I = \\frac{|\\mathcal{E}|}{R}",
        "latex_rearranged": {
            "I": "I = \\frac{|\\mathcal{E}|}{R}",
            "E_emf": "|\\mathcal{E}| = R \\cdot I",
            "R": "R = \\frac{|\\mathcal{E}|}{I}"
        },
        "computable": {
            "I": "E_emf / R",
            "E_emf": "R * I",
            "R": "E_emf / I"
        },
        "variables": {
            "I": {
                "name": "Corrente induzida circulante (I)",
                "si_unit": "A"
            },
            "E_emf": {
                "name": "Força eletromotriz induzida (ℰ)",
                "si_unit": "V"
            },
            "R": {
                "name": "Resistência total da malha (R)",
                "si_unit": "Ω"
            }
        },
        "constraints": [
            "R > 0"
        ],
        "description": "Aplicação da lei de Ohm à força eletromotriz gerada por indução eletromagnética."
    },
    {
        "id": "inductor_energy",
        "name": "Energia Armazenada em Indutor",
        "category": "Física: Eletromagnetismo",
        "latex": "E_L = \\frac{1}{2} L_i \\cdot I^2",
        "latex_rearranged": {
            "EL": "E_L = \\frac{1}{2} L_i \\cdot I^2",
            "Li": "L_i = \\frac{2 \\cdot E_L}{I^2}",
            "I": "I = \\sqrt{\\frac{2 \\cdot E_L}{L_i}}"
        },
        "computable": {
            "EL": "0.5 * Li * (I^2)",
            "Li": "(2 * EL) / (I^2)",
            "I": "sqrt((2 * EL) / Li)"
        },
        "variables": {
            "EL": {
                "name": "Energia magnética armazenada (E_L)",
                "si_unit": "J"
            },
            "Li": {
                "name": "Autoindutância do enrolamento (L_i)",
                "si_unit": "H"
            },
            "I": {
                "name": "Corrente que atravessa o indutor (I)",
                "si_unit": "A"
            }
        },
        "constraints": [
            "Li > 0"
        ],
        "description": "Energia potencial magnética contida no campo induzido ao redor do condutor percorrido por corrente."
    },
    {
        "id": "transformer_voltages_turns",
        "name": "Transformador Ideal — Relação de Tensões",
        "category": "Física: Eletromagnetismo",
        "latex": "\\frac{U_p}{U_s} = \\frac{N_p}{N_s}",
        "latex_rearranged": {
            "Up": "U_p = U_s \\cdot \\frac{N_p}{N_s}",
            "Us": "U_s = U_p \\cdot \\frac{N_s}{N_p}",
            "Np": "N_p = N_s \\cdot \\frac{U_p}{U_s}",
            "Ns": "N_s = N_p \\cdot \\frac{U_s}{U_p}"
        },
        "computable": {
            "Up": "Us * (Np / Ns)",
            "Us": "Up * (Ns / Np)",
            "Np": "Ns * (Up / Us)",
            "Ns": "Np * (Us / Up)"
        },
        "variables": {
            "Up": {
                "name": "Tensão no enrolamento primário (U_p)",
                "si_unit": "V"
            },
            "Us": {
                "name": "Tensão induzida no secundário (U_s)",
                "si_unit": "V"
            },
            "Np": {
                "name": "Número de espiras do primário (N_p)",
                "si_unit": ""
            },
            "Ns": {
                "name": "Número de espiras do secundário (N_s)",
                "si_unit": ""
            }
        },
        "constraints": [
            "Ns > 0",
            "Np > 0"
        ],
        "description": "Relação de transformação de tensão alternada diretamente proporcional ao número de espiras."
    },
    {
        "id": "transformer_currents_turns",
        "name": "Transformador Ideal — Relação de Correntes",
        "category": "Física: Eletromagnetismo",
        "latex": "\\frac{I_p}{I_s} = \\frac{N_s}{N_p}",
        "latex_rearranged": {
            "Ip": "I_p = I_s \\cdot \\frac{N_s}{N_p}",
            "Is": "I_s = I_p \\cdot \\frac{N_p}{N_s}",
            "Np": "N_p = N_s \\cdot \\frac{I_s}{I_p}",
            "Ns": "N_s = N_p \\cdot \\frac{I_p}{I_s}"
        },
        "computable": {
            "Ip": "Is * (Ns / Np)",
            "Is": "Ip * (Np / Ns)",
            "Np": "Ns * (Is / Ip)",
            "Ns": "Np * (Ip / Is)"
        },
        "variables": {
            "Ip": {
                "name": "Corrente no enrolamento primário (I_p)",
                "si_unit": "A"
            },
            "Is": {
                "name": "Corrente no secundário (I_s)",
                "si_unit": "A"
            },
            "Np": {
                "name": "Espiras do primário (N_p)",
                "si_unit": ""
            },
            "Ns": {
                "name": "Espiras do secundário (N_s)",
                "si_unit": ""
            }
        },
        "constraints": [
            "Np > 0",
            "Ns > 0"
        ],
        "description": "Inversão proporcional das correntes elétricas garantindo conservação de potência no transformador."
    },
    {
        "id": "transformer_power_ideal",
        "name": "Transformador Ideal — Conservação de Potência",
        "category": "Física: Eletromagnetismo",
        "latex": "U_p \\cdot I_p = U_s \\cdot I_s",
        "latex_rearranged": {
            "Up": "U_p = \\frac{U_s \\cdot I_s}{I_p}",
            "Ip": "I_p = \\frac{U_s \\cdot I_s}{U_p}",
            "Us": "U_s = \\frac{U_p \\cdot I_p}{I_s}",
            "Is": "I_s = \\frac{U_p \\cdot I_p}{U_s}"
        },
        "computable": {
            "Up": "(Us * Is) / Ip",
            "Ip": "(Us * Is) / Up",
            "Us": "(Up * Ip) / Is",
            "Is": "(Up * Ip) / Us"
        },
        "variables": {
            "Up": {
                "name": "Tensão no primário (U_p)",
                "si_unit": "V"
            },
            "Ip": {
                "name": "Corrente no primário (I_p)",
                "si_unit": "A"
            },
            "Us": {
                "name": "Tensão no secundário (U_s)",
                "si_unit": "V"
            },
            "Is": {
                "name": "Corrente no secundário (I_s)",
                "si_unit": "A"
            }
        },
        "description": "Potência aparente constante em transformadores com 100% de rendimento sem perdas no núcleo."
    },
    {
        "id": "photon_energy_planck",
        "name": "Energia do Fóton (Hipótese de Planck)",
        "category": "Física: Eletromagnetismo",
        "latex": "E = h \\cdot f",
        "latex_rearranged": {
            "E": "E = h \\cdot f",
            "f": "f = \\frac{E}{h}"
        },
        "computable": {
            "E": "h * f",
            "f": "E / h"
        },
        "variables": {
            "E": {
                "name": "Energia do quantum de luz / fóton (E)",
                "si_unit": "J"
            },
            "h": {
                "name": "Constante de Planck (h ≈ 6,626×10⁻³⁴)",
                "si_unit": "J·s"
            },
            "f": {
                "name": "Frequência da radiação eletromagnética (f)",
                "si_unit": "Hz"
            }
        },
        "constraints": [
            "f > 0"
        ],
        "description": "Quantização da energia luminosa proporcional à frequência da onda eletromagnética."
    },
    {
        "id": "photon_energy_wavelength",
        "name": "Energia do Fóton por Comprimento de Onda",
        "category": "Física: Eletromagnetismo",
        "latex": "E = \\frac{h \\cdot c}{\\lambda}",
        "latex_rearranged": {
            "E": "E = \\frac{h \\cdot c}{\\lambda}",
            "lambda": "\\lambda = \\frac{h \\cdot c}{E}"
        },
        "computable": {
            "E": "(h * c) / lambda",
            "lambda": "(h * c) / E"
        },
        "variables": {
            "E": {
                "name": "Energia do fóton (E)",
                "si_unit": "J"
            },
            "h": {
                "name": "Constante de Planck (h)",
                "si_unit": "J·s"
            },
            "c": {
                "name": "Velocidade da luz (c)",
                "si_unit": "m/s"
            },
            "lambda": {
                "name": "Comprimento de onda no vácuo (λ)",
                "si_unit": "m"
            }
        },
        "constraints": [
            "lambda > 0"
        ],
        "description": "Energia dos quanta de luz inversamente proporcional ao seu comprimento de onda espacial."
    },
    {
        "id": "einstein_mass_energy",
        "name": "Equivalência Massa-Energia de Einstein",
        "category": "Física: Dinâmica",
        "latex": "E = m \\cdot c^2",
        "latex_rearranged": {
            "E": "E = m \\cdot c^2",
            "m": "m = \\frac{E}{c^2}"
        },
        "computable": {
            "E": "m * (c^2)",
            "m": "E / (c^2)"
        },
        "variables": {
            "E": {
                "name": "Energia de repouso intrínseca (E)",
                "si_unit": "J"
            },
            "m": {
                "name": "Massa de repouso da partícula (m)",
                "si_unit": "kg"
            },
            "c": {
                "name": "Velocidade da luz no vácuo (c = 3×10⁸)",
                "si_unit": "m/s"
            }
        },
        "constraints": [
            "m >= 0"
        ],
        "description": "Relação fundamental da Relatividade Especial unindo massa inercial e energia em repouso."
    },
    {
        "id": "de_broglie_wavelength",
        "name": "Comprimento de Onda de de Broglie",
        "category": "Física: Ondas",
        "latex": "\\lambda = \\frac{h}{m \\cdot v}",
        "latex_rearranged": {
            "lambda": "\\lambda = \\frac{h}{m \\cdot v}",
            "m": "m = \\frac{h}{\\lambda \\cdot v}",
            "v": "v = \\frac{h}{m \\cdot \\lambda}"
        },
        "computable": {
            "lambda": "h / (m * v)",
            "m": "h / (lambda * v)",
            "v": "h / (m * lambda)"
        },
        "variables": {
            "lambda": {
                "name": "Comprimento de onda da matéria (λ)",
                "si_unit": "m"
            },
            "h": {
                "name": "Constante de Planck (h)",
                "si_unit": "J·s"
            },
            "m": {
                "name": "Massa da partícula corpuscular (m)",
                "si_unit": "kg"
            },
            "v": {
                "name": "Velocidade (v)",
                "si_unit": "m/s"
            }
        },
        "constraints": [
            "m > 0",
            "v > 0"
        ],
        "description": "Dualidade onda-partícula associando um comprimento de onda característico a qualquer partícula em movimento."
    }
];

if (typeof engine !== 'undefined') {
    engine.registerCatalog(physicsCatalog);
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { physicsCatalog, physicsConstants };
}
