'use client'

import { formatCurrency } from '@/util/number'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@repo/ui/components/chart'
import { Area, AreaChart, Line, XAxis, YAxis } from 'recharts'

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
      <AreaChart accessibilityLayer data={data}>
        <XAxis dataKey="month" />
        <YAxis
          dataKey="revenue"
          tickFormatter={(value) =>
            `${formatCurrency(value, {
              notation: 'compact'
            })}`
          }
        />

        <defs>
          <linearGradient id="fillRevenue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="transparent" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <Area
          dataKey="revenue"
          type="monotone"
          fill="url(#fillRevenue)"
          fillOpacity={0.4}
          stroke="var(--primary)"
        />

        <ChartTooltip
          content={
            <ChartTooltipContent
              labelKey="month"
              nameKey="revenue"
              labelFormatter={(value, payload) => {
                return (
                  <p className="text-xs font-semibold">
                    {payload[0].payload.month}
                  </p>
                )
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
          }
        />
        <Line type="monotone" dataKey="revenue" stroke="#ffffff" dot={false} />
      </AreaChart>
    </ChartContainer>
  )
}
