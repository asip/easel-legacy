import { ref, Ref } from 'vue'

import { ErrorMessages, Flash } from '../types'
import { ErrorsResource } from '../interfaces'

interface UseAlertOptions<T extends UseAlertCallerType> {
  flash: Ref<Flash>
  caller?: T
}

interface UseAlertCallerType {
  setExternalErrors?: (errors: ErrorMessages<string>) => void
}

export function useAlert<T extends UseAlertCallerType>({ flash, caller } : UseAlertOptions<T>) {
  const reloading401 = ref(false)

  const setAlert= async ({ response, off = false } : { response: Response, off?: boolean }) => {
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

  const reload401 = () => {
    if (reloading401.value) {
      globalThis.setTimeout(() => {
        globalThis.location.href = ''
      }, 1000)
    }
  }

  return { setAlert, reload401 }
}

export type UseAlertType = ReturnType<typeof useAlert>
