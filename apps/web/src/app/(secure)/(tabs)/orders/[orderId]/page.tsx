import { OrderStatusBadge } from '@/components/statusBadge'
import { ordersSample } from '@/data/sample-data'
import { formatCurrency } from '@/util/number'

import dayjs from 'dayjs'
import { Header } from './components/Header'
import { getTranslations } from 'next-intl/server'

const OrderPage = async ({
  params
}: {
  params: Promise<{ orderId: string }>
}) => {
  const { orderId } = await params
  const t = await getTranslations('orders')

  const order = ordersSample.find((order) => order.orderId === `#${orderId}`)

  if (!order || !orderId) {
    return <div>{t('orderNotFound')}</div>
  }

  return (
    <div className="flex h-full flex-col gap-2">
      <Header orderId={orderId} />

      {/* display order details */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{order.eventName}</h1>
          <p className="text-muted-foreground text-sm">{order.buyerName}</p>
          <p className="text-muted-foreground text-sm">
            {dayjs(order.date).format('MMM D, YYYY')}
          </p>
          <p className="text-muted-foreground text-sm">
            {formatCurrency(order?.total, {
              currency: order?.currency
            })}
          </p>
          <OrderStatusBadge status={order.status} />
          <p className="text-muted-foreground text-sm">{order.refundMethod}</p>
        </div>
      </div>
    </div>
  )
}

export default OrderPage
