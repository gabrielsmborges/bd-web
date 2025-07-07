import Link from 'next/link'
import { BDIcon } from '@/assets/icons'
import { useTranslations } from 'next-intl'

const SidebarHomeLink = () => {
  const t = useTranslations('navigation')

  return (
    <Link
      href="/"
      className="flex flex-row items-center gap-2 group-data-[collapsible=icon]:justify-center"
    >
      <BDIcon iconName="byde" className="text-primary h-8 w-8" />
      <p className="text-lg font-bold group-data-[collapsible=icon]:hidden">
        {t('byde')}
      </p>
    </Link>
  )
}

export default SidebarHomeLink
