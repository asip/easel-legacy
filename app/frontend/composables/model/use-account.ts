import { storeToRefs } from 'pinia'

import type { AccountResource, ErrorsResource } from '~/interfaces'
import type { ErrorMessages } from '~/types'

import { useAlert, useFlash, useQueryApi } from '~/composables'
import { useAccountStore } from '~/stores'

export function useAccount() {
  const { loggedIn, account } = storeToRefs(useAccountStore())
  const { clearAccount } = useAccountStore()

  // const { accessToken } = useCookieStore()

  const { flash, clearFlash } = useFlash()

  const { setError } = useAlert({ flash })

  const authenticate = async (): Promise<void> => {
    clearFlash()

    /* if (!accessToken.value) {
      clearAccount()
      return
    } */

    const { data, error } = await useQueryApi<
      AccountResource,
      ErrorsResource<ErrorMessages<string>>
    >('/account')

    if (error) {
      setError(error, { off: true })
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
