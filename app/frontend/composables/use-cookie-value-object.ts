import { useCookie, type CookieAttributes } from '@vesperjs/vue'

import { useCookieVO } from './cookie/value'

type CookieOptions = CookieAttributes & { watch?: boolean }

export const useCookieValueObject = function <T extends object>(
  name: string,
  options?: CookieOptions,
) {
  const cookieRef = useCookie(name, options)
  const cookie = useCookieVO<T>(cookieRef)

  return cookie
}
