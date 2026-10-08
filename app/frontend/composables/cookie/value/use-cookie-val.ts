import { computed } from '@vue/reactivity'

import type { CookieRef } from '@vesperjs/vue'

export const useCookieVal = function (cookie: CookieRef) {
  const cookieValue = computed<string | null | undefined>({
    get() {
      return cookie.value
    },
    set(value: string | null | undefined) {
      cookie.value = value
    },
  })

  return cookieValue
}
