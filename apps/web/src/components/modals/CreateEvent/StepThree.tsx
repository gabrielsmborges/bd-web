import { Button } from '@repo/ui/components/button'
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@repo/ui/components/dialog'

import { useTranslations } from 'next-intl'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'
import {
  CreateEventSchema,
  createEventStepThreeSchema,
  CreateEventStepThreeSchema,
  SalesEnd,
  SalesStart
} from './schema'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@repo/ui/components/form'
import Calendar24 from '@repo/ui/components/calendar-24'
import { zodResolver } from '@hookform/resolvers/zod'

import { RadioGroup, RadioGroupItem } from '@repo/ui/components/radio-group'
import { Label } from '@repo/ui/components/label'
import { Input } from '@repo/ui/components/input'
import { useEffect, useMemo, useState } from 'react'

dayjs.extend(utc)
dayjs.extend(timezone)

export const StepThree = ({
  formData,
  setFormData,
  incrementStep,
  decrementStep
}: {
  formData?: CreateEventSchema
  setFormData: (data: CreateEventSchema) => void
  incrementStep: () => void
  decrementStep: () => void
}) => {
  const navigationT = useTranslations('navigation')
  const t = useTranslations('modals.createEvent.stepThree')
  const now = dayjs().toDate()

  const defaultValues = useMemo(() => {
    return {
      salesEnd: {
        type: formData?.salesEnd?.type || SalesEnd.EVENT_START,
        // @ts-expect-error - salesEndDate is not defined in the schema
        date: formData?.salesEnd?.date || formData?.startDate
      },
      salesStart: {
        type: formData?.salesStart?.type || SalesStart.NOW,
        // @ts-expect-error - salesStartDate is not defined in the schema
        date: formData?.salesStart?.date || undefined
      },
      quantity: formData?.quantity || 0
    }
  }, [formData])

  const form = useForm<CreateEventStepThreeSchema>({
    resolver: zodResolver(createEventStepThreeSchema(formData!.startDate)),
    defaultValues
  })

  const { control, formState, watch, handleSubmit } = form

  const salesStart = watch('salesStart.type')
  const salesEnd = watch('salesEnd.type')
  const [salesStartTime, setSalesStartTime] = useState<string>('')
  const [salesEndTime, setSalesEndTime] = useState<string>('')

  const submitHandler = (data: CreateEventStepThreeSchema) => {
    setFormData({
      ...formData,
      ...data
    } as CreateEventSchema)
    incrementStep()
  }

  useEffect(() => {
    if (salesStart === SalesStart.LATER) {
      form.setValue('salesStart.date', defaultValues.salesStart.date || now)
    }
  }, [salesStart, form, formData, defaultValues.salesStart.date, now])

  useEffect(() => {
    if (salesEnd === SalesEnd.SCHEDULE) {
      form.setValue('salesEnd.date', defaultValues.salesEnd.date || now)
    }
  }, [salesEnd, form, formData, defaultValues.salesEnd.date, now])

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={handleSubmit(submitHandler)}>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <FormField
              control={control}
              name="salesStart.type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(`fields.salesStart.title`)}</FormLabel>

                  <FormControl>
                    <div className="flex gap-2">
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value={SalesStart.NOW}
                            id="salesStartNow"
                          />
                          <Label htmlFor="salesStartNow">
                            {t(`fields.salesStart.now`)}
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value={SalesStart.LATER}
                            id="salesStartLater"
                          />
                          <Label htmlFor="salesStartLater">
                            {t(`fields.salesStart.later`)}
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {salesStart === SalesStart.LATER ? (
              <FormField
                control={control}
                name="salesStart.date"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Calendar24
                          minDate={now}
                          date={new Date(field.value)}
                          setDate={field.onChange}
                          time={salesStartTime}
                          setTime={(val) => {
                            setSalesStartTime(val)
                            const [h, m] = val
                              .split(':')
                              .map((v) => parseInt(v, 10))
                            const updated = dayjs(field.value || now)
                              .set('hour', h)
                              .set('minute', m)
                              .toDate()
                            form.setValue('salesStart.date', updated, {
                              shouldValidate: true
                            })
                          }}
                          error={
                            // @ts-expect-error - optional chaining across nested type
                            !!formState?.errors?.salesStart?.date?.message ||
                            !!formState?.errors?.salesStart?.message
                          }
                        />
                      </FormControl>

                      {
                        // @ts-expect-error - optional chaining across nested type
                        (formState?.errors?.salesStart?.date?.message ||
                          formState?.errors?.salesStart?.message) && (
                          <FormMessage>
                            {
                              // @ts-expect-error - optional chaining across nested type
                              formState?.errors?.salesStart?.date?.message ||
                                formState?.errors?.salesStart?.message
                            }
                          </FormMessage>
                        )
                      }
                    </FormItem>
                  )
                }}
              />
            ) : (
              <p className="text-muted-foreground text-sm">
                {t('nowDescription')}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <FormField
              control={control}
              name="salesEnd.type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(`fields.salesEnd.title`)}</FormLabel>

                  <FormControl>
                    <div className="flex gap-2">
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value={SalesEnd.EVENT_START}
                            id="salesEndEventStart"
                          />
                          <Label htmlFor="salesEndEventStart">
                            {t(`fields.salesEnd.whenEventStarts`)}
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value={SalesEnd.SCHEDULE}
                            id="salesEndSchedule"
                          />
                          <Label htmlFor="salesEndSchedule">
                            {t(`fields.salesEnd.schedule`)}
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {salesEnd === SalesEnd.SCHEDULE ? (
              <FormField
                control={control}
                name="salesEnd.date"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Calendar24
                        minDate={now}
                        maxDate={formData?.startDate}
                        date={field.value}
                        setDate={field.onChange}
                        time={salesEndTime}
                        setTime={(val) => {
                          setSalesEndTime(val)
                          const [h, m] = val
                            .split(':')
                            .map((v) => parseInt(v, 10))
                          const updated = dayjs(field.value || now)
                            .set('hour', h)
                            .set('minute', m)
                            .toDate()
                          form.setValue('salesEnd.date', updated, {
                            shouldValidate: true
                          })
                        }}
                        error={
                          // @ts-expect-error - optional chaining across nested type
                          !!formState?.errors?.salesEnd?.date?.message ||
                          !!formState?.errors?.salesEnd?.message
                        }
                      />
                    </FormControl>

                    {
                      // @ts-expect-error - optional chaining across nested type
                      (formState?.errors?.salesEnd?.date?.message ||
                        formState?.errors?.salesEnd?.message) && (
                        <FormMessage>
                          {
                            // @ts-expect-error - optional chaining across nested type
                            formState?.errors?.salesEnd?.date?.message ||
                              formState?.errors?.salesEnd?.message
                          }
                        </FormMessage>
                      )
                    }
                  </FormItem>
                )}
              />
            ) : (
              <p className="text-muted-foreground text-sm">
                {t('whenEventStartsDescription')}
              </p>
            )}
          </div>

          <FormField
            control={control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t(`fields.quantity.title`)}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t(`fields.quantity.placeholder`)}
                  />
                </FormControl>

                {formState?.errors?.['quantity'] && (
                  <FormMessage>
                    {formState?.errors['quantity']?.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={decrementStep}>
            {navigationT('back')}
          </Button>
          <Button type="submit" className="cursor-pointer">
            {navigationT('confirm')}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
