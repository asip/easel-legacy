import { computed } from '@vue/reactivity'
import type { CookieSetOptions } from 'universal-cookie'
import { useCookies } from '@vueuse/integrations/useCookies'

import { CookieRef } from '@/types'

export const useCookie = function <T = string>(
  name: string,
  options?: CookieSetOptions,
): CookieRef<T> {
  const cookies = useCookies([name])

  const cookie: CookieRef<T> = computed<T, T | string>({
    get() {
      return cookies.get<T>(name)
    },
    set(value: T | string) {
      cookies.set(name, value, options)
    },
  })

  return cookie
}
