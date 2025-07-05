import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList
} from '@repo/ui/components/breadcrumb'

import { Breadcrumb } from '@repo/ui/components/breadcrumb'
import { Layout } from '@repo/ui/layout'

export const Header = () => {
  return (
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
  )
}
