import { ref } from 'vue'
import type { Flash } from '../types/flash'

export function useFlash () {
  const flash = ref<Flash>({})

  const clearFlash = () => {
    flash.value = {}
  }

  return { flash, clearFlash }
}