import { ref } from 'vue'

export function useApiConstants() {
  const baseURL = ref('')

  return { baseURL }
}

export type ApiConstantsType = ReturnType<typeof useApiConstants>
