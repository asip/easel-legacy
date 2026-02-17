import { useApiConstants } from './foundation'

export function useConstants() {
  const { baseURL, setBaseUrl } = useApiConstants()

  const setConstants = () => {
    setBaseUrl('/front/api/v1')
  }

  return { setConstants, baseURL: baseURL.value }
}

export type ConstantsType = ReturnType<typeof useConstants>
