'use client'

import { formatCurrency } from '@/util/number'
import { ChartConfig, ChartContainer } from '@repo/ui/components/chart'
import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

const data = [
  {
    month: 'Jan',
    revenue: 100
  },
  {
    month: 'Feb',
    revenue: 1000
  },
  {
    month: 'Mar',
    revenue: 15000
  },
  {
    month: 'Apr',
    revenue: 20000
  },
  {
    month: 'May',
    revenue: 20200
  },
  {
    month: 'Jun',
    revenue: 50000
  },
  {
    month: 'Now',
    revenue: 53000
  }
]

const chartConfig = {
  month: {
    label: 'Month',
    color: '#2563eb'
  },
  revenue: {
    label: 'Revenue',
    color: '#ffffff'
  }
} satisfies ChartConfig

export const TicketSales = () => {
  return (
    <ChartContainer
      config={chartConfig}
      className="-translate-x-2 translate-y-3"
    >
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis
          dataKey="revenue"
          tickFormatter={(value) =>
            `${formatCurrency(value, {
              notation: 'compact'
            })}`
          }
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#000000',
            border: '1px solid #ffffff'
          }}
          formatter={(value, name, props) => {
            return (
              <p>
                {formatCurrency(props.payload.revenue, {
                  notation: 'standard'
                })}
              </p>
            )
          }}
        />
        <Line type="monotone" dataKey="revenue" stroke="#ffffff" dot={false} />
      </LineChart>
    </ChartContainer>
  )
}
