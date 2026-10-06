import { useCookie } from '@vesperjs/vue'

import type { CookieAttributes } from '@/types'

import { useCookieVO } from './cookie/value'

type CookieOptions = CookieAttributes & { watch?: boolean }

export const useCookieValueObject = function <T extends object>(
  name: string,
  options?: CookieOptions,
) {
  const watchOption = options?.watch ?? false
  if (options?.watch) delete options.watch
  const cookieRef = useCookie(name, options)
  const cookie = useCookieVO<T>(cookieRef, { watch: watchOption })

  return cookie
}
