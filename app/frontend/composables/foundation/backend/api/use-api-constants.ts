import { useStore } from '@nanostores/vue'
import { $baseUrl } from '~/stores/foundation/nano'

export function useApiConstants() {
  const baseURL = useStore($baseUrl)

  const setBaseUrl = (baseURL: string) => {
    $baseUrl.set(baseURL)
  }

  return { baseURL, setBaseUrl }
}

export type ApiConstantsType = ReturnType<typeof useApiConstants>
