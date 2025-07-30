import { getRequestConfig } from 'next-intl/server'
import en from '@/../messages/en'

const MAP_LOCALE_TO_MESSAGES = {
  en
}

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = 'en'

  return {
    locale,
    messages: MAP_LOCALE_TO_MESSAGES[locale]
  }
})
