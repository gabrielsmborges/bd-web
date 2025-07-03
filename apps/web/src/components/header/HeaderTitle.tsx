'use client'

import { MAP_ROUTE_TO_TITLE } from '@/util/routes/title'
import { usePathname } from 'next/navigation'

const HeaderTitle = () => {
  const pathname = usePathname()
  const title = MAP_ROUTE_TO_TITLE[pathname as keyof typeof MAP_ROUTE_TO_TITLE]

  return <p className="text-xl font-bold">{title}</p>
}

export default HeaderTitle
