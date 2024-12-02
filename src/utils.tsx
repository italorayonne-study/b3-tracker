import { Stocks } from "@/src/types";

export const calculateMean = (data: Stocks[]) => {
    const sum = data.reduce((acc, item) => acc + item.close, 0);
    return sum / data.length;
};

// Função para calcular o desvio padrão
export const calculateStdDev = (data: Stocks[], mean: number) => {
    const squaredDiffs = data.map(item => Math.pow(item.close - mean, 2));
    const avgSquaredDiff = squaredDiffs.reduce((acc, val) => acc + val, 0) / data.length;
    return Math.sqrt(avgSquaredDiff);
};

// Função para identificar os stocks destacados
export const highlightStocks = (stocks: Stocks[]) => {
    const mean = calculateMean(stocks);
    const stdDev = calculateStdDev(stocks, mean);
    const margin = 0.6; // Margem de 60%

    const upperLimit = mean + (stdDev * margin);
    const lowerLimit = mean - (stdDev * margin);

    // Filtra stocks que estão fora da faixa de 60% de variação
    return stocks.filter(stock => stock.close > upperLimit || stock.close < lowerLimit);
};