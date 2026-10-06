import { useCookieValue } from '@/composables'

export const usePageCookie = function () {
  const page = useCookieValue('page', { path: '/' })

  return { page }
}
