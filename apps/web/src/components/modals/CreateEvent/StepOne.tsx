import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@repo/ui/components/button'
import Calendar24 from '@repo/ui/components/calendar-24'
import { Checkbox } from '@repo/ui/components/checkbox'
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@repo/ui/components/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@repo/ui/components/form'
import { Input } from '@repo/ui/components/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem
} from '@repo/ui/components/select'
import { Textarea } from '@repo/ui/components/textarea'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { useTimezoneSelect } from 'react-timezone-select'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'
import { createEventStepOneSchema, CreateEventStepOneSchema } from './schema'

dayjs.extend(utc)
dayjs.extend(timezone)

export const StepOne = ({
  setFormData,
  incrementStep
}: {
  setFormData: (data: CreateEventStepOneSchema) => void
  incrementStep: () => void
}) => {
  const t = useTranslations('modals.createEvent')
  const navigationT = useTranslations('navigation')
  const { options, parseTimezone } = useTimezoneSelect({
    labelStyle: 'abbrev',
    displayValue: 'GMT'
  })

  const userTimezone = dayjs.tz.guess()

  const today = dayjs()

  const form = useForm<CreateEventStepOneSchema>({
    resolver: zodResolver(createEventStepOneSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      link: undefined,
      includeDuration: false,
      startDate: today.toDate(),
      timezoneUTCOffset:
        options.find((option) => option.value === userTimezone)?.offset || 0
    }
  })

  const { control, handleSubmit, formState, watch } = form

  const addEndTime = watch('includeDuration')
  const startDate = watch('startDate')

  const submitHandler = (data: CreateEventStepOneSchema) => {
    setFormData(data)
    incrementStep()
  }

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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t(`fields.${field.name}.title`)}</FormLabel>

                <FormControl>
                  <Input {...field} />
                </FormControl>

                {formState?.errors?.[field.name] && (
                  <FormMessage>
                    {formState?.errors[field.name]?.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t(`fields.${field.name}.title`)}</FormLabel>

                <FormControl>
                  <Textarea {...field} />
                </FormControl>

                {formState?.errors?.[field.name] && (
                  <FormMessage>
                    {formState?.errors[field.name]?.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t(`fields.${field.name}.title`)}</FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    aria-invalid={!!formState?.errors[field.name]}
                  />
                </FormControl>

                {formState?.errors?.[field.name] && (
                  <FormMessage>
                    {formState?.errors[field.name]?.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t(`fields.${field.name}.title`)}</FormLabel>

                <FormControl>
                  <Input {...field} value={field.value || ''} />
                </FormControl>

                {formState?.errors?.[field.name] && (
                  <FormMessage>
                    {formState?.errors[field.name]?.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="timezoneUTCOffset"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t(`fields.${field.name}.title`)}</FormLabel>

                <FormControl>
                  <Select
                    defaultValue={userTimezone}
                    onValueChange={(e) => {
                      const parsedTimezone = parseTimezone(e)

                      field.onChange(parsedTimezone.offset)
                    }}
                  >
                    <SelectTrigger
                      className="w-[180px]"
                      aria-invalid={!!formState?.errors[field.name]}
                    >
                      <SelectValue placeholder="Select a timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Timezones</SelectLabel>
                        {options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>

                {formState?.errors?.[field.name] && (
                  <FormMessage>
                    {formState?.errors[field.name]?.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t(`fields.${field.name}.title`)}</FormLabel>

                <FormControl>
                  <Calendar24
                    minDate={new Date()}
                    date={new Date(field.value)}
                    setDate={field.onChange}
                    error={!!formState?.errors[field.name]?.message}
                  />
                </FormControl>

                {formState?.errors?.[field.name] && (
                  <FormMessage>
                    {formState?.errors[field.name]?.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="includeDuration"
            render={({ field }) => (
              <FormItem>
                <FormControl className="flex gap-2">
                  <div>
                    <Checkbox
                      id={`${field.name}-checkbox`}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FormLabel
                      htmlFor={`${field.name}-checkbox`}
                      className="font-light opacity-50"
                    >
                      {t(`fields.${field.name}.title`)}
                    </FormLabel>
                  </div>
                </FormControl>

                {formState?.errors?.[field.name] && (
                  <FormMessage>
                    {formState?.errors[field.name]?.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>

        {addEndTime && (
          <FormField
            control={control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t(`fields.${field.name}.title`)}</FormLabel>

                <FormControl>
                  <Calendar24
                    minDate={startDate}
                    date={field.value}
                    setDate={field.onChange}
                    error={!!formState?.errors[field.name]?.message}
                  />
                </FormControl>

                {formState?.errors?.[field.name] && (
                  <FormMessage>
                    {formState?.errors[field.name]?.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{navigationT('cancel')}</Button>
          </DialogClose>
          <Button type="submit" className="cursor-pointer">
            {navigationT('confirm')}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
