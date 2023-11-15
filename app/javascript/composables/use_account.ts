import Axios, { AxiosResponse } from 'axios'
import { Ref, ref, reactive} from 'vue'

import type { User } from '../interfaces/user'

import { useViewData } from './use_view_data'

export function useAccount() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let account: any = null
  const logged_in: Ref<boolean> = ref<boolean>(false)
  const current_user = reactive<User>({
    id: '',
    token: ''
  })

  const { constants } = useViewData()

  const getAccount = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: AxiosResponse<any, any> = await Axios.get(`${constants.api_origin}/account`,
      {
        headers: {
          Authorization: `Bearer ${current_user.token}`
        }
      })
    if (res.data) {
      account = res.data.data
      //console.log(this.account);
      if(account){
        current_user.id = account.attributes.id
      }
    }
  }

  return {
    account,
    logged_in,
    current_user,
    getAccount
  }
}