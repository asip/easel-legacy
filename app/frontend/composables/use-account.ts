import { Ref, ref, computed} from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies.mjs'

import type { ViewDataType } from './'
import type { AccountResource, User } from '../interfaces'
import { useAlert, useFlash } from './'

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

  const { setAlert } = useAlert({ flash })

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
        await setAlert({ response, off: true })
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

  return {
    loggedIn,
    currentUser,
    token,
    flash,
    authenticate
  }
}

export type UseAccountType = ReturnType<typeof useAccount>
