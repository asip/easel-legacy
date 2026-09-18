import { Criteria, RefItems } from '@/types'

import { useCookie, useCookieValue, useCriteriaCookie } from '.'

export const useCookieStore = function () {
  const criteriaCookie = useCookie<Criteria>('q')
  const refCookie = useCookie<RefItems>('ref_items')
  const pageCookie = useCookie('page')
  const timeZoneCookie = useCookie('time_zone')

  const { criteria, date } = useCriteriaCookie(criteriaCookie)
  const refItems = useCookieValue(refCookie, { deep: true })
  const page = useCookieValue(pageCookie)
  const timeZone = useCookieValue(timeZoneCookie)

  return { /* accessToken, */ criteria, date, refItems, page, timeZone }
}
