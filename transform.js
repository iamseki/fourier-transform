

const calculate = (timeranges, freq, terms) => {
    const doisSobrePI = 2 / Math.PI
    const omega = 2 * Math.PI * freq

    const calculateTerms = (time) => {
        let sum = 0
        for (let i = 0, variant = 1; i < terms; i++, variant += 2) {
            sum += doisSobrePI * (1 / variant * Math.sin(variant * omega * time))
        }
        return 0.5 + sum
    }

    const resultHash = new Map()
    for (let time of timeranges) {
        resultHash.set(time, calculateTerms(time))
    }

    return resultHash
}

const getData = (terms) => {
    const freq = 400
    const periodo = 0.0025

    const timeranges = []
    // amostra de pelo menos 10 periodos da forma de onda (ajuda na visualização)
    const amostra = 10 * periodo
    const roundToSix = (number) => Math.round(number * 1000000) / 1000000
    // valores de t deve variar de acordo com o período calculado 
    // gerando valores de t para calcular f(t) a cada 0.0001 segundo, com t inicial em 0.0015 segundos
    for (let t = 0.0015; t <= amostra; t += 0.0001) {
        timeranges.push(roundToSix(t))
    }

    // Retorna um HASH MAP onde:
    // KEY = valor de t
    // VALUE = valor de f(t)
    const calcHash = calculate(timeranges, freq, terms)

    const outputJson = []
    for (const [key, value] of calcHash.entries()) {
        outputJson.push({
            x: key,
            y: value
        })
    }

    return outputJson
}