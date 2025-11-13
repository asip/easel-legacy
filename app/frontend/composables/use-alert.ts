import { ref, Ref } from 'vue'

import { ErrorsResource, Flash } from '../interfaces'
import { ErrorMessages } from '../types'

interface UseAlertOptions {
  flash: Ref<Flash>
  caller?: UseAlertCallerType
}

interface UseAlertCallerType {
  setExternalErrors?: (errors: ErrorMessages<string>) => void
}

export function useAlert({ flash, caller }: UseAlertOptions) {
  const reloading401 = ref<boolean>(false)

  const setAlert= async ({ response, off = false }: { response: Response, off?: boolean }): Promise<void> => {
    if (off) {
      switch(response.status){
      case 401:
        break
      case 500:
        flash.value.alert = '不具合が発生しました'
        break
      default:
        flash.value.alert = '不具合が発生しました'
      }
    } else {
      switch(response.status){
      case 401:
        flash.value.alert = 'ログインしなおしてください'
        reloading401.value = true
        break
      case 404:
        break
      case 422:
        {
          if (caller && 'setExternalErrors' in caller) {
            const { errors } = (await response.json()) as ErrorsResource<ErrorMessages<string>>
            // globalThis.console.log(errors)
            if (caller.setExternalErrors) caller.setExternalErrors(errors)
          }
        }
        break
      case 500:
        flash.value.alert = '不具合が発生しました'
        break
      default:
        flash.value.alert = '不具合が発生しました'
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
