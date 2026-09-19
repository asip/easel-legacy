import type { RefItems } from '@/types'
import { useCookie, useCookieValue, useCriteriaCookie } from '.'

export const useCookieStore = function () {
  const criteriaCookie = useCookie('q', { path: '/' })
  const refCookie = useCookie('ref_items', { path: '/' })
  const pageCookie = useCookie('page', { path: '/' })
  const timeZoneCookie = useCookie('time_zone', { path: '/' })

  const { criteria, date } = useCriteriaCookie(criteriaCookie)
  const refItems = useCookieValue<RefItems>(refCookie, { deep: true })
  const page = useCookieValue(pageCookie)
  const timeZone = useCookieValue(timeZoneCookie)

  return { /* accessToken, */ criteria, date, refItems, page, timeZone }
}
