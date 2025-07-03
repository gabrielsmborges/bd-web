import { OrganizationList } from '@clerk/nextjs'

const SecureIndexPage = async () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <OrganizationList hidePersonal />
    </div>
  )
}

export default SecureIndexPage
