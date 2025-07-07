import { Button } from '@repo/ui/components/button'
import { DashboardSection } from '../DashboardSection'
import { BDIcon } from '@/assets/icons'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { CreateEventModal } from '@/components/modals'
import { getTranslations } from 'next-intl/server'

export const QuickActionsSection = async () => {
  const t = await getTranslations('dashboard')
  const navigationT = await getTranslations('navigation')

  return (
    <DashboardSection title={t('quickActions')}>
      <div className="flex gap-2">
        <CreateEventModal />
        <Button variant={'outline'} asChild>
          <Link href={ROUTES.EVENTS}>
            <BDIcon iconName="calendar" className="h-4 w-4" />
            {navigationT('viewEvents')}
          </Link>
        </Button>
      </div>
    </DashboardSection>
  )
}
