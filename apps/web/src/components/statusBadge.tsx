import { EventStatus } from '@/app/(secure)/(tabs)/dashboard/sample-data'
import { cn } from '@repo/ui/lib/utils'

const MAP_STATUS_TO_COLOR = {
  [EventStatus.LIVE]: 'bg-byde-status-live',
  [EventStatus.DRAFT]: 'bg-byde-status-draft',
  [EventStatus.PENDING]: 'bg-byde-status-pending',
  [EventStatus.ENDED]: 'bg-byde-status-ended'
}

const MAP_STATUS_TO_TEXT = {
  [EventStatus.LIVE]: 'Live',
  [EventStatus.DRAFT]: 'Draft',
  [EventStatus.PENDING]: 'Pending',
  [EventStatus.ENDED]: 'Ended'
}

export const StatusBadge = ({ status }: { status: EventStatus }) => {
  return (
    <div
      className={cn(
        `rounded-sm px-2 py-1 text-xs font-medium text-black/50`,
        MAP_STATUS_TO_COLOR[status],
        'px-4 py-1',
        'w-fit'
      )}
    >
      {MAP_STATUS_TO_TEXT[status]}
    </div>
  )
}
