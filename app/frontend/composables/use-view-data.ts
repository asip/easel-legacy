import { ref, computed } from 'vue'

import type { RefQuery } from '../interfaces'
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

  const refItems = computed( () => {
    const items: RefQuery = { from: 'frame', id: frameId.value }
    if (q.value) items.q = q.value
    if (page.value) items.page = page.value
    return items
  })
  return { baseURL, csrfToken, headers, frameId, q, page, refItems }
}

export type ViewDataType = ReturnType<typeof useViewData>
