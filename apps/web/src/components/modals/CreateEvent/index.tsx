'use client'

import { BDIcon } from '@/assets/icons'

import { Button } from '@repo/ui/components/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from '@repo/ui/components/dialog'

import { useTranslations } from 'next-intl'

import { StepOne } from './StepOne'
import { useState } from 'react'
import { CreateEventSchema } from './schema'
import { StepTwo } from './StepTwo'
import { StepThree } from './StepThree'
import { StepFour } from './StepFour'
import { submitEvent } from './action'

export const CreateEventModal = () => {
  const navigationT = useTranslations('navigation')

  const [isOpen, setIsOpen] = useState(false)

  const [formData, setFormData] = useState<CreateEventSchema>()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)

  const incrementStep = () => setStep(step + 1)
  const decrementStep = () => setStep(step - 1)

  const handleSubmit = async (data: CreateEventSchema) => {
    if (!formData) return

    await submitEvent(data)

    setIsLoading(false)
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <BDIcon iconName="plus" className="h-4 w-4" />
          {navigationT('createEvent')}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-h-[90vh] overflow-scroll"
        onClose={() => {
          setFormData(undefined)
          setStep(1)
        }}
      >
        {step === 1 && (
          <StepOne
            setFormData={setFormData}
            formData={formData}
            incrementStep={incrementStep}
          />
        )}
        {step === 2 && (
          <StepTwo
            formData={formData}
            setFormData={setFormData}
            incrementStep={incrementStep}
            decrementStep={decrementStep}
          />
        )}
        {step === 3 && (
          <StepThree
            formData={formData}
            setFormData={setFormData}
            incrementStep={incrementStep}
            decrementStep={decrementStep}
          />
        )}
        {step === 4 && (
          <StepFour
            formData={formData}
            setFormData={setFormData}
            decrementStep={decrementStep}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
