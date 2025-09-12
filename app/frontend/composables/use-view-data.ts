import { ref, computed } from 'vue'
import { useLocale } from './use-locale'

export function useViewData(){
  const { locale } = useLocale()

  const baseURL = ref('')
  const csrfToken = ref('')
  const frameId = ref('')
  const q = ref<string | undefined>()
  const page = ref<string | undefined>()

  const headers = computed(() => ({
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': csrfToken.value,
    'Accept': 'application/json',
    'Accept-Language': locale.value
  }))

  return { baseURL, csrfToken, headers, frameId, q, page }
}

export type ViewDataType = ReturnType<typeof useViewData>
