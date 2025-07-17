import { currentUser } from '@clerk/nextjs/server'
import { QuickActionsSection } from './components/sections/QuickActionsSection'
import { UpcomingEventsSection } from './components/sections/UpcomingEventsSection'
import { SalesOverviewSection } from './components/sections/SalesOverviewSection'
import { Header } from './components/Header'
import { getTranslations } from 'next-intl/server'

const DashboardPage = async () => {
  const user = await currentUser()

  const t = await getTranslations('dashboard')

  return (
    <>
      <Header />

      <div className="flex h-full w-full flex-col gap-8">
        <p className="text-sm opacity-50">
          {t('welcomeBack', {
            name: user?.firstName ?? ''
          })}
        </p>

        <QuickActionsSection />

        <UpcomingEventsSection />

        <SalesOverviewSection />
      </div>
    </>
  )
}

export default DashboardPage
