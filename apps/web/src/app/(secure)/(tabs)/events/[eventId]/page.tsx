import { getBearerToken } from '@/util/api-server'
import { EventsAPI } from '@repo/api'

export default async function EventPage({
  params
}: {
  params: { eventId: string }
}) {
  const { eventId } = params

  const eventsAPI = new EventsAPI({
    token: await getBearerToken()
  })

  const event = await eventsAPI.getEvent(eventId)

  return (
    <div>
      <p>EventPage {params.eventId}</p>
      <p>{JSON.stringify(event, null, 2)}</p>
    </div>
  )
}
