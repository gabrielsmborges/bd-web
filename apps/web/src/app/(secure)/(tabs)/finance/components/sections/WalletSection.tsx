import { BDIcon } from '@/assets/icons'
import { formatCurrency } from '@/util/number'
import { Button } from '@repo/ui/components/button'
import { useTranslations } from 'next-intl'

export const WalletSection = () => {
  const t = useTranslations('dashboard')
  const navigationT = useTranslations('navigation')

  return (
    <section className="justify-start space-y-4">
      <p className="text-sm font-medium text-white/50">{t('wallet')}</p>

      <div className="space-y-2">
        <p className="text-4xl font-bold">
          {formatCurrency(18459.9, {
            currency: 'GBP'
          })}
        </p>

        <Button className="w-fit">
          <BDIcon iconName="withdraw" className="h-4 w-4" />
          {navigationT('withdraw')}
        </Button>
      </div>
    </section>
  )
}
