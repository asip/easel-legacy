import Axios, { AxiosError } from 'axios'
import { Ref, ref, computed} from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies.mjs'

import type { AccountResource, User } from '../interfaces'
import { useFlash } from './'

export function useAccount() {
  const loggedIn: Ref<boolean> = ref<boolean>(false)
  const currentUser = ref<User>({
    id: null,
    token: null
  })

  const cookies = useCookies(['access_token'])
  const { flash, clearFlash } = useFlash()

  const token = computed<string>(() => cookies.get('access_token'))

  const authenticate = async () => {
    clearFlash()

    try {
      const res = await Axios.get<AccountResource>('/account',
        {
          headers: {
            Authorization: `Bearer ${token.value}`
          }
        })

      //if (res.data) {
      const accountAttrs = res.data
      currentUser.value.id = accountAttrs.id
      currentUser.value.token = (res.headers['authorization'] as string).split(' ')[1]
      loggedIn.value = true
      //}
    } catch (error) {
      loggedIn.value = false
      if(Axios.isAxiosError(error)){
        setAlert(error as AxiosError)
      }
    }
  }

  const setAlert= (error: AxiosError) => {
    const status = error.response?.status
    switch(status){
    case 401:
      break
    case 500:
      flash.value.alert = '不具合が発生しました'
      break
    default:
      flash.value.alert = '不具合が発生しました'
    }
  }

  return {
    loggedIn,
    currentUser,
    token,
    flash,
    authenticate
  }
}

export type UseAccountType = ReturnType<typeof useAccount>
