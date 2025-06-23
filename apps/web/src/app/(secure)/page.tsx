import { UserButton } from '@clerk/nextjs'
import { Button } from '@repo/ui/components'

export default function Home() {
  return (
    <div>
      <UserButton />
      <p className="font-bold">Secure Page</p>
      <Button>Click me</Button>
    </div>
  )
}
