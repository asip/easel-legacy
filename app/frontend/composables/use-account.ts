import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCookies } from '@vueuse/integrations/useCookies.mjs'

import type { AccountResource } from '../interfaces'
import { useAlert, useConstants, useFlash } from './'
import { useAccountStore } from '../stores'

export function useAccount() {
  const { loggedIn, currentUser } = storeToRefs(useAccountStore())

  const cookies = useCookies(['access_token'])

  const { flash, clearFlash } = useFlash()
  const { baseURL, headers } = useConstants()

  const token = computed<string>(() => cookies.get('access_token'))

  const { setAlert } = useAlert({ flash })

  const authenticate = async () => {
    clearFlash()

    try {
      const response = await globalThis.fetch(`${baseURL}/account`,
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
