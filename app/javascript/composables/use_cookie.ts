import Cookies from 'js-cookie';

export function useCookie(){
  const access_token: string | null = Cookies.get('access_token');

  return { access_token }
}