import { getBearerToken } from '@/util/api-server'
import { EventsAPI, Pricing } from '@repo/api'
import { EventHeader } from '../components/Header'
import { EventStatusBadge } from '@/components/statusBadge'
import { Icon } from '@repo/ui/icon'
import { Separator } from '@repo/ui/components/separator'
import dayjs from 'dayjs'
import { formatCurrency } from '@/util/number'

type EventParams = Promise<{ eventId: string }>

export default async function EventPage({ params }: { params: EventParams }) {
  const { eventId } = await params

  const eventsAPI = new EventsAPI({
    token: await getBearerToken()
  })

  const event = await eventsAPI.getEvent(eventId)

  return (
    <>
      <EventHeader eventName={event.title} />

      <div className="flex flex-row items-center justify-between">
        <h2 className="text-2xl font-semibold">{event.title}</h2>
        <EventStatusBadge status={event.status} />
      </div>

      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-row items-center gap-2">
          <Icon
            name="MapPin"
            className="stroke-muted-foreground h-4 w-4"
            strokeWidth={1.5}
          />
          <p className="text-muted-foreground text-xs">{event.location}</p>
        </div>

        <Separator orientation="vertical" />

        <div className="flex flex-row items-center gap-2">
          <Icon
            name="Calendar"
            className="stroke-muted-foreground h-4 w-4"
            strokeWidth={1.5}
          />
          <p className="text-muted-foreground text-xs">
            {dayjs(event.startDate).format('MMM D, YYYY')}
          </p>
        </div>

        <Separator orientation="vertical" />

        <div className="flex flex-row items-center gap-2">
          <Icon
            name="Clock"
            className="stroke-muted-foreground h-4 w-4"
            strokeWidth={1.5}
          />
          <p className="text-muted-foreground text-xs">
            {dayjs(event.startDate).format('HH:mm')}
          </p>
        </div>

        <Separator orientation="vertical" />

        <div className="flex flex-row items-center gap-2">
          <Icon
            name="Banknote"
            className="stroke-muted-foreground h-4 w-4"
            strokeWidth={1.5}
          />
          <p className="text-muted-foreground text-xs">
            {event.pricing.type === Pricing.FREE
              ? 'Free'
              : formatCurrency(event.pricing.price, {
                  currency: event.pricing.currency
                })}
          </p>
        </div>
      </div>
    </>
  )
}
