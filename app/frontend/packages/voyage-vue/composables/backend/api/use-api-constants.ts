import { computed } from '@vue/reactivity'
import { $baseUrl } from '../../../stores'

export function useApiConstants() {
  const baseURL = computed<string>({
    get() {
      return $baseUrl.get()
    },
    set(value: string) {
      $baseUrl.set(value)
    },
  })

  /*
  const baseURL = useStore($baseUrl)

  const setBaseUrl = (baseURL: string) => {
    $baseUrl.set(baseURL)
  }
  */

  return { baseURL /* setBaseUrl */ }
}

export type ApiConstantsType = ReturnType<typeof useApiConstants>
