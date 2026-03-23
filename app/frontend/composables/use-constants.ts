import { useApiConstants } from '@vesperjs/vue'

export function useConstants() {
  const { baseURL } = useApiConstants()

  const setConstants = () => {
    baseURL.value = '/api/v1'
  }

  return { setConstants }
}

export type ConstantsType = ReturnType<typeof useConstants>
