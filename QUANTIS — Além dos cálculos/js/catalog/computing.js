// computing.js

const computingCatalog = [
    {
        id: "transmission_time",
        name: "Tempo de Transmissão",
        category: "Computação: Redes",
        latex: "t = \\frac{S}{R}",
        computable: {
            "t": "S / R",
            "S": "t * R",
            "R": "S / t"
        },
        variables: {
            "t": { name: "Tempo", si_unit: "s" },
            "S": { name: "Tamanho dos Dados", si_unit: "bit" },
            "R": { name: "Taxa de Transferência", si_unit: "bit/s" }
        },
        constraints: ["R > 0"]
    },
    {
        id: "image_megapixels",
        name: "Megapixels de Imagem",
        category: "Computação: Mídia",
        latex: "MP = \\frac{W \\times H}{10^6}",
        computable: {
            "MP": "(W * H) / 1000000",
            "W": "(MP * 1000000) / H",
            "H": "(MP * 1000000) / W"
        },
        variables: {
            "MP": { name: "Megapixels", si_unit: "MP" },
            "W": { name: "Largura (Pixels)", si_unit: "px" },
            "H": { name: "Altura (Pixels)", si_unit: "px" }
        },
        constraints: ["W > 0", "H > 0"]
    },
    {
        id: "total_frames",
        name: "Frames Totais de Vídeo",
        category: "Computação: Mídia",
        latex: "N_f = FPS \\times t",
        computable: {
            "Nf": "FPS * t",
            "FPS": "Nf / t",
            "t": "Nf / FPS"
        },
        variables: {
            "Nf": { name: "Número de Frames", si_unit: "frames" },
            "FPS": { name: "Frames por Segundo", si_unit: "fps" },
            "t": { name: "Tempo (Duração)", si_unit: "s" }
        },
        constraints: ["t > 0", "FPS > 0"]
    }
];

if (typeof engine !== 'undefined') {
    engine.registerCatalog(computingCatalog);
}
