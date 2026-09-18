import { useCookies } from '@vueuse/integrations/useCookies'

import { Criteria, RefItems } from '@/types'
import { useCriteriaCookie, useRefCookie, usePageCookie, useTimeZoneCookie } from './cookie'

export interface CookieAccessor<T = string> {
  get: () => T
  set: (value: T | string) => void
}

export const useCookieStore = function () {
  const cookies = useCookies(['access_token', 'q', 'ref', 'page', 'time_zone'])

  // const accessToken = computed<string>(() => cookies.get<string>('access_token'))

  const useCookie = function <T = string>(attr: string) {
    const get = (): T => cookies.get<T>(attr)

    const set = (value: T | string) => {
      cookies.set(attr, value, { path: '/' })
    }

    return { get, set }
  }

  const criteriaCookie = useCookie<Criteria>('q')

  const { criteria, date } = useCriteriaCookie(criteriaCookie)

  const refCookie = useCookie<RefItems>('ref_items')

  const { refItems } = useRefCookie(refCookie)

  const pageCookie = useCookie('page')

  const { page } = usePageCookie(pageCookie)

  const timeZoneCookie = useCookie('time_zone')

  const { timeZone } = useTimeZoneCookie(timeZoneCookie)

  return { /* accessToken, */ criteria, date, refItems, page, timeZone }
}
