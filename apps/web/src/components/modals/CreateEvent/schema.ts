import z from 'zod'

/*
    Step 1
*/

// if include duration is true then duration is required
export const createEventStepOneSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    location: z.string().optional(),
    startDate: z.date().min(new Date()),
    includeDuration: z.boolean().optional(),
    endDate: z.date().optional(),
    link: z.string().url().optional().or(z.literal('')),
    timezoneUTCOffset: z.number()
  })
  .refine(
    // end date is required if include duration is true and should be after start date
    (data) => {
      if (data.includeDuration && !data.endDate) {
        return false
      }

      if (data.endDate && data.endDate < data.startDate) {
        return false
      }

      return true
    },
    {
      message: 'End date should be after start date',
      path: ['endDate'],
      params: {
        includeDuration: 'includeDuration'
      }
    }
  )
  .refine(
    // either link or location is required
    (data) => {
      if (data.link || data.location) {
        return true
      }

      return false
    },
    {
      message: 'Either link or location is required',
      path: ['location']
    }
  )

export type CreateEventStepOneSchema = z.infer<typeof createEventStepOneSchema>

/*
    Step 2
*/

export enum Pricing {
  FREE = 'free',
  PAID = 'paid'
}

export enum Currency {
  GBP = 'GBP',
  EUR = 'EUR',
  USD = 'USD',
  BRL = 'BRL'
}

export const MAP_CURRENCY_TO_SYMBOL: Record<Currency, string> = {
  [Currency.GBP]: '£',
  [Currency.EUR]: '€',
  [Currency.USD]: '$',
  [Currency.BRL]: 'R$'
}

const stepTwoPaidSchema = z.object({
  pricing: z.literal(Pricing.PAID),
  price: z.coerce.number().min(0),
  currency: z.nativeEnum(Currency),
  absorbFees: z.boolean().optional()
})

const stepTwoFreeSchema = z.object({
  pricing: z.literal(Pricing.FREE)
})

export const stepTwoSchema = z.discriminatedUnion('pricing', [
  stepTwoPaidSchema,
  stepTwoFreeSchema
])

export type StepTwoSchema = z.infer<typeof stepTwoSchema>
