import { useCookies } from '@vueuse/integrations/useCookies'

export function useCookieData(){
  const cookies = useCookies(['access_token'])
  const access_token = cookies.get('access_token')

  return { access_token }
}