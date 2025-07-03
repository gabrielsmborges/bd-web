import { currentUser } from '@clerk/nextjs/server'
import { QuickActionsSection } from './components/sections/QuickActionsSection'
import { UpcomingEventsSection } from './components/sections/UpcomingEventsSection'
import { SalesOverviewSection } from './components/sections/SalesOverviewSection'
import { Layout } from '@repo/ui/layout'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList
} from '@repo/ui/components/breadcrumb'

const DashboardPage = async () => {
  const user = await currentUser()

  return (
    <div className="flex flex-col gap-2">
      <Layout.MainHeader className="flex flex-row items-center gap-4">
        <Layout.SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="font-semibold text-white">
              <BreadcrumbLink>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Layout.MainHeader>

      <div className="flex h-full w-full flex-col gap-8">
        <p className="text-sm opacity-50">Welcome back {user?.firstName}</p>

        <QuickActionsSection />

        <UpcomingEventsSection />

        <SalesOverviewSection />
      </div>
    </div>
  )
}

export default DashboardPage
