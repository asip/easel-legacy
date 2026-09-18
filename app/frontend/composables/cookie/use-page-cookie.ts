import { computed } from '@vue/reactivity'

import { CookieRef } from '@/types'

export const usePageCookie = function (cookie: CookieRef) {
  const page = computed<string, string>({
    get() {
      return cookie.value
    },
    set(value: string | undefined) {
      cookie.value = value ?? ''
    },
  })

  return { page }
}
