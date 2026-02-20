import { useApiConstants } from './foundation'

export function useConstants() {
  const { baseURL } = useApiConstants()

  const setConstants = () => {
    baseURL.value = '/front/api/v1'
  }

  return { setConstants, baseURL: baseURL.value }
}

export type ConstantsType = ReturnType<typeof useConstants>
