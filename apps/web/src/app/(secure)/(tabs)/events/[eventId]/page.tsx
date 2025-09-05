import { getBearerToken } from '@/util/api-server'
import { EventsAPI } from '@repo/api'

type EventParams = Promise<{ eventId: string }>

export default async function EventPage({ params }: { params: EventParams }) {
  const { eventId } = await params

  const eventsAPI = new EventsAPI({
    token: await getBearerToken()
  })

  const event = await eventsAPI.getEvent(eventId)

  return (
    <div>
      <p>EventPage {eventId}</p>
      <p>{JSON.stringify(event, null, 2)}</p>
    </div>
  )
}
