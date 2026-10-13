import { useCookie } from '@vesperjs/vue'

export const useTimeZoneCookie = function () {
  const timeZone = useCookie('time_zone', { path: '/' })

  return { timeZone }
}
