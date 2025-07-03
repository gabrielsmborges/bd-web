import Link from 'next/link'
import { BDIcon } from '@/assets/icons'

const SidebarHomeLink = () => {
  return (
    <Link
      href="/"
      className="flex flex-row items-center gap-2 group-data-[collapsible=icon]:justify-center"
    >
      <BDIcon iconName="byde" className="h-8 w-8" />
      <p className="text-lg font-bold group-data-[collapsible=icon]:hidden">
        byde
      </p>
    </Link>
  )
}

export default SidebarHomeLink
