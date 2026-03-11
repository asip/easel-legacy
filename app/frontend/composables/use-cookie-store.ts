import { computed } from '@vue/reactivity'
import { useCookies } from '@vueuse/integrations/useCookies'

import { Criteria } from '~/types'
import { RefItems } from '~/interfaces'

import { useDate } from '~/composables'

export function useCookieStore() {
  const cookies = useCookies(['access_token', 'q', 'ref', 'page'])

  const criteria = computed<Criteria, string>({
    get() {
      return cookies.get<Criteria>('q')
    },
    set(value: string | undefined) {
      cookies.set('q', value ?? '{}', { path: '/' })
    },
  })

  const date = computed<string | null>(() => {
    const { isValidDate } = useDate()

    const value = criteria.value.word ?? ''
    return isValidDate(value) ? value : null
  })

  const accessToken = computed<string>(() => cookies.get<string>('access_token'))

  const refItems = computed<RefItems, string>({
    get() {
      return cookies.get<RefItems>('ref')
    },
    set(value: string | undefined) {
      cookies.set('ref', value ? value : '{}', { path: '/' })
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

  return { criteria, date: date.value, accessToken, refItems, page }
}
