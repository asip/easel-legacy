import { computed } from 'vue'

import { useLocale } from './use-locale'

export function useConstants(){
  const { locale } = useLocale()

  const baseURL = '/api/front/v1'

  const commonHeaders = computed(() => ({
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Language': locale.value
  }))

  return { baseURL, commonHeaders }
}

export type ConstantsType = ReturnType<typeof useConstants>
