import { computed, type Ref } from '@vue/reactivity'
import Tagify from '@yaireo/tagify'

interface TagSearchType {
  searchTag: (name: string, { signal }: { signal: AbortSignal }) => Promise<void>
  tags: Ref<string[]>
}

interface TagEditorOptions {
  el: HTMLInputElement | HTMLTextAreaElement
  settings: Tagify.TagifySettings
  tagList: Ref<string[] | undefined>
  tagSearch?: TagSearchType
}

export const useTagEditor = function ({ el, settings, tagList, tagSearch }: TagEditorOptions) {
  let tagEditor: Tagify | null = null
  let controller: AbortController | null = null

  const tags = computed<Tagify.TagData[] | undefined, string[] | undefined>({
    get() {
      return tagEditor?.value
    },
    set(value: string[] | undefined) {
      tagEditor?.removeAllTags()
      if (value) tagEditor?.addTags(value)
    },
  })

  const autocomplete = computed<string[] | Tagify.TagData[], string>({
    get() {
      return tagEditor?.whitelist ?? []
    },
    set(value: string) {
      if (tagEditor) tagEditor.whitelist = tagSearch?.tags.value ?? []
      tagEditor?.loading(false).dropdown.show(value)
    },
  })

  const initTagEditor = (): Tagify => {
    tagEditor = new Tagify(el, settings)

    tags.value = tagList.value

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

    await tagSearch?.searchTag(value, { signal: controller.signal })
    autocomplete.value = value
  }

  return { initTagEditor }
}
