import Cookies from 'js-cookie'

export function useCookieData(){
  const access_token: string | null = Cookies.get('access_token')

  return { access_token }
}