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

dayjs.extend(utc)
dayjs.extend(timezone)

export const StepTwo = ({
  // setFormData,
  // incrementStep,
  decrementStep
}: {
  // setFormData: (data: CreateEventSchema) => void
  // incrementStep: () => void
  decrementStep: () => void
}) => {
  const navigationT = useTranslations('navigation')

  return (
    // <Form>
    <form className="space-y-8">
      <DialogHeader>
        <DialogTitle>Step 2</DialogTitle>
        <DialogDescription>Step 2 description</DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button variant="outline" onClick={decrementStep}>
          {navigationT('back')}
        </Button>
        <Button type="submit" className="cursor-pointer">
          {navigationT('confirm')}
        </Button>
      </DialogFooter>
    </form>
    // </Form>
  )
}
