import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@repo/ui/components/breadcrumb'
import { Layout } from '@repo/ui/layout'

export const Header = ({ orderId }: { orderId: string }) => {
  return (
    <Layout.MainHeader className="flex flex-row items-center justify-between gap-4">
      <div className="flex flex-row items-center gap-4">
        <Layout.SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/orders">Orders</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="font-semibold text-white">
              <BreadcrumbLink>{orderId}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </Layout.MainHeader>
  )
}
