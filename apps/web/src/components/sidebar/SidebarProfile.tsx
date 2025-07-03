'use client'

import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { useSidebar } from '@repo/ui/components/sidebar'
import { cn } from '@repo/ui/lib/utils'

const SidebarProfile = () => {
  const { open } = useSidebar()
  return (
    <div className="relative flex py-2 group-data-[collapsible=icon]:justify-center">
      <UserButton
        showName
        appearance={{
          layout: {
            shimmer: false
          },
          elements: {
            avatarBox: {
              width: '2rem',
              height: '2rem'
            },
            userButtonOuterIdentifier: {
              display: open ? 'flex' : 'none'
            },
            userButtonBox: {
              flexDirection: 'row-reverse',
              alignItems: 'start'
            }
          }
        }}
      />
      <div
        className={cn({
          'absolute bottom-1 left-10': open,
          hidden: !open
        })}
      >
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              organizationPreviewAvatarContainer__organizationSwitcherTrigger: {
                display: 'none'
              },
              organizationPreviewMainIdentifier__organizationSwitcherTrigger: {
                fontSize: '0.75rem',
                fontWeight: '300'
              }
            }
          }}
        />
      </div>
    </div>
  )
}

export default SidebarProfile
