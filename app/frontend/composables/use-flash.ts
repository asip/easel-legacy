import { ref } from 'vue'

import type { Flash } from '../types'

export function useFlash () {
  const flash = ref<Flash>({})

  const clearFlash = () => {
    flash.value = {}
  }

  return { flash, clearFlash }
}

export type UseFlashType = ReturnType<typeof useFlash>
