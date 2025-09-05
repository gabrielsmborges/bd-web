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
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Currency,
  MAP_CURRENCY_TO_SYMBOL,
  CreateEventStepTwoSchema,
  createEventStepTwoSchema,
  CreateEventSchema
} from './schema'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@repo/ui/components/form'
import { BigRadio, RadioGroup } from '@repo/ui/components/radio-group'

import { Checkbox } from '@repo/ui/components/checkbox'
import { Input } from '@repo/ui/components/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@repo/ui/components/select'
import { formatCurrency } from '@/util/number'
import { cn } from '@repo/ui/lib/utils'
import { useFee } from './useFee'
import { useEffect } from 'react'
import { Pricing } from '@repo/api'

dayjs.extend(utc)
dayjs.extend(timezone)

const PricingBreakdownText = ({
  variant = 'primary',
  children
}: {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
}) => {
  const priceBreakDownClasses = {
    primary: cn('text-primary-foreground text-sm font-medium'),
    secondary: cn('text-muted-foreground text-sm font-normal')
  }

  return (
    <p
      className={cn(
        variant === 'primary'
          ? priceBreakDownClasses.primary
          : variant === 'secondary'
            ? priceBreakDownClasses.secondary
            : ''
      )}
    >
      {children}
    </p>
  )
}

export const StepTwo = ({
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
  const t = useTranslations('modals.createEvent.stepTwo')

  const form = useForm<CreateEventStepTwoSchema>({
    resolver: zodResolver(createEventStepTwoSchema),
    defaultValues: {
      pricing: formData?.pricing || Pricing.FREE,
      // @ts-expect-error - currency is not defined in the schema
      currency: formData?.currency || Currency.GBP,
      // @ts-expect-error - price is not defined in the schema
      price: formData?.price || 0,
      // @ts-expect-error - absorbFees is not defined in the schema
      absorbFees: formData?.absorbFees || false
    }
  })

  const { control, handleSubmit } = form

  const pricing = form.watch('pricing')
  const price = Number(form.watch('price')) || 0
  const currency = form.watch('currency')
  const absorbFees = form.watch('absorbFees')

  // set the default currency to GBP
  useEffect(() => {
    if (pricing === Pricing.PAID && !currency) {
      form.setValue('currency', Currency.GBP)
    }
  }, [pricing, currency, form])

  const {
    ticketServiceFee,
    ticketProcessingFee,
    ticketCostToBuyer,
    ticketPayout,
    serviceFeeText,
    processingFeeText
  } = useFee({
    price,
    currency,
    absorbFees
  })

  const submitHandler = (data: CreateEventStepTwoSchema) => {
    setFormData({ ...formData, ...data } as CreateEventSchema)
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
            name="pricing"
            render={({ field }) => (
              <RadioGroup
                {...field}
                onValueChange={field.onChange}
                className="flex gap-3"
              >
                <BigRadio
                  value={Pricing.FREE}
                  label={t('pricing.free.title')}
                  description={t('pricing.free.subtitle')}
                  fieldValue={field.value}
                />

                <BigRadio
                  value={Pricing.PAID}
                  label={t('pricing.paid.title')}
                  description={t('pricing.paid.subtitle')}
                  fieldValue={field.value}
                />
              </RadioGroup>
            )}
          />
          {pricing === Pricing.PAID && (
            <>
              <div>
                <div className="flex w-full gap-2">
                  <FormField
                    control={control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>{t(`fields.${field.name}.title`)}</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={Currency.GBP}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={t(
                                    `fields.${field.name}.placeholder`
                                  )}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(Currency).map(([key, value]) => (
                                <SelectItem key={key} value={value}>
                                  <b>{MAP_CURRENCY_TO_SYMBOL[value]}</b> {key}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="flex-4">
                        <FormLabel>{t(`fields.${field.name}.title`)}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder={t(`fields.${field.name}.placeholder`)}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={control}
                name="absorbFees"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="flex gap-2">
                      <div>
                        <Checkbox
                          id={`${field.name}-checkbox`}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        {/* remove flex */}
                        <FormLabel
                          htmlFor={`${field.name}-checkbox`}
                          className="block"
                        >
                          {t(`fields.${field.name}.title`)}{' '}
                          <span className="text-muted-foreground text-xs font-thin">
                            ({t(`fields.${field.name}.subtitle`)})
                          </span>
                        </FormLabel>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                {/* Ticket price */}
                <div className="flex justify-between">
                  <PricingBreakdownText variant="primary">
                    {t('priceBreakdown.ticketPrice')}
                  </PricingBreakdownText>
                  <PricingBreakdownText variant="secondary">
                    {price && currency
                      ? formatCurrency(price, {
                          currency,
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })
                      : '-'}
                  </PricingBreakdownText>
                </div>

                {/* Service fee */}
                <div>
                  <PricingBreakdownText variant="primary">
                    {t('priceBreakdown.serviceFee')}
                  </PricingBreakdownText>
                  <div className="flex justify-between">
                    <PricingBreakdownText variant="secondary">
                      {t('priceBreakdown.serviceFeePerTicket', {
                        price: serviceFeeText
                      })}
                    </PricingBreakdownText>
                    <PricingBreakdownText variant="secondary">
                      {ticketServiceFee}
                    </PricingBreakdownText>
                  </div>
                </div>

                {/* Processing fee */}
                <div>
                  <PricingBreakdownText variant="primary">
                    {t('priceBreakdown.processingFee')}
                  </PricingBreakdownText>
                  <div className="flex justify-between">
                    <PricingBreakdownText variant="secondary">
                      {t('priceBreakdown.processingFeePerTicket', {
                        price: processingFeeText
                      })}
                    </PricingBreakdownText>
                    <PricingBreakdownText variant="secondary">
                      {ticketProcessingFee}
                    </PricingBreakdownText>
                  </div>
                </div>

                {/* horizontal line */}
                <div className="bg-border h-px w-full" />

                {/* cost to buyer */}
                <div className="flex justify-between">
                  <PricingBreakdownText variant="primary">
                    {t('priceBreakdown.costToBuyer')}
                  </PricingBreakdownText>
                  <PricingBreakdownText variant="secondary">
                    {ticketCostToBuyer}
                  </PricingBreakdownText>
                </div>
              </div>

              {/* your earnings */}
              <div className="flex justify-between font-medium">
                <p>{t('priceBreakdown.yourPayout')}</p>
                <p className="font-bold">{ticketPayout}</p>
              </div>
            </>
          )}
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
