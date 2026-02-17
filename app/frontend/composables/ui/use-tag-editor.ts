import Tagify from '@yaireo/tagify'

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
    const tags: string | null = tagListEl?.value ?? null
    if (tags && tags.length > 0) tagEditor?.addTags(tags.split(','))
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
    const { data, response } = await useQueryApi<{ tags: string[] }>({
      url: '/tags/search',
      query: tag ? { q: tag } : {},
      abort: controller,
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
    if (tagListEl) tagListEl.value = tagEditor?.value.map((v) => v.value).join(',') ?? ''
  }

  return { initTagEditor }
}
