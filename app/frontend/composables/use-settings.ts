import { useApiConstants } from '@vesperjs/vue'

export const useSettings = function () {
  const { baseURL } = useApiConstants()

  return { baseURL }
}

export type SettingsType = ReturnType<typeof useSettings>
