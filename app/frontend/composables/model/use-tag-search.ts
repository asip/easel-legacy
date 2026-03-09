import { ref } from '@vue/reactivity'

import { useAlert, useQueryApi, useFlash } from '~/composables'
import type { TagsResource, ErrorsResource } from '~/interfaces'
import type { ErrorMessages } from '~/types'

export const useTagSearch = () => {
  const { flash, clearFlash } = useFlash()
  const { setError } = useAlert({ flash })

  const tags = ref<string[]>([])

  const searchTag = async (name: string, { signal }: { signal: AbortSignal }): Promise<void> => {
    const { data, error } = await useQueryApi<TagsResource, ErrorsResource<ErrorMessages<string>>>(
      '/tags/search',
      {
        query: { q: name },
        signal,
      },
    )

    clearFlash()

    if (error) {
      setError({ error })
      tags.value = []
    } else if (data) {
      const { tags: tagList } = data
      // console.log(frameList)
      tags.value = tagList
    }
  }

  return { searchTag, tags }
}
