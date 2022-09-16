interface Currency {
    code: string,
    symbol: string,
    rate: string,
    description: string,
    rate_float: number
}

export interface APIResponse {
    time: {
        updated: string,
        updatedISO: string,
        updateduk: string
    },
    declaimer: string,
    chartName: string,
    bpi: {
        USD: Currency,
        GBP: Currency,
        EUR: Currency
    }
}