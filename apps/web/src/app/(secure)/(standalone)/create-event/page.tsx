import { getTranslations } from 'next-intl/server'

const SecureIndexPage = async () => {
  const t = await getTranslations('navigation')

  return (
    <div className="flex h-full w-full items-center justify-center">
      <h1>{t('createEvent')}</h1>
    </div>
  )
}

export default SecureIndexPage
