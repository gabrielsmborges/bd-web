import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { CircleIcon } from 'lucide-react'

import { cn } from '@repo/ui/lib/utils'
import { Label } from './label'

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('grid gap-3', className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        'border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

const BigRadio = ({
  value,
  label,
  description,
  fieldValue
}: {
  value: string
  label: string
  description: string
  fieldValue: string
}) => {
  const selected = value === fieldValue

  return (
    <Label
      className={cn(
        'flex flex-1 cursor-pointer items-center gap-3 rounded-lg border p-4',
        {
          'bg-white': selected
        }
      )}
    >
      <RadioGroupPrimitive.Item
        value={value}
        id={value}
        data-slot="radio-group-item"
        className={cn(
          'border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aspect-square size-4 shrink-0 rounded-full border text-black shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
          {
            'border-black': selected
          }
        )}
      >
        <RadioGroupPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="relative flex items-center justify-center"
        >
          <CircleIcon
            className={cn(
              'absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2',
              {
                'fill-white': !selected,
                'fill-black': selected
              }
            )}
          />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      <div>
        <p
          className={cn('text-sm font-medium', {
            'text-black': selected
          })}
        >
          {label}
        </p>
        <p className="text-muted-foreground text-xs font-normal">
          {description}
        </p>
      </div>
    </Label>
  )
}

export { BigRadio, RadioGroup, RadioGroupItem }
