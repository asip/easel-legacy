import { useConfig as useVesperConfig } from '@vesperjs/vue'

export const useConfig = function () {
  const { baseURL } = useVesperConfig()

  return { baseURL }
}

export type ConfigType = ReturnType<typeof useConfig>
