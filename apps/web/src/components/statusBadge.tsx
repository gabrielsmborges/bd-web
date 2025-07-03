import { EventStatus, OrderStatus } from '@/data/sample-data'
import { cn } from '@repo/ui/lib/utils'

const MAP_EVENT_STATUS_TO_COLOR = {
  [EventStatus.LIVE]: 'bg-byde-status-live',
  [EventStatus.DRAFT]: 'bg-byde-status-draft',
  [EventStatus.PENDING]: 'bg-byde-status-pending',
  [EventStatus.ENDED]: 'bg-byde-status-ended'
}

const MAP_EVENT_STATUS_TO_TEXT = {
  [EventStatus.LIVE]: 'Live',
  [EventStatus.DRAFT]: 'Draft',
  [EventStatus.PENDING]: 'Pending',
  [EventStatus.ENDED]: 'Ended'
}

export const EventStatusBadge = ({ status }: { status: EventStatus }) => {
  return (
    <div
      className={cn(
        `border-accent text-muted-foreground flex flex-row items-center gap-2 border-1 px-2 py-1 text-xs font-medium`,
        'rounded-md px-1.5 py-0.5',
        'w-fit'
      )}
    >
      <div
        className={cn(
          MAP_EVENT_STATUS_TO_COLOR[status],
          'rounded-full',
          'h-3 w-3'
        )}
      />
      {MAP_EVENT_STATUS_TO_TEXT[status]}
    </div>
  )
}

const MAP_ORDER_STATUS_TO_COLOR = {
  [OrderStatus.PAID]: 'bg-byde-status-paid',
  [OrderStatus.PENDING]: 'bg-byde-status-pending',
  [OrderStatus.CANCELLED]: 'bg-byde-status-cancelled',
  [OrderStatus.REFUNDED]: 'bg-byde-status-refunded'
}

const MAP_ORDER_STATUS_TO_TEXT = {
  [OrderStatus.PAID]: 'Paid',
  [OrderStatus.PENDING]: 'Pending',
  [OrderStatus.CANCELLED]: 'Cancelled',
  [OrderStatus.REFUNDED]: 'Refunded'
}

export const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  return (
    <div
      className={cn(
        `border-accent text-muted-foreground flex flex-row items-center gap-2 border-1 px-2 py-1 text-xs font-medium`,
        'rounded-md px-1.5 py-0.5',
        'w-fit'
      )}
    >
      <div
        className={cn(
          MAP_ORDER_STATUS_TO_COLOR[status],
          'rounded-full',
          'h-3 w-3'
        )}
      />
      {MAP_ORDER_STATUS_TO_TEXT[status]}
    </div>
  )
}
