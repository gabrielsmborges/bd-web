import { DashboardSection } from '../DashboardSection'
import { eventsSample } from '@/data/sample-data'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@repo/ui/components/table'
import dayjs from 'dayjs'
import { formatCurrency } from '@/util/number'
import { EventStatusBadge } from '@/components/statusBadge'
import { getTranslations } from 'next-intl/server'

export const UpcomingEventsSection = async () => {
  const t = await getTranslations('dashboard')
  const eventsT = await getTranslations('events')

  return (
    <DashboardSection title={t('upcomingEvents')}>
      <div className="border-accent overflow-scroll rounded-lg border-1 text-xs">
        <Table className="bg-black/[0.3] text-sm">
          <TableHeader className="bg-accent sticky top-0">
            <TableRow>
              <TableHead>{eventsT('name')}</TableHead>
              <TableHead>{eventsT('date')}</TableHead>
              <TableHead>{eventsT('ticketsSold')}</TableHead>
              <TableHead>{eventsT('revenue')}</TableHead>
              <TableHead>{eventsT('status')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {eventsSample.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-semibold">{event.title}</TableCell>
                <TableCell>
                  {dayjs(event.dateTime).format('MMM D, YYYY')}
                </TableCell>
                <TableCell>
                  {event.ticketsSold}/{event.capacity}
                </TableCell>
                <TableCell>
                  {formatCurrency(event.revenue, {
                    currency: event.currency
                  })}
                </TableCell>
                <TableCell>
                  <EventStatusBadge status={event.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardSection>
  )
}
