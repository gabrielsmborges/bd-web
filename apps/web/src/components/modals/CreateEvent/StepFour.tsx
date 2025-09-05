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
  createEventStepFourSchema,
  CreateEventStepFourSchema,
  GoLive
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

import { BigRadio, RadioGroup } from '@repo/ui/components/radio-group'
import { useEffect } from 'react'

dayjs.extend(utc)
dayjs.extend(timezone)

export const StepFour = ({
  formData,
  setFormData,
  decrementStep,
  handleSubmit: handleSubmitParent,
  isLoading,
  setIsLoading
}: {
  formData?: CreateEventSchema
  setFormData: (data: CreateEventSchema) => void
  decrementStep: () => void
  handleSubmit: (data: CreateEventSchema) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}) => {
  const navigationT = useTranslations('navigation')
  const t = useTranslations('modals.createEvent.stepFour')

  const form = useForm<CreateEventStepFourSchema>({
    resolver: zodResolver(createEventStepFourSchema),
    defaultValues: {
      goLive: {
        type: GoLive.NOW
      }
    }
  })

  const { control, formState, watch, handleSubmit } = form

  const goLive = watch('goLive.type')

  // @ts-expect-error - TODO: fix this
  const goLiveDateError = formState?.errors?.goLiveDate?.message

  const submitHandler = (data: CreateEventStepFourSchema) => {
    setIsLoading(true)
    setFormData({
      ...formData,
      ...data
    } as CreateEventSchema)

    handleSubmitParent({ ...formData, ...data } as CreateEventSchema)
  }

  useEffect(() => {
    if (goLive === GoLive.SCHEDULE) {
      form.setValue('goLive.date', formData?.startDate || new Date())
    }
  }, [goLive, form, formData])

  useEffect(() => {
    if (goLive === GoLive.NOW) {
      form.setValue('goLive.date', new Date())
    }
  }, [goLive, form])

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={handleSubmit(submitHandler)}>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <FormField
            control={control}
            name="goLive.type"
            render={({ field }) => (
              <RadioGroup
                {...field}
                onValueChange={field.onChange}
                className="flex gap-3"
              >
                <BigRadio
                  value={GoLive.NOW}
                  label={t('now.title')}
                  description={t('now.subtitle')}
                  fieldValue={field.value}
                />

                <BigRadio
                  value={GoLive.SCHEDULE}
                  label={t('schedule.title')}
                  description={t('schedule.subtitle')}
                  fieldValue={field.value}
                />
              </RadioGroup>
            )}
          />

          {goLive === GoLive.SCHEDULE && (
            <div className="flex gap-2">
              <FormField
                control={control}
                name="goLive.date"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>{t(`fields.goLiveDate.title`)}</FormLabel>

                    <FormControl>
                      <Calendar24
                        minDate={new Date()}
                        maxDate={formData?.startDate}
                        date={field.value}
                        setDate={field.onChange}
                        error={!!goLiveDateError}
                      />
                    </FormControl>
                    {goLiveDateError && (
                      <FormMessage>{goLiveDateError}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={decrementStep}>
            {navigationT('back')}
          </Button>
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={!formState.isValid || isLoading}
          >
            {t('publish')}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
