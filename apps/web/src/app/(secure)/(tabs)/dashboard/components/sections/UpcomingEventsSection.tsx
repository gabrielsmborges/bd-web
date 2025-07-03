import { DashboardSection } from '../DashboardSection'
import { eventsSample } from '../../sample-data'
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
import { StatusBadge } from '@/components/statusBadge'

export const UpcomingEventsSection = () => (
  <DashboardSection title="Upcoming Events">
    <div className="border-accent overflow-scroll rounded-lg border-1 text-xs">
      <Table className="bg-black/[0.3] text-sm">
        <TableHeader className="bg-white/[0.05]">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Tickets Sold</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {eventsSample.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.title}</TableCell>
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
                <StatusBadge status={event.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </DashboardSection>
)
