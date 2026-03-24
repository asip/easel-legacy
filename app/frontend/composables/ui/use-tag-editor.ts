import { Ref } from '@vue/reactivity'
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

    setTags()
    setEventCallbacks()

    return tagEditor
  }

  const setTags = (): void => {
    tagEditor?.removeAllTags()
    if (tagList.value) tagEditor?.addTags(tagList.value)
  }

  const setEventCallbacks = (): void => {
    tagEditor?.on('input', (ev) => {
      onInput(ev)
    })
    tagEditor?.on('add', () => {
      saveTagList()
    })
    tagEditor?.on('remove', () => {
      saveTagList()
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
      setAutocomplete(value)
    })()
  }

  const setAutocomplete = (value: string): void => {
    if (tagEditor) tagEditor.whitelist = tagSearch?.tags.value ?? []
    tagEditor?.loading(false).dropdown.show(value)
  }

  const saveTagList = (): void => {
    tagList.value = tagEditor?.value.map((v) => v.value)
  }

  return { initTagEditor }
}
