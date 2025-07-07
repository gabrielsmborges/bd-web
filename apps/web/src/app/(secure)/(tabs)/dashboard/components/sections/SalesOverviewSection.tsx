import { currencySymbols, formatCurrency } from '@/util/number'
import { DashboardSection } from '../DashboardSection'
import SalesOverviewContainer from '../SalesOverviewContainer'
import { TicketSales } from '../TicketSales'
import { Button } from '@repo/ui/components/button'
import { BDIcon } from '@/assets/icons'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { getTranslations } from 'next-intl/server'

export const SalesOverviewSection = async () => {
  const t = await getTranslations('dashboard')
  const navigationT = await getTranslations('navigation')

  return (
    <DashboardSection title={t('salesOverview')}>
      <div className="flex gap-2 overflow-x-auto">
        <SalesOverviewContainer title={t('ticketSales')}>
          <TicketSales />
        </SalesOverviewContainer>
        <SalesOverviewContainer title={t('wallet')}>
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
            <Link href={ROUTES.FINANCE} className="w-fit">
              <BDIcon iconName="bankNote" className="h-4 w-4" />
              {navigationT('viewFinance')}
            </Link>
          </Button>
        </SalesOverviewContainer>
      </div>
    </DashboardSection>
  )
}
