import { useApiConstants } from './foundation'

export function useConstants() {
  const { baseURL } = useApiConstants()

  const setConstants = () => {
    baseURL.value = '/front/api/v1'
  }

  return { setConstants }
}

export type ConstantsType = ReturnType<typeof useConstants>
