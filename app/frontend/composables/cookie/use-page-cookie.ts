import { useCookieValue } from '@/composables'
import { CookieRef } from '@/types'

export const usePageCookie = function (cookie: CookieRef) {
  const { value: page } = useCookieValue(cookie)

  return { page }
}
