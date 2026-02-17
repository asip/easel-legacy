import { useApiConstants } from './foundation'

export function useConstants() {
  const { baseURL } = useApiConstants()

  baseURL.value = '/front/api/v1'

  return { baseURL: baseURL.value }
}

export type ConstantsType = ReturnType<typeof useConstants>
