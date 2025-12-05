import { ref, type Ref } from 'vue'

import { ErrorMessages } from '../types'
import { Flash } from '../interfaces'

export function useExternalErrors<ErrorProperty extends string>({ flash } : { flash: Ref<Flash> }) {
  const externalErrors = ref<ErrorMessages<ErrorProperty>>({})

  const clearExternalErrors = (): void => {
    for(const key in externalErrors.value){
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      externalErrors.value[key] = []
    }
  }

  const isSuccess = (): boolean => {
    let result = true

    for(const key in externalErrors.value){
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (externalErrors.value[key].length > 0) result = false
    }

    if (flash.value.alert) result = false

    return result
  }

  return {
    externalErrors, clearExternalErrors, isSuccess
  }
}
