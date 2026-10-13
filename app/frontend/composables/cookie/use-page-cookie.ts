import { useCookie } from '@vesperjs/vue'

export const usePageCookie = function () {
  const page = useCookie('page', { path: '/' })

  return { page }
}
