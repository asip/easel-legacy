import { useCookie, type CookieAttributes } from '@vesperjs/vue'

import { useCookieVal } from './cookie/value'

type CookieOptions = CookieAttributes & { watch?: boolean }

export const useCookieValue = (name: string, options?: CookieOptions) => {
  const cookieRef = useCookie(name, options)
  const cookie = useCookieVal(cookieRef)

  return cookie
}
