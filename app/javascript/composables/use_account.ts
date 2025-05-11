import Axios, { AxiosError } from 'axios'
import { inject, Ref, ref} from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies.mjs'

import type { User } from '../interfaces/user'

import type { UseViewDataType } from './use_view_data'
import { useFlash } from './use_flash'

interface AccountResource {
  id: number
  token: string
}

export function useAccount() {
  const logged_in: Ref<boolean> = ref<boolean>(false)
  const currentUser = ref<User>({
    id: null,
    token: null
  })

  const viewData = inject('viewData') as UseViewDataType
  const cookies = useCookies(['access_token'])
  const { flash, clearFlash } = useFlash()

  const getAccount = async () => {
    clearFlash()

    const token: string = cookies.get('access_token')

    try {
      const res = await Axios.get<AccountResource>(`${viewData.api_origin}/account`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

      //if (json) {
      const accountAttrs = res.data
      currentUser.value.id = accountAttrs.id
      currentUser.value.token = (res.headers['authorization'] as string).split(' ')[1]
      //}
    } catch (error) {
      if(Axios.isAxiosError(error)){
        setErrorMessage(error as AxiosError)
      }
    }
  }

  const setErrorMessage = (error: AxiosError) => {
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
    logged_in,
    current_user: currentUser,
    flash,
    getAccount
  }
}

export type UseAccountType = ReturnType<typeof useAccount>
