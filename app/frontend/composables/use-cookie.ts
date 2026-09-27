import { computed } from '@vue/reactivity'
import type { CookieSetOptions } from 'universal-cookie'
import { useCookies } from '@vueuse/integrations/useCookies'

import { CookieRef } from '@/types'

export const useCookie = function (name: string, options?: CookieSetOptions): CookieRef {
  const cookies = useCookies([name])

  const cookie: CookieRef = computed<string, string | null | undefined>({
    get() {
      return cookies.get<string>(name)
    },
    set(value: string | null | undefined) {
      if (value) {
        cookies.set(name, value, options)
      } else {
        cookies.remove(name, options)
      }
    },
  })

  return cookie
}
