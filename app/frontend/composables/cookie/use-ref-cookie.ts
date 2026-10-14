import { useCookie } from '@vesperjs/vue'
import type { RefItems } from '@/types'

export const useRefCookie = function () {
  const refItems = useCookie<RefItems>('ref', { path: '/', watch: true })

  return { refItems }
}
