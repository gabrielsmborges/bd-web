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

const OrdersPage = async () => {
  return (
    <div className="flex h-full flex-col gap-2">
      <Layout.MainHeader className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-4">
          <Layout.SidebarTrigger />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="font-semibold text-white">
                <BreadcrumbLink>Orders</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex flex-row items-center gap-4">
          <Button variant="outline">
            <BDIcon iconName="settings2" className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </Layout.MainHeader>
      <div className="flex h-full flex-1 flex-col justify-between gap-4 overflow-hidden">
        <div className="border-accent flex flex-col justify-between gap-4 overflow-y-auto rounded-lg border-1 text-xs">
          <Table className="bg-black/[0.3] text-sm">
            <TableHeader className="bg-white/[0.05]">
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Refund Method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordersSample.map((order, index) => (
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
    </div>
  )
}

export default OrdersPage
