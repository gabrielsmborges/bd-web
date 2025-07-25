
import z from "zod"


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
        },
    )
export type CreateEventStepOneSchema = z.infer<typeof createEventStepOneSchema>