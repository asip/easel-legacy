import { Maybe } from '@regle/core'

export function formatLocaleDate(locale: string, date: Maybe<string | Date>) {
  return date ? new Intl.DateTimeFormat(locale, { dateStyle: 'short' }).format(new Date(date)) : ''
}
