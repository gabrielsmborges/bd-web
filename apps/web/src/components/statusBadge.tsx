import { BDIcon, BDIconName } from '@/assets/icons'
import {
  BankAccountStatus,
  OrderStatus,
  PayoutStatus
} from '@/data/sample-data'
import { Event, EventStatus } from '@repo/api'
import { cn } from '@repo/ui/lib/utils'
import { useTranslations } from 'next-intl'

const MAP_EVENT_STATUS_TO_COLOR = {
  [EventStatus.LIVE]: 'bg-byde-status-live',
  [EventStatus.SCHEDULED]: 'bg-byde-status-pending',
  [EventStatus.ENDED]: 'bg-byde-status-ended'
}

export const EventStatusBadge = ({ status }: { status: Event['status'] }) => {
  const t = useTranslations('status')

  const MAP_EVENT_STATUS_TO_TEXT = {
    [EventStatus.LIVE]: t('live'),
    [EventStatus.SCHEDULED]: t('scheduled'),
    [EventStatus.ENDED]: t('ended')
  }

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

export const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  const t = useTranslations('status')

  const MAP_ORDER_STATUS_TO_TEXT = {
    [OrderStatus.PAID]: t('paid'),
    [OrderStatus.PENDING]: t('pending'),
    [OrderStatus.CANCELLED]: t('cancelled'),
    [OrderStatus.REFUNDED]: t('refunded')
  }

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

const MAP_PAYOUT_STATUS_TO_COLOR = {
  [PayoutStatus.PAID]: 'bg-byde-status-paid',
  [PayoutStatus.PENDING]: 'bg-transparent',
  [PayoutStatus.UNDER_REVIEW]: 'bg-transparent',
  [PayoutStatus.REJECTED]: 'bg-byde-status-cancelled'
}

const MAP_PAYOUT_STATUS_TO_ICON: Record<PayoutStatus, BDIconName> = {
  [PayoutStatus.PAID]: 'check',
  [PayoutStatus.PENDING]: 'loader',
  [PayoutStatus.UNDER_REVIEW]: 'circleDashed',
  [PayoutStatus.REJECTED]: 'x'
}

const MAP_PAYOUT_STATUS_TO_ICON_CLASSNAME: Record<PayoutStatus, string> = {
  [PayoutStatus.PAID]: 'w-2.5 h-2.5 text-white',
  [PayoutStatus.PENDING]: 'w-3 h-3 text-byde-status-pending',
  [PayoutStatus.UNDER_REVIEW]: 'w-3 h-3 text-accent-foreground/30',
  [PayoutStatus.REJECTED]: 'w-2.5 h-2.5 text-white'
}

export const PayoutStatusBadge = ({ status }: { status: PayoutStatus }) => {
  const t = useTranslations('status')

  const MAP_PAYOUT_STATUS_TO_TEXT = {
    [PayoutStatus.PAID]: t('paid'),
    [PayoutStatus.PENDING]: t('pending'),
    [PayoutStatus.UNDER_REVIEW]: t('underReview'),
    [PayoutStatus.REJECTED]: t('rejected')
  }

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
          MAP_PAYOUT_STATUS_TO_COLOR[status],
          'rounded-full',
          'h-3 w-3',
          'flex items-center justify-center'
        )}
      >
        <BDIcon
          iconName={MAP_PAYOUT_STATUS_TO_ICON[status]}
          className={cn(MAP_PAYOUT_STATUS_TO_ICON_CLASSNAME[status])}
        />
      </div>
      {MAP_PAYOUT_STATUS_TO_TEXT[status]}
    </div>
  )
}

const MAP_BANK_ACCOUNT_STATUS_TO_COLOR = {
  [BankAccountStatus.VERIFIED]: 'bg-byde-status-paid',
  [BankAccountStatus.UNVERIFIED]: 'bg-byde-status-cancelled'
}

const MAP_BANK_ACCOUNT_STATUS_TO_ICON: Record<BankAccountStatus, BDIconName> = {
  [BankAccountStatus.VERIFIED]: 'check',
  [BankAccountStatus.UNVERIFIED]: 'x'
}

const MAP_BANK_ACCOUNT_STATUS_TO_ICON_CLASSNAME: Record<
  BankAccountStatus,
  string
> = {
  [BankAccountStatus.VERIFIED]: 'w-2.5 h-2.5 text-white',
  [BankAccountStatus.UNVERIFIED]: 'w-2.5 h-2.5 text-white'
}

export const BankAccountStatusBadge = ({
  status
}: {
  status: BankAccountStatus
}) => {
  const t = useTranslations('status')

  const MAP_BANK_ACCOUNT_STATUS_TO_TEXT = {
    [BankAccountStatus.VERIFIED]: t('verified'),
    [BankAccountStatus.UNVERIFIED]: t('unverified')
  }

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
          MAP_BANK_ACCOUNT_STATUS_TO_COLOR[status],
          'rounded-full',
          'h-3 w-3',
          'flex items-center justify-center'
        )}
      >
        <BDIcon
          iconName={MAP_BANK_ACCOUNT_STATUS_TO_ICON[status]}
          className={cn(MAP_BANK_ACCOUNT_STATUS_TO_ICON_CLASSNAME[status])}
        />
      </div>
      {MAP_BANK_ACCOUNT_STATUS_TO_TEXT[status]}
    </div>
  )
}
