import { computed } from '@vue/reactivity'

import { CookieRef } from '@/types'

export const useTimeZoneCookie = function (cookie: CookieRef) {
  const timeZone = computed<string, string>({
    get() {
      return cookie.value
    },
    set(value: string | undefined) {
      cookie.value = value ?? ''
    },
  })

  return { timeZone }
}
