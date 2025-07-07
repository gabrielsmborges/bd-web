'use server'

import { createEventSchema } from './schema'
import { parseWithZod } from '@conform-to/zod'

export const createEvent = async (prevState: unknown, formData: FormData) => {

    const submission = parseWithZod(formData, {
        schema: createEventSchema,
    });


    if (submission.status !== 'success') {
        return submission.reply();
    }

    const data = submission.value

    console.log(data)
}