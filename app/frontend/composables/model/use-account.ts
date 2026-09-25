import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useApi, useApiError, useFlash } from '@vesperjs/vue'
import type { BackendErrorsResource } from '@vesperjs/vue'

import type { AccountResource } from '@/types'
import { useAccountStore } from '@/stores'

export const useAccount = function () {
  const { queryApi } = useApi()

  const { account } = storeToRefs(useAccountStore())

  // const { accessToken } = useTokenCookie()

  const { flash, clearFlash } = useFlash()

  const { backendErrorInfo, off } = useApiError(flash)

  const loggedIn = computed(() => !!account.value.id)

  const clearAccount = () => {
    account.value.id = null
  }

  const authenticate = async (): Promise<void> => {
    clearFlash()

    /* if (!accessToken.value) {
      clearAccount()
      return
    } */

    const { data: accountAttrs, error } = await queryApi<AccountResource, BackendErrorsResource>(
      '/account',
    )

    if (error) {
      off.value = true
      backendErrorInfo.value = error
      clearAccount()
    } else if (accountAttrs) {
      account.value.id = accountAttrs.id
    }
  }

  return {
    loggedIn,
    account,
    // token: accessToken,
    clearAccount,
    flash,
    authenticate,
  }
}

export type UseAccountType = ReturnType<typeof useAccount>
