import { Layout } from '@repo/ui/layout'
import HeaderTitle from '@/components/header/HeaderTitle'
import { BDIcon } from '@/assets/icons'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

const StandaloneLayout = async ({
  children
}: Readonly<React.PropsWithChildren>) => {
  return (
    <Layout>
      <Layout.Main>
        <Layout.MainHeader className="flex flex-row items-center gap-4">
          <Link href={ROUTES.DASHBOARD}>
            <BDIcon iconName="arrowLeft" className="h-6 w-6" />
          </Link>
          <HeaderTitle />
        </Layout.MainHeader>

        <Layout.MainContent>{children}</Layout.MainContent>
      </Layout.Main>
    </Layout>
  )
}

export default StandaloneLayout
