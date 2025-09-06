import { Pricing } from '@repo/api'
import z from 'zod'
import dayjs from 'dayjs'

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
    // time inputs are separate but validated with the date
    startTime: z.string().optional(),
    includeDuration: z.boolean().optional(),
    endDate: z.date().optional(),
    endTime: z.string().optional(),
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
  .superRefine((data, ctx) => {
    // Require startTime and validate combined start date/time is in the future
    if (!data.startTime || !/^([01]?\d|2[0-3]):[0-5]\d$/.test(data.startTime)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Start time is required and must be HH:mm',
        path: ['startDate']
      })
      return
    }

    const [sh, sm] = data.startTime.split(':').map((v) => parseInt(v, 10))
    const start = dayjs(data.startDate).set('hour', sh).set('minute', sm)
    if (start.isBefore(dayjs())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Start date/time must be in the future',
        path: ['startDate']
      })
    }

    if (data.includeDuration) {
      if (!data.endDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'End date is required',
          path: ['endDate']
        })
        return
      }

      if (!data.endTime || !/^([01]?\d|2[0-3]):[0-5]\d$/.test(data.endTime)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'End time is required and must be HH:mm',
          path: ['endDate']
        })
        return
      }

      const [eh, em] = data.endTime.split(':').map((v) => parseInt(v, 10))
      const end = dayjs(data.endDate).set('hour', eh).set('minute', em)

      if (!end.isAfter(start)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'End date/time must be after start',
          path: ['endDate']
        })
      }
    }
  })
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

export const createEventStepTwoSchema = z.discriminatedUnion('pricing', [
  stepTwoPaidSchema,
  stepTwoFreeSchema
])

export type CreateEventStepTwoSchema = z.infer<typeof createEventStepTwoSchema>

/*
    Step 3
*/

export enum SalesStart {
  NOW = 'now',
  LATER = 'later'
}

export enum SalesEnd {
  EVENT_START = 'event_start',
  SCHEDULE = 'schedule'
}

const salesStartSchemaNow = z.object({
  type: z.literal(SalesStart.NOW),
})

const salesStartSchemaLater = (startDate: Date) => z.object({
  type: z.literal(SalesStart.LATER),
  date: z.date().max(startDate).min(new Date()),
})

const salesEndSchemaEventStart = z.object({
  type: z.literal(SalesEnd.EVENT_START),
})

const salesEndSchemaSchedule = (startDate: Date) => z.object({
  type: z.literal(SalesEnd.SCHEDULE),
  date: z.date().max(startDate),
})

export const createEventStepThreeSchema = (startDate: Date) => {
  const salesStartSchema = z.discriminatedUnion('type', [
    salesStartSchemaNow,
    salesStartSchemaLater(startDate)
  ])

  const salesEndSchema = z.discriminatedUnion('type', [
    salesEndSchemaEventStart,
    salesEndSchemaSchedule(startDate)
  ])

  return z.object({
    salesStart: salesStartSchema,
    salesEnd: salesEndSchema,
    quantity: z.coerce.number().min(1)
  })
}


export type CreateEventStepThreeSchema = z.infer<ReturnType<typeof createEventStepThreeSchema>>

/*
    Step 4
*/

export enum GoLive {
  NOW = 'now',
  SCHEDULE = 'schedule'
}

const stepFourNowSchema = z.object({
  type: z.literal(GoLive.NOW)
})

const stepFourScheduleSchema = (startDate: Date) => z.object({
  type: z.literal(GoLive.SCHEDULE),
  date: z.date().min(new Date()).max(startDate),
})

export const createEventStepFourSchema = (startDate: Date) => z.object({
  goLive: z.discriminatedUnion('type', [
    stepFourNowSchema,
    stepFourScheduleSchema(startDate)
  ])
})


export type CreateEventStepFourSchema = z.infer<ReturnType<typeof createEventStepFourSchema>>

export type CreateEventSchema = CreateEventStepOneSchema & CreateEventStepTwoSchema & CreateEventStepThreeSchema & CreateEventStepFourSchema
