import { computed } from '@vue/reactivity'
import { useCookies } from '@vueuse/integrations/useCookies'

import { CookieRef } from '@/types'

export const useCookie = function <T = string>(attr: string): CookieRef<T> {
  const cookies = useCookies([attr])

  const cookie: CookieRef<T> = computed<T, T | string>({
    get() {
      return cookies.get<T>(attr)
    },
    set(value: T | string) {
      cookies.set(attr, value, { path: '/' })
    },
  })

  return cookie
}
