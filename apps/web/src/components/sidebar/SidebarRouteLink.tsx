'use client'

import Link from 'next/link'
import { Layout } from '@repo/ui/layout'
import { ROUTES } from '@/constants/routes'
import { usePathname } from 'next/navigation'
import { BDIcon, BDIconName } from '@/assets/icons'
import { cn } from '@repo/ui/lib/utils'

export const SidebarRouteLink = ({
  href,
  label,
  iconName
}: {
  iconName: BDIconName
  href: ROUTES
  label: string
}) => {
  const pathname = usePathname()

  const isActive = pathname.startsWith(href)

  const opacityClassName = cn({
    'opacity-50': !isActive
  })

  return (
    <Layout.SidebarMenuItem>
      <Layout.SidebarMenuButton isActive={isActive} tooltip={label} asChild>
        <Link href={href} className="flex h-full items-center gap-2 p-4">
          <BDIcon
            iconName={iconName}
            className={cn(opacityClassName, {
              'stroke-[2.5]': isActive,
              'stroke-[2]': !isActive
            })}
          />{' '}
          <span className={opacityClassName}>{label}</span>
        </Link>
      </Layout.SidebarMenuButton>
    </Layout.SidebarMenuItem>
  )
}
