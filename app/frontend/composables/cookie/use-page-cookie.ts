import { useCookie } from '@vesperjs/vue'

import { useCookieValue } from '@/composables'

export const usePageCookie = function () {
  const pageCookie = useCookie('page', { path: '/' })
  const page = useCookieValue(pageCookie)

  return { page }
}
