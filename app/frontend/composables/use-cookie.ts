import { useCookies } from '@vueuse/integrations/useCookies'

export function useCookie(){
  const cookies = useCookies(['access_token', 'q'])

  return { cookies }
}
