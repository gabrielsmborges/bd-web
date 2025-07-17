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
import { CreateEventStepOneSchema } from './schema'
import { StepTwo } from './StepTwo'

export const CreateEventModal = () => {
  const navigationT = useTranslations('navigation')

  const [, stepOneData] = useState<CreateEventStepOneSchema>()
  const [step, setStep] = useState(1)

  const incrementStep = () => setStep(step + 1)
  const decrementStep = () => setStep(step - 1)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <BDIcon iconName="plus" className="h-4 w-4" />
          {navigationT('createEvent')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        {step === 1 && (
          <StepOne setFormData={stepOneData} incrementStep={incrementStep} />
        )}
        {step === 2 && (
          <StepTwo
            // setFormData={setFormData}
            // incrementStep={incrementStep}
            decrementStep={decrementStep}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
