import { i18n } from '../i18n'

export const useLocale = () => {
  const { locale, availableLocales } = i18n.global

  const autoDetect = (): void => {
    const viewLocale = globalThis.navigator.languages[0]

    locale.value = ((availableLocales as string[]).includes(viewLocale) ? viewLocale : 'en') as 'en' | 'ja'
  }

  return { locale, autoDetect }
}
