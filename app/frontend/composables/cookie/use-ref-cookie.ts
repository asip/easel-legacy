import { useCookieValue } from '@/composables'
import { RefItems, CookieRef } from '@/types'

export const useRefCookie = function (cookie: CookieRef<RefItems>) {
  const { value: refItems } = useCookieValue(cookie, { deep: true })

  return { refItems }
}
