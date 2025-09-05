export enum Pricing {
    FREE = 'free',
    PAID = 'paid'
}

export enum EventStatus {
    LIVE = 'live',
    SCHEDULED = 'scheduled'
}

export type CreateEventInput = {
    title: string,
    description: string,
    location?: string,
    link?: string,
    startDate: Date,
    endDate?: Date,
    pricing: {
        type: Pricing,
        price?: number,
        currency?: string,
        absorbFees?: boolean
    },
    sales: {
        startDate: Date,
        endDate: Date,
        quantity: number
    },
    goLive: {
        date: Date
    },
}

export type Event = {
    id: string,
    title: string,
    description: string,
    location?: string,
    link?: string,
    startDate: Date,
    endDate?: Date,
    pricing: {
        type: Pricing,
        price?: number,
        currency?: string,
        absorbFees?: boolean
    },
    sales: {
        startDate: Date,
        endDate: Date,
        quantity: number
    },
    goLive: {
        date: Date
    },
    status: EventStatus
}