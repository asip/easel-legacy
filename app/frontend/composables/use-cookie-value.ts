import { useCookie } from '@vesperjs/vue'

import type { CookieAttributes } from '@/types'

import { useCookieVal } from './cookie/value'

type CookieOptions = CookieAttributes & { watch?: boolean }

export const useCookieValue = (name: string, options?: CookieOptions) => {
  const watchOption = options?.watch ?? false
  if (options?.watch) delete options.watch
  const cookieRef = useCookie(name, options)
  const cookie = useCookieVal(cookieRef, { watch: watchOption })

  return cookie
}
