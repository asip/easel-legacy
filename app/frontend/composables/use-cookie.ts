import { computed } from 'vue'

import { useCookies } from '@vueuse/integrations/useCookies'

export function useCookie() {
  const cookies = useCookies(['access_token', 'q'])

  const criteriaCookie = computed<string, string>({
    get() {
      return cookies.get('q')
    },
    set(value: string) {
      cookies.set('q', value, { path: '/' })
    },
  })

  const accessToken = computed<string>

  /*
  const setCriteriaToCookie = (criteria: string): void => {
    cookies.set('q', criteria, { path: '/' })
  }

  const getAccessToken = () => {
    cookies.get('access_token')
  }
  */

  return { criteriaCookie, accessToken /* setCriteriaToCookie, getAccessToken */ }
}
