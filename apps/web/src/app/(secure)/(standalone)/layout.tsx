import { Layout } from '@repo/ui/layout'

const StandaloneLayout = async ({
  children
}: Readonly<React.PropsWithChildren>) => {
  return (
    <Layout>
      <Layout.Main>
        <Layout.MainContent>{children}</Layout.MainContent>
      </Layout.Main>
    </Layout>
  )
}

export default StandaloneLayout
