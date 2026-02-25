import { storeToRefs } from 'pinia'

import type { AccountResource } from '~/interfaces'
import { useAlert, useFlash, useQueryApi } from '~/composables'
import { useAccountStore } from '~/stores'

import { i18n } from '~/i18n'

export function useAccount() {
  const { loggedIn, account } = storeToRefs(useAccountStore())
  const { clearAccount } = useAccountStore()

  // const { accessToken } = useCookie()

  const { flash, clearFlash } = useFlash()

  // const token = computed<string>(() => accessToken.value)

  const { setAlert } = useAlert({ flash })

  const authenticate = async (): Promise<void> => {
    clearFlash()

    /* if (!token.value) {
      clearAccount()
      return
    } */

    try {
      const { data, response } = await useQueryApi<AccountResource>('/account')

      if (!response.ok) {
        await setAlert({ response, off: true })
        clearAccount()
      } else {
        const accountAttrs = data
        if (accountAttrs) {
          account.value.id = accountAttrs.id
        }
        loggedIn.value = true
      }
    } catch (error: unknown) {
      flash.value.alert = i18n.global.t('backend.error.api', { message: (error as Error).message })
      globalThis.console.log((error as Error).message)
    }
  }

  return {
    loggedIn,
    account,
    // token,
    flash,
    authenticate,
  }
}

export type UseAccountType = ReturnType<typeof useAccount>
