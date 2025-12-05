import { ref } from 'vue'

import { ErrorMessages } from '../types'

export function useExternalErrors<ErrorProperty extends string>() {
  const externalErrors = ref<ErrorMessages<ErrorProperty>>({})

  const clearExternalErrors = (): void => {
    for(const key in externalErrors.value){
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      externalErrors.value[key] = []
    }
  }

  return {
    externalErrors, clearExternalErrors
  }
}
