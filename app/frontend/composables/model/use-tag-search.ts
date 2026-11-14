import { ref } from '@vue/reactivity'

import { useApi, useApiError, useFlash } from '@vesperjs/vue'
import type { BackendErrorsResource } from '@vesperjs/vue'

import type { TagsResource } from '@/types'

export const useTagSearch = function () {
  const { queryApi } = useApi()

  const { flash, clearFlash } = useFlash()
  const { backendErrorInfo } = useApiError(flash)

  const list = ref<string[]>([])

  const filterBy = async (name: string, { signal }: { signal: AbortSignal }): Promise<void> => {
    const { data, error } = await queryApi<TagsResource, BackendErrorsResource>('/tags/search', {
      query: { q: name },
      signal,
    })

    clearFlash()

    if (error) {
      backendErrorInfo.value = error
      list.value = []
    } else if (data) {
      const { tags } = data
      // console.log(frameList)
      list.value = tags
    }
  }

  return { list, filterBy }
}
