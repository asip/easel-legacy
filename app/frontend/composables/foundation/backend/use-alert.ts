import { ref, Ref } from 'vue'

import type { BackendErrorResource, ErrorsResource, Flash } from '~/interfaces'
import type { ErrorMessages } from '~/types'

import { useBackendErrorInfo } from './error'

import { i18n } from '~/i18n'

interface UseAlertOptions {
  flash: Ref<Flash>
  caller?: UseAlertCallerType
}

interface UseAlertCallerType {
  setExternalErrors?: (from: ErrorMessages<string>) => void
  clearLoginUser?: () => void
}

export function useAlert({ flash, caller }: UseAlertOptions) {
  const { backendErrorInfo, clearBackendErrorInfo, setBackendErrorInfo } = useBackendErrorInfo()
  const reloading = ref<boolean>(false)

  const setAlert = async ({
    response,
    off = false,
  }: {
    response: Response
    off?: boolean
  }): Promise<void> => {
    clearBackendErrorInfo()
    backendErrorInfo.value.status = response.status
    if (off) {
      switch (response.status) {
      case 401:
        if (caller && 'clearLoginUser' in caller && caller.clearLoginUser) caller.clearLoginUser()
        break
      default:
        flash.value.alert = i18n.global.t('action.error.api', { message: response.status })
      }
    } else {
      switch (response.status) {
      case 401:
        flash.value.alert = i18n.global.t('action.error.login')
        if (caller && 'clearLoginUser' in caller && caller.clearLoginUser) caller.clearLoginUser()
        reloading.value = true
        break
      case 404:
        {
          const error = (await response.json()) as BackendErrorResource
          setBackendErrorInfo(error)
          reloading.value = true
        }
        break
      case 422:
        {
          if (caller && 'setExternalErrors' in caller && caller.setExternalErrors) {
            const { errors } = (await response.json()) as ErrorsResource<ErrorMessages<string>>
            // globalThis.console.log(errors)
            caller.setExternalErrors(errors)
          }
        }
        break
      default:
        flash.value.alert = i18n.global.t('action.error.api', { message: response.status })
      }
    }
  }

  const reload = (): void => {
    if (reloading.value) {
      globalThis.setTimeout(() => {
        globalThis.location.reload()
      }, 1000)
    }
  }

  return { backendErrorInfo, setAlert, reload }
}

export type UseAlertType = ReturnType<typeof useAlert>
