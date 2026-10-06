import { useCookieValue } from '@/composables'

export const useTimeZoneCookie = function () {
  const timeZone = useCookieValue('time_zone', { path: '/' })

  return { timeZone }
}
