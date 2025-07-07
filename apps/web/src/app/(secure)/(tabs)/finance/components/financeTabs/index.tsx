import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@repo/ui/components/tabs'
import PayoutsTab from './Payouts'
import BankAccountsTab from './BankAccounts'
import { cn } from '@repo/ui/lib/utils'
import { useTranslations } from 'next-intl'

enum FinanceTab {
  PAYOUTS = 'payouts',
  BANK_ACCOUNTS = 'bank-accounts'
}

const FinanceTabs = () => {
  const t = useTranslations('finance')

  return (
    <Tabs defaultValue={FinanceTab.PAYOUTS} asChild>
      <section className={cn('min-h-0 w-full flex-1')}>
        <TabsList className="h-[unset] bg-black/20">
          <TabsTrigger
            value={FinanceTab.PAYOUTS}
            className="cursor-pointer px-6 py-2"
          >
            {t('payouts')}
          </TabsTrigger>
          <TabsTrigger
            value={FinanceTab.BANK_ACCOUNTS}
            className="cursor-pointer px-6 py-2"
          >
            {t('bankAccounts')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value={FinanceTab.PAYOUTS} asChild>
          <PayoutsTab />
        </TabsContent>
        <TabsContent value={FinanceTab.BANK_ACCOUNTS} asChild>
          <BankAccountsTab />
        </TabsContent>
      </section>
    </Tabs>
  )
}

export default FinanceTabs
