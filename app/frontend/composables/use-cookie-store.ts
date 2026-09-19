import { Criteria, RefItems } from '@/types'

import { useCookie, useCookieValue, useCriteriaCookie } from '.'

export const useCookieStore = function () {
  const criteriaCookie = useCookie<Criteria>('q', { path: '/' })
  const refCookie = useCookie<RefItems>('ref_items', { path: '/' })
  const pageCookie = useCookie('page', { path: '/' })
  const timeZoneCookie = useCookie('time_zone', { path: '/' })

  const { criteria, date } = useCriteriaCookie(criteriaCookie)
  const refItems = useCookieValue(refCookie, { deep: true })
  const page = useCookieValue(pageCookie)
  const timeZone = useCookieValue(timeZoneCookie)

  return { /* accessToken, */ criteria, date, refItems, page, timeZone }
}
