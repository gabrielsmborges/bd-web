// =============================================================================
// IMPORTS
// =============================================================================

import { formatCurrency, formatPercentage } from '@/util/number'

// =============================================================================
// TYPES
// =============================================================================

interface UseFeeParams {
  price: number
  currency: string
  absorbFees?: boolean
}

interface UseFeeReturn {
  serviceFeeText: string
  processingFeeText: string
  ticketPrice: string
  ticketServiceFee: string
  ticketProcessingFee: string
  ticketCostToBuyer: string
  ticketPayout: string
}

// =============================================================================
// CONSTANTS
// =============================================================================

const SERVICE_FEE_PRICE = 1.79
const SERVICE_FEE_PERCENTAGE = 0.03
const PROCESSING_FEE_PERCENTAGE = 0.029

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Formats a currency value with proper formatting
 */
const formatCurrencyValue = (value: number, currency: string): string => {
  if (!value || !currency) return '-'

  return formatCurrency(value, {
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

/**
 * Calculates the service fee for a given price
 */
const calculateServiceFee = (price: number): number => {
  return price ? SERVICE_FEE_PRICE + SERVICE_FEE_PERCENTAGE * price : 0
}

/**
 * Calculates the processing fee for a given price
 */
const calculateProcessingFee = (price: number): number => {
  return price ? PROCESSING_FEE_PERCENTAGE * price : 0
}

// =============================================================================
// MAIN HOOK
// =============================================================================

/**
 * Custom hook to calculate fees and pricing breakdown for event tickets
 *
 * @param price - The base ticket price
 * @param currency - The currency code (e.g., 'GBP', 'USD')
 * @param absorbFees - Whether the organizer absorbs the fees (affects final pricing)
 *
 * @returns Object containing formatted pricing breakdown
 */
export const useFee = ({
  price,
  currency,
  absorbFees
}: UseFeeParams): UseFeeReturn => {
  // ===========================================================================
  // FEE CALCULATIONS
  // ===========================================================================

  const serviceFeeTotal = calculateServiceFee(price)
  const processingFeeTotal = calculateProcessingFee(price)

  // ===========================================================================
  // FINAL PRICING CALCULATIONS
  // ===========================================================================

  // When fees are absorbed, the final price (with fees) is the same as the base price
  const costToBuyer = absorbFees
    ? price
    : price + serviceFeeTotal + processingFeeTotal

  const payout = absorbFees
    ? price - serviceFeeTotal - processingFeeTotal
    : price

  // ====
  // TEXT
  // ===========================================================================

  const serviceFeeText = `${formatPercentage(SERVICE_FEE_PERCENTAGE)} + ${formatCurrencyValue(SERVICE_FEE_PRICE, currency)}`
  const processingFeeText = `${formatPercentage(PROCESSING_FEE_PERCENTAGE)}`

  // ===========================================================================
  // FORMATTED VALUES
  // ===========================================================================

  const ticketPrice = formatCurrencyValue(price, currency)
  const ticketServiceFee = formatCurrencyValue(serviceFeeTotal, currency)
  const ticketProcessingFee = formatCurrencyValue(processingFeeTotal, currency)
  const ticketCostToBuyer = formatCurrencyValue(costToBuyer, currency)
  const ticketPayout = formatCurrencyValue(payout, currency)

  return {
    serviceFeeText,
    processingFeeText,
    ticketPrice,
    ticketServiceFee,
    ticketProcessingFee,
    ticketCostToBuyer,
    ticketPayout
  }
}
