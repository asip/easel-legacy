import { computed, type Ref } from '@vue/reactivity'
import Tagify from '@yaireo/tagify'

interface TagSearchType {
  searchTag: (name: string, { signal }: { signal: AbortSignal }) => Promise<void>
  tags: Ref<string[]>
}

interface TagEditorOptions {
  el: HTMLInputElement | HTMLTextAreaElement
  tagList: Ref<string[] | undefined>
  tagSearch?: TagSearchType
}

export const useTagEditor = function ({ el, tagList, tagSearch }: TagEditorOptions) {
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
    tagEditor = new Tagify(el, {
      maxTags: 5,
      dropdown: {
        classname: 'color-blue',
        enabled: 0,
        maxItems: 30,
        closeOnSelect: false,
        highlightFirst: true,
      },
    })

    tags.value = tagList.value

    setEventCallbacks()

    return tagEditor
  }

  const setEventCallbacks = (): void => {
    tagEditor?.on('input', (ev) => {
      onInput(ev)
    })
    tagEditor?.on('add', () => {
      globalThis.console.log(tags.value)
      tagList.value = tags.value?.map(v => v.value)
    })
    tagEditor?.on('remove', () => {
      globalThis.console.log(tags.value)
      tagList.value = tags.value?.map(v => v.value)
    })
  }

  const onInput = (ev: CustomEvent): void => {
    // eslint-disable-next-line
    const value = ev.detail.value as string
    if (tagEditor) tagEditor.whitelist = []

    controller?.abort()
    controller = new AbortController()

    void (async () => {
      await tagSearch?.searchTag(value, { signal: controller.signal })
      autocomplete.value = value
    })()
  }

  return { initTagEditor }
}
