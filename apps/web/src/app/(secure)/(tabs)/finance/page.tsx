import { Layout } from '@repo/ui/layout'

const SecureIndexPage = async () => {
  return (
    <div className="flex flex-col gap-2">
      <Layout.MainHeader className="flex flex-row items-center gap-4">
        <Layout.SidebarTrigger />
        <p className="text-xl font-bold">Finance</p>
      </Layout.MainHeader>
      <div className="flex h-full w-full items-center justify-center">
        <h1>Finance</h1>
      </div>
    </div>
  )
}

export default SecureIndexPage
