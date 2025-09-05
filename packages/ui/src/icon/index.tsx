import { Banknote, Calendar, Clock, LucideProps, MapPin } from 'lucide-react'

const icons = {
  MapPin,
  Calendar,
  Clock,
  Banknote
}

interface IconProps extends LucideProps {
  name: keyof typeof icons
}

export const Icon = ({ name, ...props }: IconProps) => {
  const Icon = icons[name]

  return <Icon {...props} />
}
