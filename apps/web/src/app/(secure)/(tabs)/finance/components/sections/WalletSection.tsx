import { BDIcon } from '@/assets/icons'
import { formatCurrency } from '@/util/number'
import { Button } from '@repo/ui/components/button'

export const WalletSection = () => {
  return (
    <section className="justify-start space-y-4">
      <p className="text-sm font-medium text-white/50">Wallet</p>

      <div className="space-y-2">
        <p className="text-4xl font-bold">
          {formatCurrency(18459.9, {
            currency: 'GBP'
          })}
        </p>

        <Button className="w-fit">
          <BDIcon iconName="withdraw" className="h-4 w-4" />
          Withdraw
        </Button>
      </div>
    </section>
  )
}
