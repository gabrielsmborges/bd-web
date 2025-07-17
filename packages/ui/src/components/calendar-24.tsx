import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'
import dayjs from 'dayjs'

import { Button } from '@repo/ui/components/button'
import { Calendar } from '@repo/ui/components/calendar'
import { Input } from '@repo/ui/components/input'
import { Label } from '@repo/ui/components/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@repo/ui/components/popover'

const MIN_DATE = new Date('1970-01-01')
interface Calendar24Props {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  minDate?: Date
  error: boolean
}

export default function Calendar24({
  date,
  setDate,
  minDate,
  error
}: Calendar24Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-32 justify-between font-normal"
              aria-invalid={error}
            >
              {date ? date.toLocaleDateString() : 'Select date'}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDate(date)
                setOpen(false)
              }}
              disabled={{
                before: minDate ? minDate : MIN_DATE
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Input
          type="time"
          aria-invalid={error}
          value={date ? dayjs(date).format('HH:mm') : undefined}
          // min={
          //   date
          //     ? dayjs(date).isSame(dayjs(), 'day')
          //       ? dayjs().format('HH:mm')
          //       : undefined
          //     : undefined
          // }
          onChange={(e) => {
            const [hours, minutes] = e.target.value.split(':')
            const newDate = dayjs(date)
              .set('hour', parseInt(hours ?? '0'))
              .set('minute', parseInt(minutes ?? '0'))
              .toDate()
            setDate(newDate)
          }}
        />
      </div>
    </div>
  )
}
