import { ref, Ref } from 'vue'

import type { ErrorsResource, Flash } from '../interfaces'
import type { ErrorMessages } from '../types'

import { i18n } from '../i18n'

interface UseAlertOptions {
  flash: Ref<Flash>
  caller?: UseAlertCallerType
}

interface UseAlertCallerType {
  setExternalErrors?: (from: ErrorMessages<string>) => void
}

export function useAlert({ flash, caller }: UseAlertOptions) {
  const reloading401 = ref<boolean>(false)

  const setAlert= async ({ response, off = false }: { response: Response, off?: boolean }): Promise<void> => {
    if (off) {
      switch(response.status){
      case 401:
        break
      default:
        flash.value.alert = i18n.global.t('action.error.api', { message: response.status })
      }
    } else {
      switch(response.status){
      case 401:
        flash.value.alert = i18n.global.t('action.error.login')
        reloading401.value = true
        break
      case 404:
        break
      case 422:
        {
          if (caller && 'setExternalErrors' in caller) {
            const { errors } = (await response.json()) as ErrorsResource<ErrorMessages<string>>
            // globalThis.console.log(errors)
            if(caller.setExternalErrors) caller.setExternalErrors(errors)
          }
        }
        break
      default:
        flash.value.alert = i18n.global.t('action.error.api', { message: response.status })
      }
    }
  }

  const reload401 = (): void => {
    if (reloading401.value) {
      globalThis.setTimeout(() => {
        globalThis.location.href = ''
      }, 1000)
    }
  }

  return { setAlert, reload401 }
}

export type UseAlertType = ReturnType<typeof useAlert>
