import { computed } from '@vue/reactivity'

import { CookieAccessor } from '@/composables/use-cookie-store'

export const useTimeZoneCookie = function (cookie: CookieAccessor) {
  const timeZone = computed<string, string>({
    get() {
      return cookie.get()
    },
    set(value: string | undefined) {
      cookie.set(value ?? '')
    },
  })

  return { timeZone }
}
