import { useCookie, useCookieValue } from '@/composables'

export const useTimeZoneCookie = function () {
  const timeZoneCookie = useCookie('time_zone', { path: '/' })
  const timeZone = useCookieValue(timeZoneCookie)

  return { timeZone }
}
