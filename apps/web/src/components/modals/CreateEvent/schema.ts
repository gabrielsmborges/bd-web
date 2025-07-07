import dayjs from "dayjs"
import z from "zod"

const now = dayjs()

const durationSchema = z.object({
    hours: z.number().min(1),
    minutes: z.number().min(1)
})

// if include duration is true then duration is required
export const createEventSchema = z
    .object({
        title: z.string().min(1),
        description: z.string().min(1),
        location: z.string().min(1).optional(),
        link: z.string().url().optional(),
        startDate: z.date().min(now.toDate()),
        includeDuration: z.boolean(),
        duration: durationSchema.optional()
    })
    .refine(
        (data) => {
            if (data.includeDuration) {
                return durationSchema.safeParse(data.duration).success
            }
            return true
        },
        {
            message: 'Duration is required',
            path: ['duration'],
            params: {
                includeDuration: 'includeDuration'
            }
        }
    )


export type CreateEventSchema = z.infer<typeof createEventSchema>