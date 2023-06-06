interface FinancialInstrument {
    ticker: string;
    price: number;
    assetClass: string;
}

interface FinancialTableProps {
    data: FinancialInstrument[];
}

export type {
    FinancialInstrument,
    FinancialTableProps
}