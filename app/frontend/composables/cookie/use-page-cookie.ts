import { computed } from '@vue/reactivity'

import { CookieAccessor } from '@/composables/use-cookie-store'

export const usePageCookie = function (cookie: CookieAccessor) {
  const page = computed<string, string>({
    get() {
      return cookie.get()
    },
    set(value: string | undefined) {
      cookie.set(value ?? '')
    },
  })

  return { page }
}
