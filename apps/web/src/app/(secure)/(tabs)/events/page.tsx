import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationLink
} from '@repo/ui/components/pagination'
import { EventStatusBadge } from '@/components/statusBadge'
import { formatCurrency } from '@/util/number'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@repo/ui/components/table'
import dayjs from 'dayjs'
import { eventsSample } from '@/data/sample-data'
import { Header } from './components/Header'
import { Button } from '@repo/ui/components/button'
import { BDIcon } from '@/assets/icons'

const sampleEvents = [
  ...eventsSample,
  ...eventsSample,
  ...eventsSample,
  ...eventsSample,
  ...eventsSample,
  ...eventsSample,
  ...eventsSample,
  ...eventsSample,
  ...eventsSample,
  ...eventsSample
]

const randomisedSampleEvents = sampleEvents.sort(() => Math.random() - 0.5)

const EventsPage = async () => {
  return (
    <>
      <Header />

      <div className="flex h-full flex-1 flex-col justify-between gap-4 overflow-hidden">
        <div className="border-accent flex flex-col justify-between gap-4 overflow-y-auto rounded-lg border-1 text-xs">
          <Table className="bg-black/[0.3] text-sm">
            <TableHeader className="bg-accent sticky top-0">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Tickets Sold</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {randomisedSampleEvents.map((event, index) => (
                <TableRow key={index}>
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
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <BDIcon iconName="ellipsis" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Pagination className="justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}

export default EventsPage
