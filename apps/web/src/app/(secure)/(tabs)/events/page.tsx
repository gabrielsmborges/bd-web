import { Layout } from '@repo/ui/layout'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList
} from '@repo/ui/components/breadcrumb'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationLink
} from '@repo/ui/components/pagination'
import { BDIcon } from '@/assets/icons'
import { Button } from '@repo/ui/components/button'
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
    <div className="flex h-full flex-col gap-2">
      <Layout.MainHeader className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-4">
          <Layout.SidebarTrigger />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="font-semibold text-white">
                <BreadcrumbLink>Events</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex flex-row items-center gap-4">
          <Button variant="outline">
            <BDIcon iconName="settings2" className="h-4 w-4" />
            Filter
          </Button>

          <Button>
            <BDIcon iconName="plus" className="h-4 w-4" />
            Create Event
          </Button>
        </div>
      </Layout.MainHeader>
      <div className="flex h-full flex-1 flex-col justify-between gap-4 overflow-hidden">
        <div className="border-accent flex flex-col justify-between gap-4 overflow-y-auto rounded-lg border-1 text-xs">
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
              {randomisedSampleEvents.map((event, index) => (
                <TableRow key={index}>
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
                    <EventStatusBadge status={event.status} />
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
    </div>
  )
}

export default EventsPage
