import { computed, ref } from '@vue/reactivity'

import type { BackendErrorInfo, BackendErrorResource } from '../../../interfaces'
import { useEntity } from '../../use-entity'

export function useBackendErrorInfo() {
  const info = ref<BackendErrorInfo>({})
  const { copy } = useEntity<BackendErrorInfo, BackendErrorResource>()

  const backendErrorInfo = computed<BackendErrorInfo, BackendErrorResource>({
    get() {
      return info.value
    },
    set(value: BackendErrorResource) {
      copy({ from: value, to: info.value })
    },
  })

  const clearBackendErrorInfo = (): void => {
    info.value = {}
  }

  return { backendErrorInfo, clearBackendErrorInfo }
}
