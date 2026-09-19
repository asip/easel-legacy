import { useCriteriaCookie, usePageCookie, useRefCookie, useTimeZoneCookie } from '.'

export const useCookieStore = function () {
  const { criteria, date } = useCriteriaCookie()
  const { refItems } = useRefCookie()
  const { page } = usePageCookie()
  const { timeZone } = useTimeZoneCookie()

  return { /* accessToken, */ criteria, date, refItems, page, timeZone }
}
