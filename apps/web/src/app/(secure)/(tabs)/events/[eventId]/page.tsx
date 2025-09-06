import { getBearerToken } from '@/util/api-server'
import { EventsAPI, Pricing } from '@repo/api'
import { EventStatusBadge } from '@/components/statusBadge'
import { Separator } from '@repo/ui/components/separator'
import dayjs from 'dayjs'
import { formatCurrency } from '@/util/number'
import { BDIcon } from '@/assets/icons'
import Image from 'next/image'
import { Layout } from '@repo/ui/layout'
import { getTranslations } from 'next-intl/server'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@repo/ui/components/dropdown-menu'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@repo/ui/components/breadcrumb'
import { ROUTES } from '@/constants/routes'
import { Button } from '@repo/ui/components/button'

type EventHeaderProps = {
  eventName: string
}

const EventHeader = async ({ eventName }: EventHeaderProps) => {
  const t = await getTranslations('navigation')

  return (
    <Layout.MainHeader className="flex flex-row items-center justify-between gap-4">
      <div className="flex flex-row items-center gap-4">
        <Layout.SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="font-semibold text-white">
              <BreadcrumbLink href={ROUTES.EVENTS}>
                {t('events')}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="text-muted-foreground">
              <BreadcrumbLink>{eventName}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-row items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size={'icon'}>
              <BDIcon iconName="ellipsis" className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <BDIcon iconName="edit" className="h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <BDIcon iconName="delete" className="text-destructive h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Layout.MainHeader>
  )
}

type EventParams = Promise<{ eventId: string }>

export default async function EventPage({ params }: { params: EventParams }) {
  const { eventId } = await params

  const eventsAPI = new EventsAPI({
    token: await getBearerToken()
  })
  const imageUrl =
    'https://saint.church/wordpress/wp-content/uploads/2025/04/jpg.001-1.jpeg'

  const event = await eventsAPI.getEvent(eventId)

  return (
    <>
      <EventHeader eventName={event.title} />
      <div className="relative h-[450px] w-full">
        <Image
          src={imageUrl}
          alt={event.title}
          height={450}
          width={1000}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%'
          }}
          className="rounded-lg"
          priority
        />
      </div>

      <div className="flex flex-row items-center justify-between">
        <h2 className="text-2xl font-semibold">{event.title}</h2>
        <EventStatusBadge status={event.status} />
      </div>

      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-row items-center gap-2">
          <BDIcon
            iconName="mapPin"
            className="stroke-muted-foreground h-4 w-4"
            strokeWidth={1.5}
          />
          <p className="text-muted-foreground text-xs">{event.location}</p>
        </div>

        <Separator orientation="vertical" />

        <div className="flex flex-row items-center gap-2">
          <BDIcon
            iconName="calendar"
            className="stroke-muted-foreground h-4 w-4"
            strokeWidth={1.5}
          />
          <p className="text-muted-foreground text-xs">
            {dayjs(event.startDate).format('MMM D, YYYY')}
          </p>
        </div>

        <Separator orientation="vertical" />

        <div className="flex flex-row items-center gap-2">
          <BDIcon
            iconName="clock"
            className="stroke-muted-foreground h-4 w-4"
            strokeWidth={1.5}
          />
          <p className="text-muted-foreground text-xs">
            {dayjs(event.startDate).format('HH:mm')}
          </p>
        </div>

        <Separator orientation="vertical" />

        <div className="flex flex-row items-center gap-2">
          <BDIcon
            iconName="banknote"
            className="stroke-muted-foreground h-4 w-4"
            strokeWidth={1.5}
          />
          <p className="text-muted-foreground text-xs">
            {event.pricing.type === Pricing.FREE
              ? 'Free'
              : formatCurrency(event.pricing.price, {
                  currency: event.pricing.currency
                })}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <div className="max-w-3xl">
          <h3 className="text-md font-semibold">Description</h3>
          <p className="text-sm">{event.description}</p>
        </div>

        <Separator />

        <div className="max-w-3xl">
          <h3 className="text-md font-semibold">Location</h3>
          <p className="text-sm">{event.location}</p>
        </div>
      </div>
    </>
  )
}
