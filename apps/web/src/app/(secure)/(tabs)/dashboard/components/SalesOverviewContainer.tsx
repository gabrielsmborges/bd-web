import { cn } from '@repo/ui/lib/utils'

interface SalesOverviewContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string
}

const SalesOverviewContainer = ({
  title,
  children,
  className,
  ...props
}: SalesOverviewContainerProps) => {
  return (
    <div
      {...props}
      className={cn(
        'border-accent flex max-h-62 min-h-62 max-w-90 min-w-90 flex-col gap-2 rounded-lg border bg-black/[0.3] p-3',
        className
      )}
    >
      <h2 className="text-md font-medium">{title}</h2>
      {children}
    </div>
  )
}

export default SalesOverviewContainer
