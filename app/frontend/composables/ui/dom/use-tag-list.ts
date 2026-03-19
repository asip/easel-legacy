import { computed } from '@vue/reactivity'

import { useElement } from './use-element'

export function useTagList(el: HTMLInputElement) {
  const { value: tags } = useElement(el)

  const tagList = computed<string[] | undefined>({
    get() {
      return tags.value ? tags.value.split(',') : []
    },
    set(value: string[] | undefined) {
      tags.value = value?.join(',') ?? ''
    },
  })

  return { tagList }
}
