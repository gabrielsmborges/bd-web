import * as React from 'react'
import { cn } from '@repo/ui/lib/utils'

export const Main = ({
  children,
  className,
  ...props
}: React.ComponentProps<'main'>) => {
  return (
    <main
      className={cn(
        'bg-byde-main relative flex h-full max-h-full w-full flex-col overflow-hidden rounded-md',
        className
      )}
      {...props}
    >
      {children}
    </main>
  )
}

export const MainHeader = ({
  children,
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      {...props}
      className={cn('bg-byde-main sticky top-0 z-10 min-h-10', className)}
    >
      {children}
    </div>
  )
}

export const MainContent = ({
  children,
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn('flex h-full flex-1 flex-col gap-2 p-3', className)}
      {...props}
    >
      {children}
    </div>
  )
}

MainContent.displayName = 'MainContent'

MainHeader.displayName = 'MainHeader'

Main.displayName = 'Main'
