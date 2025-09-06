import { cn } from '@repo/ui/lib/utils'
import { BydeLogo } from './vector/byde'
import {
  Banknote,
  Calendar,
  LayoutDashboard,
  LucideProps,
  ReceiptText,
  Settings,
  ArrowLeft,
  Plus,
  Settings2,
  BanknoteArrowDown,
  X,
  Check,
  Loader,
  Eye,
  CircleDashed,
  Ellipsis,
  MapPin,
  Clock,
  Edit,
  Trash
} from 'lucide-react'

export const BDIcons = {
  layoutDashboard: LayoutDashboard,
  calendar: Calendar,
  receipt: ReceiptText,
  bankNote: Banknote,
  byde: BydeLogo,
  settings: Settings,
  arrowLeft: ArrowLeft,
  plus: Plus,
  settings2: Settings2,
  withdraw: BanknoteArrowDown,
  x: X,
  check: Check,
  loader: Loader,
  eye: Eye,
  circleDashed: CircleDashed,
  ellipsis: Ellipsis,
  mapPin: MapPin,
  clock: Clock,
  banknote: Banknote,
  edit: Edit,
  delete: Trash
}

interface BDIconProps extends LucideProps {
  iconName: BDIconName
}

export const BDIcon = ({ iconName, ...props }: BDIconProps) => {
  const Icon = BDIcons[iconName]
  return <Icon {...props} className={cn('h-4 w-4', props.className)} />
}

export type BDIconName = keyof typeof BDIcons
