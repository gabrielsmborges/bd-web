import { BDIcon } from '@/assets/icons'
import { Button } from '@repo/ui/components/button'
import { Layout } from '@repo/ui/layout'
import Link from 'next/link'

const SecureIndexPage = async () => {
  return (
    <>
      <Layout.MainHeader className="flex flex-row items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="..">
            <BDIcon iconName="arrowLeft" />
          </Link>
        </Button>
        <h1 className="text-md font-bold">Settings</h1>
      </Layout.MainHeader>
      <Layout.MainContent>
        <p className="text-muted-foreground text-sm">
          Manage your account settings and preferences.
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-medium">Account</h2>
          </div>
        </div>
      </Layout.MainContent>
    </>
  )
}

export default SecureIndexPage
