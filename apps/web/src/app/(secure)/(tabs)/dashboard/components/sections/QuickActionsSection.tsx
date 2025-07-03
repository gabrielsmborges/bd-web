import { Button } from '@repo/ui/components/button'
import { DashboardSection } from '../DashboardSection'
import { BDIcon } from '@/assets/icons'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

export const QuickActionsSection = () => (
  <DashboardSection title="Quick Actions">
    <div className="flex gap-2">
      <Button>
        <BDIcon iconName="plus" className="h-4 w-4" />
        Create Event
      </Button>
      <Button asChild>
        <Link href={ROUTES.EVENTS}>
          <BDIcon iconName="calendar" className="h-4 w-4" />
          View Events
        </Link>
      </Button>
    </div>
  </DashboardSection>
)
