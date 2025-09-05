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

import { EventsHeader } from './components/Header'
import { Button } from '@repo/ui/components/button'
import { BDIcon } from '@/assets/icons'
import { getTranslations } from 'next-intl/server'
import { EventsAPI, Pricing } from '@repo/api'
import { getBearerToken } from '@/util/api-server'
import Link from 'next/link'

const EventsPage = async () => {
  const t = await getTranslations('events')

  const eventsAPI = new EventsAPI({
    token: await getBearerToken()
  })

  const events = await eventsAPI.getEvents()

  return (
    <>
      <EventsHeader />

      {!events.length ? (
        <EmptyState />
      ) : (
        <div className="flex h-full flex-1 flex-col justify-between gap-4 overflow-hidden">
          <div className="border-accent flex flex-col justify-between gap-4 overflow-y-auto rounded-lg border-1 text-xs">
            <Table className="bg-black/[0.3] text-sm">
              <TableHeader className="bg-accent sticky top-0">
                <TableRow>
                  <TableHead>{t('name')}</TableHead>
                  <TableHead>{t('date')}</TableHead>
                  <TableHead>{t('ticketsSold')}</TableHead>
                  <TableHead>{t('revenue')}</TableHead>
                  <TableHead>{t('status')}</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-semibold">
                      <Link href={`/events/${event.id}`}>{event.title}</Link>
                    </TableCell>
                    <TableCell>
                      {dayjs(event.startDate).format('MMM D, YYYY')}
                    </TableCell>
                    <TableCell>{event.sales.quantity}</TableCell>
                    <TableCell>
                      {event.pricing.type === Pricing.FREE
                        ? '0'
                        : formatCurrency(event.pricing.price, {
                            currency: event.pricing.currency
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
      )}
    </>
  )
}

const EmptyState = () => {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center">
      <h1 className="text-muted-foreground text-sm font-semibold">
        No events found
      </h1>
    </div>
  )
}

export default EventsPage
