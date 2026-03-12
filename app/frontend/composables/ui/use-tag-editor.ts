import Tagify from '@yaireo/tagify'

import { useTagSearch } from '../model/use-tag-search'
import { useElement } from './use-element'

export function useTagEditor({
  el,
  tagListEl,
}: {
  el: HTMLInputElement
  tagListEl: HTMLInputElement | null
}) {
  let tagEditor: Tagify | null = null
  let controller: AbortController | null = null

  const { value: tagList } = useElement(tagListEl)

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
    if (tagList.value.length > 0) tagEditor?.addTags(tagList.value.split(','))
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
      const { tags, searchTag } = useTagSearch()
      await searchTag(value, { signal: controller.signal })
      setAutocomplete(value, tags.value)
    })()
  }

  const setAutocomplete = (value: string, tags: string[]): void => {
    if (tagEditor) {
      tagEditor.whitelist = tags
      tagEditor.loading(false).dropdown.show(value)
    }
  }

  const saveTagList = (): void => {
    tagList.value = tagEditor?.value.map((v) => v.value).join(',') ?? ''
  }

  return { initTagEditor }
}
