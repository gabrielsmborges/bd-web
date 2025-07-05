import FinanceTabs from './components/financeTabs'
import { Header } from './components/Header'
import { WalletSection } from './components/sections/WalletSection'

const FinancePage = async () => {
  return (
    <>
      <Header />

      <div className="flex h-full flex-1 flex-col gap-8 overflow-hidden">
        <WalletSection />

        <FinanceTabs />
      </div>
    </>
  )
}

export default FinancePage
