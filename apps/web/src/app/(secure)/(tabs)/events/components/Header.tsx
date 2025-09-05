import { BDIcon } from '@/assets/icons'
import { CreateEventModal } from '@/components/modals'
import { ROUTES } from '@/constants/routes'
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@repo/ui/components/breadcrumb'

import { Breadcrumb } from '@repo/ui/components/breadcrumb'
import { Button } from '@repo/ui/components/button'
import { Layout } from '@repo/ui/layout'
import { getTranslations } from 'next-intl/server'

export const EventsHeader = async () => {
  const t = await getTranslations('navigation')

  return (
    <Layout.MainHeader className="flex flex-row items-center justify-between gap-4">
      <div className="flex flex-row items-center gap-4">
        <Layout.SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="font-semibold text-white">
              <BreadcrumbLink>{t('events')}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-row items-center gap-4">
        <Button variant="outline">
          <BDIcon iconName="settings2" className="h-4 w-4" />
          {t('filter')}
        </Button>

        <CreateEventModal />
      </div>
    </Layout.MainHeader>
  )
}

type EventHeaderProps = {
  eventName: string
}

export const EventHeader = async ({ eventName }: EventHeaderProps) => {
  const t = await getTranslations('navigation')

  return (
    <Layout.MainHeader className="flex flex-row items-center justify-between gap-4">
      <div className="flex flex-row items-center gap-4">
        <Layout.SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="font-semibold text-white">
              <BreadcrumbLink href={ROUTES.EVENTS}>
                {t('events')}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="text-muted-foreground">
              <BreadcrumbLink>{eventName}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </Layout.MainHeader>
  )
}
