import { BDIcon } from '@/assets/icons'
import { PayoutStatusBadge } from '@/components/statusBadge'
import { payoutsSample } from '@/data/sample-data'
import { formatCurrency } from '@/util/number'
import { Button } from '@repo/ui/components/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext
} from '@repo/ui/components/pagination'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@repo/ui/components/table'
import { cn } from '@repo/ui/lib/utils'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'

const tableData = [...payoutsSample, ...payoutsSample, ...payoutsSample]

const PayoutsTab = () => {
  const t = useTranslations('finance')

  return (
    <div className="flex min-h-0 flex-col justify-between gap-4">
      <div
        className={cn(
          'border-accent',
          'flex flex-col justify-between gap-4',
          'overflow-y-scroll rounded-lg border-1',
          'text-xs'
        )}
      >
        <Table className="bg-black/[0.3] text-sm">
          <TableHeader className="bg-accent sticky top-0">
            <TableRow>
              <TableHead>{t('amount')}</TableHead>
              <TableHead>{t('date')}</TableHead>
              <TableHead>{t('status')}</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((payout, index) => (
              <TableRow key={index}>
                <TableCell className="font-semibold">
                  {formatCurrency(payout.amount, {
                    currency: payout.currency
                  })}
                </TableCell>
                <TableCell>
                  {dayjs(payout.date).format('MMM D, YYYY')}
                </TableCell>
                <TableCell>
                  <PayoutStatusBadge status={payout.status} />
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
  )
}

export default PayoutsTab
