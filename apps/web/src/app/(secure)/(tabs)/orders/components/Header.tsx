import { BDIcon } from '@/assets/icons'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList
} from '@repo/ui/components/breadcrumb'
import { Button } from '@repo/ui/components/button'
import { Layout } from '@repo/ui/layout'

export const Header = () => {
  return (
    <Layout.MainHeader className="flex flex-row items-center justify-between gap-4">
      <div className="flex flex-row items-center gap-4">
        <Layout.SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="font-semibold text-white">
              <BreadcrumbLink>Orders</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-row items-center gap-4">
        <Button variant="outline">
          <BDIcon iconName="settings2" className="h-4 w-4" />
          Filter
        </Button>
      </div>
    </Layout.MainHeader>
  )
}
