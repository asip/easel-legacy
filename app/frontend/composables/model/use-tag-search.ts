import { ref } from '@vue/reactivity'

import { useAlert, useQueryApi, useFlash } from '~/composables'
import type { TagsResource } from '~/interfaces'

export const useTagSearch = () => {
  const { flash, clearFlash } = useFlash()
  const { setAlert } = useAlert({ flash })

  const tags = ref<string[]>([])

  const searchTag = async (name: string, { signal }: { signal: AbortSignal }): Promise<void> => {
    const { data, response } = await useQueryApi<TagsResource>('/tags/search', {
      query: { q: name },
      signal,
    })

    clearFlash()

    if (!response.ok) {
      await setAlert({ response })
      tags.value = []
    } else if (data) {
      const { tags: tagList } = data
      // console.log(frameList)
      tags.value = tagList
    }
  }

  return { searchTag, tags }
}
