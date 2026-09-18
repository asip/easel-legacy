import { computed } from '@vue/reactivity'
import { useCookies } from '@vueuse/integrations/useCookies'

import { Criteria, RefItems, CookieRef } from '@/types'
import { useCriteriaCookie, useRefCookie, usePageCookie, useTimeZoneCookie } from './cookie'

export const useCookieStore = function () {
  const cookies = useCookies(['access_token', 'q', 'ref', 'page', 'time_zone'])

  // const accessToken = computed<string>(() => cookies.get<string>('access_token'))

  const useCookie = function <T = string>(attr: string): CookieRef<T> {
    const cookie = computed<T, T | string>({
      get() {
        return cookies.get<T>(attr)
      },
      set(value: T | string) {
        cookies.set(attr, value, { path: '/' })
      },
    })

    return cookie
  }

  const criteriaCookie = useCookie<Criteria>('q')
  const refCookie = useCookie<RefItems>('ref_items')
  const pageCookie = useCookie('page')
  const timeZoneCookie = useCookie('time_zone')

  const { criteria, date } = useCriteriaCookie(criteriaCookie)
  const { refItems } = useRefCookie(refCookie)
  const { page } = usePageCookie(pageCookie)
  const { timeZone } = useTimeZoneCookie(timeZoneCookie)

  return { /* accessToken, */ criteria, date, refItems, page, timeZone }
}
