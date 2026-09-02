import { computed, Ref } from '@vue/reactivity'

export const useTagList = function (str: Ref<string>) {
  const tagList = computed<string[] | undefined>({
    get() {
      return str.value ? str.value.split(',') : []
    },
    set(value: string[] | undefined) {
      str.value = value?.join(',') ?? ''
    },
  })

  return { tagList }
}
