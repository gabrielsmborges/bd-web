'use client'

import { BDIcon } from '@/assets/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@repo/ui/components/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@repo/ui/components/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@repo/ui/components/form'
import { Input } from '@repo/ui/components/input'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { createEvent } from './action'
import { CreateEventSchema } from './schema'

export const CreateEventModal = () => {
  const t = useTranslations('modals.createEvent')
  const navigationT = useTranslations('navigation')

  const form = useForm<CreateEventSchema>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      link: '',
      startDate: new Date(),
      includeDuration: false
    }
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <BDIcon iconName="plus" className="h-4 w-4" />
          {navigationT('createEvent')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form action={createEvent}>
            <DialogHeader>
              <DialogTitle>{t('title')}</DialogTitle>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event title</FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormDescription>dcnke</FormDescription>

                    {form.formState.errors.title && (
                      <FormMessage>
                        {form.formState.errors.title.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </DialogHeader>
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
      </DialogContent>
    </Dialog>
  )
}
