export const DASH: string = '—'

const getCurrencyMaximumFractionDigits = (value: number): number => {
    // Don't show decimal places if the value is a whole number
    if (value % 1 === 0) return 0
    // If the value is less than 1, show 4 decimal places (e.g. $0.0012)
    if (Math.abs(value) < 1) return 4
    if (Math.abs(value) >= 100_000_000) return 0
    return 2
}
const getCurrencyFormatOptions = (value: number, currency: string): Intl.NumberFormatOptions => ({
    style: 'currency',
    currency,
    notation: value >= 1_000_000_000 ? 'compact' : 'standard',
    maximumFractionDigits: getCurrencyMaximumFractionDigits(value)
})

export const currencySymbols: Record<string, string> = {
    GBP: '£',
    USD: '$',
    EUR: '€',
    CAD: 'CA$',
    AUD: 'A$',
    NZD: 'NZ$',
    CHF: 'CHF',
    JPY: '¥',
}

export const formatCurrency = (
    value?: number | null | string,
    additionalOptions?: Intl.NumberFormatOptions,
    removeCurrency?: boolean
): string => {
    const numberValue = typeof value === 'string' ? Number(value) : value
    if (numberValue == null || typeof numberValue !== 'number' || Number.isNaN(numberValue)) {
        return DASH
    }

    const res = Intl.NumberFormat('en', {
        ...getCurrencyFormatOptions(numberValue, additionalOptions?.currency ?? 'USD'),
        ...(additionalOptions ?? {})
    })
        .format(numberValue)

    if (removeCurrency) {
        return res.replace((currencySymbols as Record<string, string>)[additionalOptions?.currency ?? 'USD'], '')
    }

    return res
}