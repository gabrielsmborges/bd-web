export enum EventStatus {
    LIVE = 'live',
    DRAFT = 'draft',
    PENDING = 'pending',
    ENDED = 'ended'
}

export const eventsSample = [
    {
        id: 1,
        title: 'Tech conference',
        description: 'A conference about the latest in technology',
        dateTime: new Date('2025-10-01 10:00'),
        capacity: 100,
        ticketsSold: 50,
        revenue: 10000,
        currency: 'GBP',
        status: EventStatus.LIVE,
    },
    {
        id: 2,
        title: 'Prayer gathering',
        description: 'A prayer gathering for the community',
        dateTime: new Date('2025-10-10 10:00'),
        capacity: 123,
        ticketsSold: 72,
        revenue: 230,
        currency: 'BRL',
        status: EventStatus.PENDING,
    },
    {
        id: 3,
        title: 'Youth conference',
        description: 'A conference for the youth',
        dateTime: new Date('2025-10-12 10:00'),
        capacity: 100,
        ticketsSold: 50,
        revenue: 10000,
        currency: 'USD',
        status: EventStatus.DRAFT,
    },
    {
        id: 4,
        title: 'Youth conference',
        description: 'A conference for the youth',
        dateTime: new Date('2025-10-12 10:00'),
        capacity: 100,
        ticketsSold: 50,
        revenue: 10000,
        currency: 'EUR',
        status: EventStatus.ENDED,
    },
]