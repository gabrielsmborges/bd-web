export enum EventStatus {
    LIVE = 'live',
    DRAFT = 'draft',
    PENDING = 'pending',
    ENDED = 'ended'
}

export enum OrderStatus {
    PAID = 'paid',
    PENDING = 'pending',
    CANCELLED = 'cancelled',
    REFUNDED = 'refunded'
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
        currency: 'GBP',
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
        currency: 'GBP',
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
        currency: 'GBP',
        status: EventStatus.ENDED,
    },
]

export const ordersSample = [
    {
        orderId: '#1234567890',
        eventName: 'Tech conference',
        buyerName: 'John Doe',
        date: new Date('2025-01-01 10:00'),
        total: 100,
        currency: 'GBP',
        status: OrderStatus.PAID,
    },
    {
        orderId: '#2345678901',
        eventName: 'Prayer gathering',
        buyerName: 'Jane Smith',
        date: new Date('2025-01-02 14:30'),
        total: 75,
        currency: 'GBP',
        status: OrderStatus.PENDING,
    },
    {
        orderId: '#3456789012',
        eventName: 'Youth conference',
        buyerName: 'Mike Johnson',
        date: new Date('2025-01-03 09:15'),
        total: 250,
        currency: 'GBP',
        status: OrderStatus.PAID,
    },
    {
        orderId: '#4567890123',
        eventName: 'Tech conference',
        buyerName: 'Sarah Williams',
        date: new Date('2025-01-04 16:45'),
        total: 150,
        currency: 'GBP',
        status: OrderStatus.REFUNDED,
        refundMethod: 'Mastercard 1144',
    },
    {
        orderId: '#5678901234',
        eventName: 'Youth conference',
        buyerName: 'James Brown',
        date: new Date('2025-01-05 11:30'),
        total: 180,
        currency: 'GBP',
        status: OrderStatus.CANCELLED,
    },
    {
        orderId: '#6789012345',
        eventName: 'Prayer gathering',
        buyerName: 'Emily Davis',
        date: new Date('2025-01-06 13:20'),
        total: 95,
        currency: 'GBP',
        status: OrderStatus.PAID,
    },
    {
        orderId: '#7890123456',
        eventName: 'Youth conference',
        buyerName: 'Robert Wilson',
        date: new Date('2025-01-07 15:10'),
        total: 320,
        currency: 'GBP',
        status: OrderStatus.PENDING,
    }

]