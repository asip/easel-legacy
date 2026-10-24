import { useCookie } from '@vesperjs/vue'

export const useTimeZoneCookie = function () {
  const timeZone = useCookie('tz', { path: '/' })

  return { timeZone }
}
