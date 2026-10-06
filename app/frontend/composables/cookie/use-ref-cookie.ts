import { useCookieValueObject } from '@/composables'
import type { RefItems } from '@/types'

export const useRefCookie = function () {
  const refItems = useCookieValueObject<RefItems>('ref', { path: '/', watch: true })

  return { refItems }
}
