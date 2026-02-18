import { useCookies } from '@vueuse/integrations/useCookies'

export function useCookie() {
  const cookies = useCookies(['access_token', 'q'])

  const setCriteriaToCookie = (criteria: string): void => {
    cookies.set('q', criteria, { path: '/' })
  }

  const getAccessToken = () => {
    cookies.get('access_token')
  }

  return { setCriteriaToCookie, getAccessToken }
}
