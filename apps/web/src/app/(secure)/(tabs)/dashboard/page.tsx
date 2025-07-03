import { currentUser } from '@clerk/nextjs/server'
import { QuickActionsSection } from './components/sections/QuickActionsSection'
import { UpcomingEventsSection } from './components/sections/UpcomingEventsSection'
import { SalesOverviewSection } from './components/sections/SalesOverviewSection'

const DashboardPage = async () => {
  const user = await currentUser()

  return (
    <div className="flex h-full w-full flex-col gap-8">
      <p className="text-sm opacity-50">Welcome back {user?.firstName}</p>

      <QuickActionsSection />

      <UpcomingEventsSection />

      <SalesOverviewSection />
    </div>
  )
}

export default DashboardPage
