import { computed } from '@vue/reactivity'

import { useElement } from './use-element'

export const useTagList = function (el: HTMLInputElement) {
  const { property: tags } = useElement(el, { property: 'value' })

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
