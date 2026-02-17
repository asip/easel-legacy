import { ref } from 'vue'

export function useApiConstants() {
  const baseURL = ref<string>()

  return { baseURL }
}

export type ApiConstantsType = ReturnType<typeof useApiConstants>
