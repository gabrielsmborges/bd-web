import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationLink
} from '@repo/ui/components/pagination'
import { OrderStatusBadge } from '@/components/statusBadge'
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
import { ordersSample } from '@/data/sample-data'
import Link from 'next/link'
import { Header } from './components/Header'
import { getTranslations } from 'next-intl/server'

const tableData = [...ordersSample, ...ordersSample, ...ordersSample]

const OrdersPage = async () => {
  const t = await getTranslations('orders')

  return (
    <>
      <Header />

      <div className="flex h-full flex-1 flex-col justify-between gap-4 overflow-hidden">
        <div className="border-accent flex flex-col justify-between gap-4 overflow-y-auto rounded-lg border-1 text-xs">
          <Table className="bg-black/[0.3] text-sm">
            <TableHeader className="bg-accent sticky top-0">
              <TableRow>
                <TableHead>{t('orderId')}</TableHead>
                <TableHead>{t('event')}</TableHead>
                <TableHead>{t('buyer')}</TableHead>
                <TableHead>{t('date')}</TableHead>
                <TableHead>{t('total')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('refundMethod')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Link
                      className="text-blue-500 underline"
                      href={`orders/${order.orderId.replace('#', '')}`}
                    >
                      {order.orderId}
                    </Link>
                  </TableCell>
                  <TableCell>{order.eventName}</TableCell>
                  <TableCell>{order.buyerName}</TableCell>
                  <TableCell>
                    {dayjs(order.date).format('MMM D, YYYY')}
                  </TableCell>
                  <TableCell>
                    {formatCurrency(order.total, {
                      currency: order.currency
                    })}
                  </TableCell>
                  <TableCell>
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                  <TableCell>{order.refundMethod}</TableCell>
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

export default OrdersPage
