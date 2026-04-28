import { useApiConstants } from '@vesperjs/vue'

import { app } from '~/settings.json'

export const useConstants = function () {
  const { baseURL } = useApiConstants()

  const setConstants = () => {
    baseURL.value = app.api.baseURL
  }

  return { setConstants }
}

export type ConstantsType = ReturnType<typeof useConstants>
