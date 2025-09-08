import { Ref, ref, computed} from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies.mjs'

import type { ViewDataType } from './'
import type { AccountResource, User } from '../interfaces'
import { useFlash } from './'

export function useAccount(viewData: ViewDataType) {
  const loggedIn: Ref<boolean> = ref<boolean>(false)
  const currentUser = ref<User>({
    id: null,
    token: null
  })

  const cookies = useCookies(['access_token'])
  const { flash, clearFlash } = useFlash()
  const { baseURL, headers } = viewData

  const token = computed<string>(() => cookies.get('access_token'))

  const authenticate = async () => {
    clearFlash()

    try {
      const response = await globalThis.fetch(`${baseURL.value}/account`,
        {
          method: 'GET',
          headers: {
            ...headers.value,
            Authorization: `Bearer ${token.value}`
          }
        })

      if (!response.ok) {
        loggedIn.value = false
        setAlert(response.status)
      } else {
        const accountAttrs = (await response.json()) as AccountResource
        currentUser.value.id = accountAttrs.id
        currentUser.value.token = response.headers.get('authorization')?.split(' ')[1]
        loggedIn.value = true
      }
    } catch(error) {
      flash.value.alert = '不具合が発生しました'
      globalThis.console.log((error as Error).message)
    }
  }

  const setAlert= (status: number) => {
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
