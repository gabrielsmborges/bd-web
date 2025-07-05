import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList
} from '@repo/ui/components/breadcrumb'

import { Breadcrumb } from '@repo/ui/components/breadcrumb'
import { Layout } from '@repo/ui/layout'

export const Header = () => (
  <Layout.MainHeader className="flex flex-row items-center justify-between gap-4">
    <div className="flex flex-row items-center gap-4">
      <Layout.SidebarTrigger />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="font-semibold text-white">
            <BreadcrumbLink>Finance</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </Layout.MainHeader>
)
