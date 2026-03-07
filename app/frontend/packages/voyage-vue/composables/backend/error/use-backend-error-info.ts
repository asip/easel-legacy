import { ref } from '@vue/reactivity'

import type { BackendErrorInfo, BackendErrorResource } from '../../../interfaces'
import { useEntity } from '../../use-entity'

export function useBackendErrorInfo() {
  const backendErrorInfo = ref<BackendErrorInfo>({})
  const { copy } = useEntity<BackendErrorInfo, BackendErrorResource>()

  const setBackendErrorInfo = (from: BackendErrorResource): void => {
    copy({ from, to: backendErrorInfo.value })
  }

  const clearBackendErrorInfo = (): void => {
    backendErrorInfo.value = {}
  }

  return { backendErrorInfo, setBackendErrorInfo, clearBackendErrorInfo }
}
