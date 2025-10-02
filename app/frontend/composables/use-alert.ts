import { ref, Ref } from 'vue'

import { ErrorMessages, Flash } from '../types'
import { ErrorsResource } from '../interfaces'

interface UseAlertOptions<T extends string> {
  flash: Ref<Flash>
  setEE?: (errors: ErrorMessages<T>) => void
}

export function useAlert<T extends string>({ flash, setEE } : UseAlertOptions<T>) {
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
          if (setEE) {
            const { errors } = (await response.json()) as ErrorsResource<ErrorMessages<T>>
            // globalThis.console.log(errors)
            setEE(errors)
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

  return { setAlert, reloading401: reloading401.value }
}
