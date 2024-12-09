export type Stocks = {
    stock: string;
    name: string;
    close: number;
    change: number;
    volume: number;
    market_cap: number;
    logo: string;
    sector: string;
    type: string;
}

export interface QuoteDatabase {
    id: string;
    stock: string
    name: string;
    logo: string
}