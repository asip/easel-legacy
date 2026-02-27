import Tagify from '@yaireo/tagify'
import { ref } from '@vue/reactivity'

import { useQueryApi } from '~/composables'

export function useTagEditor({
  el,
  tagListEl,
}: {
  el: HTMLInputElement
  tagListEl: HTMLInputElement | null
}) {
  let tagEditor: Tagify | null = null
  let controller: AbortController | null = null

  const tagList = ref<string>()

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

    initTags()
    setEventCallbacks()

    return tagEditor
  }

  const initTags = (): void => {
    tagEditor?.removeAllTags()
    tagList.value = tagListEl?.value ?? ''
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
      try {
        const tags = await searchTag(value)
        setAutocomplete(value, tags)
      } catch (error) {
        globalThis.console.log((error as Error).message)
      }
    })()
  }

  const searchTag = async (tag: string): Promise<string[]> => {
    const { data, response } = await useQueryApi<{ tags: string[] }>('/tags/search', {
      query: tag ? { q: tag } : {},
      signal: controller?.signal,
    })

    if (response.ok && data) {
      const { tags } = data
      return tags
    } else {
      return []
    }
  }

  const setAutocomplete = (value: string, tags: string[]): void => {
    if (tagEditor) {
      tagEditor.whitelist = tags
      tagEditor.loading(false).dropdown.show(value)
    }
  }

  const saveTagList = (): void => {
    tagList.value = tagEditor?.value.map((v) => v.value).join(',')
    if (tagListEl) tagListEl.value = tagList.value ?? ''
  }

  return { initTagEditor }
}
