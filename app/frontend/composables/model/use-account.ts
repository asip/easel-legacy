import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCookies } from '@vueuse/integrations/useCookies'

import type { AccountResource } from '../../interfaces'
import { useAlert, useConstants, useFlash, useQueryApi } from '../'
import { useAccountStore } from '../../stores'

export function useAccount() {
  const { loggedIn, currentUser } = storeToRefs(useAccountStore())
  const { clearCurrentUser } = useAccountStore()

  const cookies = useCookies(['access_token'])

  const { flash, clearFlash } = useFlash()
  const { baseURL } = useConstants()

  const token = computed<string>(() => cookies.get('access_token'))

  const { setAlert } = useAlert({ flash })

  const authenticate = async () => {
    clearFlash()

    if (!token.value) {
      loggedIn.value = false
      clearCurrentUser()
      return
    }

    try {
      const { ok, data, response } = await useQueryApi<AccountResource>({ url: `${baseURL}/account`, token: token.value })

      if (!ok) {
        loggedIn.value = false
        await setAlert({ response, off: true })
      } else {
        const accountAttrs = data
        if (accountAttrs) {
          currentUser.value.id = accountAttrs.id
        }
        currentUser.value.token = token.value
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
