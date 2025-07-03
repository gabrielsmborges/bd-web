import { currencySymbols, formatCurrency } from '@/util/number'
import { DashboardSection } from '../DashboardSection'
import SalesOverviewContainer from '../SalesOverviewContainer'
import { TicketSales } from '../TicketSales'
import { Button } from '@repo/ui/components/button'
import { BDIcon } from '@/assets/icons'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

export const SalesOverviewSection = () => (
  <DashboardSection title="Sales Overview">
    <div className="flex gap-2 overflow-x-auto">
      <SalesOverviewContainer title="Ticket Sales">
        <TicketSales />
      </SalesOverviewContainer>
      <SalesOverviewContainer title="Wallet">
        <div className="flex flex-1 flex-col justify-center">
          <h3 className="text-5xl font-semibold">
            <span className="text-3xl">{currencySymbols.GBP}</span>
            {formatCurrency(
              1000,
              {
                currency: 'GBP'
              },
              true
            )}
          </h3>
        </div>
        <Button asChild>
          <Link href={ROUTES.EVENTS} className="w-fit">
            <BDIcon iconName="calendar" className="h-4 w-4" />
            View Events
          </Link>
        </Button>
      </SalesOverviewContainer>
    </div>
  </DashboardSection>
)
