'use server'

import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { CreateEventSchema, createEventStepFourSchema, createEventStepOneSchema, createEventStepThreeSchema, createEventStepTwoSchema, SalesEnd, SalesStart, GoLive } from "./schema"
import { CreateEventInput, EventsAPI, Pricing } from "@repo/api"
import { getBearerToken } from "@/util/api-server"
import { redirect } from "next/navigation"

dayjs.extend(utc)


export const submitEvent = async (event: CreateEventSchema) => {
    const eventsAPI = new EventsAPI({
        token: await getBearerToken()
    })

    const { error, event: validatedEvent } = validateEvent(event)

    if (error || !validatedEvent) {
        return {
            success: false,
            message: error
        }
    }

    // build event
    const builtEvent = buildEvent(validatedEvent)

    const { id } = await eventsAPI.createEvent(builtEvent)

    redirect(`/events/${id}`)


}

const validateEvent = (event: CreateEventSchema) => {

    // step 1
    const validatedEvent = createEventStepOneSchema.safeParse(event)
    if (!validatedEvent.success) {
        return {
            error: validatedEvent.error.message
        }
    }

    // step 2
    const validatedEventStepTwo = createEventStepTwoSchema.safeParse(event)
    if (!validatedEventStepTwo.success) {
        return {
            error: validatedEventStepTwo.error.message
        }
    }

    // step 3
    const validatedEventStepThree = createEventStepThreeSchema(event.startDate).safeParse(event)
    if (!validatedEventStepThree.success) {
        return {
            error: validatedEventStepThree.error.message
        }
    }

    // step 4
    const validatedEventStepFour = createEventStepFourSchema.safeParse(event)
    if (!validatedEventStepFour.success) {
        return {
            error: validatedEventStepFour.error.message
        }
    }

    return {
        success: true,
        event: event,
        error: null
    }
}

// make sure date is in the crrect timezone, maybe utc + timezone offset (use dayjs)
const convertDateToUTC = ({ date, timezoneOffset }: { date: Date, timezoneOffset: number }) => {
    const parsedDate = dayjs(date)
    const utcDate = parsedDate.utcOffset(timezoneOffset)
    return utcDate.set('seconds', 0).toDate()
}



const buildEvent = (event: CreateEventSchema): CreateEventInput => {
    const startDate = convertDateToUTC({ date: event.startDate, timezoneOffset: event.timezoneUTCOffset })
    const goLiveDate = event.goLive.type === GoLive.SCHEDULE ? convertDateToUTC({ date: event.goLive.date, timezoneOffset: event.timezoneUTCOffset }) : new Date()
    const newEvent: CreateEventInput = {
        title: event.title,
        description: event.description,
        location: event.location,
        link: event.link,
        startDate,
        endDate: event.endDate ? convertDateToUTC({ date: event.endDate, timezoneOffset: event.timezoneUTCOffset }) : undefined,
        pricing: {
            type: event.pricing,
            ...(event.pricing === Pricing.PAID && {
                price: event.price,
                currency: event?.currency || undefined,
                absorbFees: event.absorbFees || false
            }),
        },
        sales: {
            startDate:
                event.salesStart.type === SalesStart.LATER
                    ? convertDateToUTC({ date: event.salesStart.date, timezoneOffset: event.timezoneUTCOffset })
                    : startDate,

            endDate: event.salesEnd.type === SalesEnd.SCHEDULE ? convertDateToUTC({ date: event.salesEnd.date, timezoneOffset: event.timezoneUTCOffset }) : startDate,
            quantity: event.quantity,
        },

        goLive: {
            date: dayjs(goLiveDate).set('seconds', 0).toDate(),
        }
    }

    return newEvent

}
