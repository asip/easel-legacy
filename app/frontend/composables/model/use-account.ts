import { storeToRefs } from 'pinia'

import { useApi, useApiError, useFlash } from '@vesperjs/vue'
import type { BackendErrorsResource } from '@vesperjs/vue'

import type { AccountResource } from '@/types'
import { useAccountStore } from '@/stores'

export const useAccount = function () {
  const { queryApi } = useApi()

  const { loggedIn, account } = storeToRefs(useAccountStore())
  const { clearAccount } = useAccountStore()

  // const { accessToken } = useCookieStore()

  const { flash, clearFlash } = useFlash()

  const { backendErrorInfo, off } = useApiError(flash)

  const authenticate = async (): Promise<void> => {
    clearFlash()

    /* if (!accessToken.value) {
      clearAccount()
      return
    } */

    const { data, error } = await queryApi<AccountResource, BackendErrorsResource>('/account')

    if (error) {
      off.value = true
      backendErrorInfo.value = error
      clearAccount()
    } else {
      const accountAttrs = data
      if (accountAttrs) {
        account.value.id = accountAttrs.id
      }
      loggedIn.value = true
    }
  }

  return {
    loggedIn,
    account,
    // token: accessToken,
    flash,
    authenticate,
  }
}

export type UseAccountType = ReturnType<typeof useAccount>
