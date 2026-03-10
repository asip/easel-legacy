import { computed } from '@vue/reactivity'

import { useCookies } from '@vueuse/integrations/useCookies'

export function useCookieStore() {
  const cookies = useCookies(['access_token', 'q'])

  const criteriaCookie = computed<string, string>({
    get() {
      return cookies.get('q')
    },
    set(value: string) {
      cookies.set('q', value, { path: '/' })
    },
  })

  const accessToken = computed<string>(() => cookies.get('access_token'))

  return { criteriaCookie, accessToken }
}
