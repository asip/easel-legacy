// import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import type { AccountResource } from '~/interfaces'
import { useAlert, useFlash, useQueryApi } from '~/composables'
import { useAccountStore } from '~/stores'

import { i18n } from '~/i18n'

export function useAccount() {
  const { loggedIn, currentUser } = storeToRefs(useAccountStore())
  const { clearCurrentUser } = useAccountStore()

  // const { accessToken } = useCookie()

  const { flash, clearFlash } = useFlash()

  // const token = computed<string>(() => accessToken.value)

  const { setAlert } = useAlert({ flash })

  const authenticate = async (): Promise<void> => {
    clearFlash()

    /* if (!token.value) {
      clearCurrentUser()
      return
    } */

    try {
      const { data, response } = await useQueryApi<AccountResource>({
        url: `/account`,
        // token: token.value
      })

      if (!response.ok) {
        await setAlert({ response, off: true })
        clearCurrentUser()
      } else {
        const accountAttrs = data
        if (accountAttrs) {
          currentUser.value.id = accountAttrs.id
        }
        loggedIn.value = true
      }
    } catch (error: unknown) {
      flash.value.alert = i18n.global.t('action.error.api', { message: (error as Error).message })
      globalThis.console.log((error as Error).message)
    }
  }

  return {
    loggedIn,
    currentUser,
    // token,
    flash,
    authenticate,
  }
}

export type UseAccountType = ReturnType<typeof useAccount>
