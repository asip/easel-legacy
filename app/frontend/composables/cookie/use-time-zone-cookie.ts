import { CookieRef } from '@/types'
import { useCookieValue } from './use-cookie-value'

export const useTimeZoneCookie = function (cookie: CookieRef) {
  const { value: timeZone } = useCookieValue(cookie)

  return { timeZone }
}
