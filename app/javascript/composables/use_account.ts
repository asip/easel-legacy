import Axios, { AxiosResponse } from 'axios'
import { Ref, ref, reactive} from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'

import type { User } from '../interfaces/user'

import { useViewData } from './use_view_data'
import { useFlash } from './use_flash'

export function useAccount() {
  const logged_in: Ref<boolean> = ref<boolean>(false)
  const current_user = reactive<User>({
    id: '',
    token: null
  })

  const { constants } = useViewData()
  const cookies = useCookies(['access_token'])
  const { flash, clearFlash } = useFlash()

  const getAccount = async () => {
    clearFlash()

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: AxiosResponse<any, any> = await Axios.get(`${constants.api_origin}/account`,
        {
          headers: {
            Authorization: `Bearer ${cookies.get('access_token')}`
          }
        })
      if (res?.data) {
        const account: any = res.data.data

        current_user.id = account.attributes.id
        current_user.token = account.attributes.token
      }
    } catch (error) {
      setErrorMessage(error)
    }
  }

  const setErrorMessage = (error: any) => {
    if(Axios.isAxiosError(error)){
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
  }

  return {
    logged_in,
    current_user,
    getAccount
  }
}