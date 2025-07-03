import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
  SidebarTrigger
} from '../components/sidebar'
import { Main, MainContent, MainHeader } from './Main'

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <SidebarProvider className="flex h-svh w-svw flex-col p-4 md:flex-row">
      {children}
    </SidebarProvider>
  )
}

Layout.displayName = 'Layout'
Layout.Main = Main
Layout.MainHeader = MainHeader
Layout.MainContent = MainContent
Layout.Sidebar = Sidebar
Layout.SidebarContent = SidebarContent
Layout.SidebarFooter = SidebarFooter
Layout.SidebarHeader = SidebarHeader
Layout.SidebarTrigger = SidebarTrigger
Layout.SidebarMenu = SidebarMenu
Layout.SidebarMenuItem = SidebarMenuItem
Layout.SidebarMenuButton = SidebarMenuButton
Layout.SidebarMenuSub = SidebarMenuSub

export default Layout
