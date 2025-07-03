import { cn } from '@repo/ui/lib/utils'

interface DashboardSectionProps extends React.ComponentProps<'section'> {
  title: string
}

export const DashboardSection = ({
  children,
  className,
  title,
  ...props
}: DashboardSectionProps) => {
  return (
    <section className={cn('flex flex-col gap-4', className)} {...props}>
      <h3 className="text-lg font-semibold">{title}</h3>
      {children}
    </section>
  )
}
