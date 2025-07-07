import { BankAccountStatusBadge } from '@/components/statusBadge'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@repo/ui/components/pagination'
import dayjs from 'dayjs'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@repo/ui/components/table'
import { cn } from '@repo/ui/lib/utils'
import { bankAccountsSample } from '@/data/sample-data'
import { Button } from '@repo/ui/components/button'
import { BDIcon } from '@/assets/icons'
import { useTranslations } from 'next-intl'

const tableData = [
  ...bankAccountsSample,
  ...bankAccountsSample,
  ...bankAccountsSample
]

const BankAccountsTab = () => {
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
              <TableHead>{t('name')}</TableHead>
              <TableHead>{t('bank')}</TableHead>
              <TableHead>{t('dateAdded')}</TableHead>
              <TableHead>{t('accountNumber')}</TableHead>
              <TableHead>{t('accountType')}</TableHead>
              <TableHead>{t('country')}</TableHead>
              <TableHead>{t('currency')}</TableHead>
              <TableHead>{t('status')}</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((bankAccount, index) => (
              <TableRow key={index}>
                <TableCell className="font-semibold">
                  {bankAccount.name}
                </TableCell>
                <TableCell>{bankAccount.bankName}</TableCell>
                <TableCell>
                  {dayjs(bankAccount.dateAdded).format('MMM D, YYYY HH:mm')}
                </TableCell>
                <TableCell>{bankAccount.accountNumber}</TableCell>
                <TableCell>{bankAccount.accountType}</TableCell>
                <TableCell>{bankAccount.country}</TableCell>
                <TableCell>{bankAccount.currency}</TableCell>
                <TableCell>
                  <BankAccountStatusBadge status={bankAccount.status} />
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

export default BankAccountsTab
