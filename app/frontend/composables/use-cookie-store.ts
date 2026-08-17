import { computed } from '@vue/reactivity'
import { useCookies } from '@vueuse/integrations/useCookies'

import { useDate } from '@vesperjs/vue'

import { Criteria, RefItems } from '@/types'

export const useCookieStore = function () {
  const { isValidDate } = useDate()
  const cookies = useCookies(['access_token', 'q', 'ref', 'page', 'time_zone'])

  const criteria = computed<Criteria | undefined, Criteria | string | undefined>({
    get() {
      return cookies.get<Criteria>('q')
    },
    set(value: Criteria | string | undefined) {
      if (typeof value == 'string') {
        cookies.set('q', value, { path: '/' })
      } else {
        cookies.set('q', JSON.stringify(value ?? {}), { path: '/' })
      }
    },
  })

  const date = computed<string | null>(() => {
    const value = criteria.value?.word ?? ''
    return isValidDate(value) ? value : null
  })

  const accessToken = computed<string>(() => cookies.get<string>('access_token'))

  const refItems = computed<RefItems, RefItems | string>({
    get() {
      return cookies.get<RefItems>('ref')
    },
    set(value: RefItems | string | undefined) {
      if (typeof value == 'string') {
        cookies.set('ref', value, { path: '/' })
      } else {
        cookies.set('ref', value ? value : '{}', { path: '/' })
      }
    },
  })

  const page = computed<string, string>({
    get() {
      return cookies.get<string>('page')
    },
    set(value: string | undefined) {
      cookies.set('page', value ?? '', { path: '/' })
    },
  })

  const timeZone = computed<string, string>({
    get() {
      return cookies.get<string>('time_zone')
    },
    set(value: string | undefined) {
      cookies.set('time_zone', value ?? '', { path: '/' })
    },
  })

  return { criteria, date: date.value, accessToken, refItems, page, timeZone }
}
