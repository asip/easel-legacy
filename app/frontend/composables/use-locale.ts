import { i18n } from '../utils'

export const useLocale = (viewLocale: string) => {
  const { locale, availableLocales } = i18n.global

  const autoDetect = () => {
    if(viewLocale) {
      locale.value = ((availableLocales as string[]).includes(viewLocale) ? viewLocale : 'en') as 'en' | 'ja'
    }
  }

  return { locale, autoDetect }
}
