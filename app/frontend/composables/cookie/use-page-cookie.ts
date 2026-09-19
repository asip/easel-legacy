import { useCookie, useCookieValue } from '@/composables'

export const usePageCookie = function () {
  const pageCookie = useCookie('page', { path: '/' })
  const page = useCookieValue(pageCookie)

  return { page }
}
