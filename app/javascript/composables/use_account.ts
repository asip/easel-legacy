import Axios, { AxiosError } from 'axios'
import { Ref, ref} from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'

import type { User } from '../interfaces/user'

import { useViewData } from './use_view_data'
import { useFlash } from './use_flash'

interface GetAccountApiResponse {
  data: AccountAttributes
}

interface AccountAttributes {
  attributes: AccountResource
}

interface AccountResource {
  id: number
  token: string
}

export function useAccount() {
  const logged_in: Ref<boolean> = ref<boolean>(false)
  const current_user = ref<User>({
    id: null,
    token: null
  })

  const viewData = useViewData()
  const cookies = useCookies(['access_token'])
  const { flash, clearFlash } = useFlash()

  const getAccount = async () => {
    clearFlash()

    const token: string = cookies.get('access_token')

    try {
      const res = await Axios.get<GetAccountApiResponse>(`${viewData.api_origin}/account`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

      //if (json) {
      const {data: accountAttrs } = res.data
      const accountJson = accountAttrs.attributes
      current_user.value.id = accountJson.id
      current_user.value.token = accountJson.token
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
    current_user,
    flash,
    getAccount
  }
}

export type UseAccountType = ReturnType<typeof useAccount>
