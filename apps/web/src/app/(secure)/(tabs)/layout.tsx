import { Layout } from '@repo/ui/layout'
import SidebarHomeLink from '@/components/sidebar/SidebarHomeLink'
import SidebarProfile from '@/components/sidebar/SidebarProfile'
import { ROUTES } from '@/constants/routes'
import { SidebarRouteLink } from '@/components/sidebar/SidebarRouteLink'
import { Separator } from '@repo/ui/components/separator'
import { BDIcon } from '@/assets/icons'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

const BydeSideBar = async () => {
  const t = await getTranslations('navigation')

  return (
    <Layout.Sidebar variant="inset" className="p-4 pr-0" collapsible="icon">
      <Layout.SidebarHeader className="flex flex-row items-center justify-between">
        <Layout.SidebarMenu>
          <SidebarHomeLink />
        </Layout.SidebarMenu>
      </Layout.SidebarHeader>

      <Layout.SidebarContent className="mt-6">
        <Layout.SidebarMenu>
          <SidebarRouteLink
            iconName="layoutDashboard"
            href={ROUTES.DASHBOARD}
            label={t('dashboard')}
          />

          {/* <SidebarRouteLink
            iconName="layoutDashboard"
            href={ROUTES.SELECT_ORGANIZATION}
            label="Select Organization"
          /> */}

          <SidebarRouteLink
            iconName="calendar"
            href={ROUTES.EVENTS}
            label={t('events')}
          />

          <SidebarRouteLink
            iconName="receipt"
            href={ROUTES.ORDERS}
            label={t('orders')}
          />

          <SidebarRouteLink
            iconName="bankNote"
            href={ROUTES.FINANCE}
            label={t('finance')}
          />
        </Layout.SidebarMenu>
      </Layout.SidebarContent>

      <Layout.SidebarFooter>
        <SidebarProfile />
        <Separator />
        <Layout.SidebarMenu>
          <Layout.SidebarMenuItem>
            <Layout.SidebarMenuButton
              className="flex flex-row items-center gap-2 opacity-50"
              asChild
            >
              <Link href={ROUTES.SETTINGS}>
                <BDIcon iconName="settings" className="h-8 w-8" />
                <span>{t('settings')}</span>
              </Link>
            </Layout.SidebarMenuButton>
          </Layout.SidebarMenuItem>
        </Layout.SidebarMenu>
      </Layout.SidebarFooter>
    </Layout.Sidebar>
  )
}

const SecureLayout = async ({
  children
}: Readonly<React.PropsWithChildren>) => {
  return (
    <Layout>
      <BydeSideBar />
      <Layout.Main>
        <Layout.MainContent>{children}</Layout.MainContent>
      </Layout.Main>
    </Layout>
  )
}

export default SecureLayout
