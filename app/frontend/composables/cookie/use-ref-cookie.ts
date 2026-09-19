import { useCookie, useCookieValueObject } from '@/composables'
import type { RefItems } from '@/types'

export const useRefCookie = function () {
  const refCookie = useCookie('ref_items', { path: '/' })
  const refItems = useCookieValueObject<RefItems>(refCookie, { deep: true })

  return { refItems }
}
