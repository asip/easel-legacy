import { computed } from '@vue/reactivity'
import { useCookies } from '@vueuse/integrations/useCookies'

import { Criteria } from '~/types'
import { useDate } from '~/composables'

export function useCookieStore() {
  const cookies = useCookies(['access_token', 'q'])

  const criteria = computed<Criteria, string>({
    get() {
      return cookies.get<Criteria>('q')
    },
    set(value: string) {
      cookies.set('q', value, { path: '/' })
    },
  })

  const date = computed<string | null>(() => {
    const { isValidDate } = useDate()

    const value = criteria.value.word ?? ''
    return isValidDate(value) ? value : null
  })

  const accessToken = computed<string>(() => cookies.get<string>('access_token'))

  return { criteria, date: date.value, accessToken }
}
