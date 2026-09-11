import { computed, type Ref } from '@vue/reactivity'
import Tagify from '@yaireo/tagify'

interface AutocompleteTagsType {
  tags: Ref<string[]>
  filterBy: (name: string, { signal }: { signal: AbortSignal }) => Promise<void>
}

interface TagifyOptions {
  settings: Tagify.TagifySettings
  tagList: Ref<string[] | undefined>
  autocompleteTags?: AutocompleteTagsType
}

export const useTagify = function (
  el: HTMLInputElement | HTMLTextAreaElement,
  { settings, tagList, autocompleteTags }: TagifyOptions,
) {
  let tagEditor: Tagify | null = null
  let controller: AbortController | null = null

  const tags = computed<Tagify.TagData[] | undefined, string[] | undefined>({
    get() {
      return tagEditor?.value
    },
    set(value: string[] | undefined) {
      tagEditor?.loadOriginalValues(value ?? [])
    },
  })

  const autocomplete = computed<string[] | Tagify.TagData[], string>({
    get() {
      return tagEditor?.whitelist ?? []
    },
    set(value: string) {
      if (tagEditor) tagEditor.whitelist = autocompleteTags?.tags.value ?? []
      tagEditor?.loading(false).dropdown.show(value)
    },
  })

  const initTagify = (): Tagify => {
    tagEditor = new Tagify(el, settings)

    eventCallbacks()

    return tagEditor
  }

  const eventCallbacks = (): void => {
    tagEditor?.on('input', (ev) => {
      void (async () => {
        await onInput(ev)
      })()
    })
    tagEditor?.on('add', () => {
      tagList.value = tags.value?.map((v) => v.value)
    })
    tagEditor?.on('remove', () => {
      tagList.value = tags.value?.map((v) => v.value)
    })
  }

  const onInput = async (ev: CustomEvent): Promise<void> => {
    // eslint-disable-next-line
    const value = ev.detail.value as string
    if (tagEditor) tagEditor.whitelist = []

    controller?.abort()
    controller = new AbortController()

    await autocompleteTags?.filterBy(value, { signal: controller.signal })
    autocomplete.value = value
  }

  return { tags, initTagify }
}
