import Tagify from '@yaireo/tagify'

import { useConstants } from '~/composables'

export function useTagEditor({
  el,
  tagListEl,
}: {
  el: HTMLInputElement
  tagListEl: HTMLInputElement | null
}) {
  const { baseURL } = useConstants()

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
      const tags = await searchTag(value)
      setAutocomplete(value, tags)
    })()
  }

  const searchTag = async (tag: string): Promise<string[]> => {
    const url = tag ? `${baseURL}/tags/search?q=${tag}` : `${baseURL}/tags/search`

    const res = await globalThis.fetch(url, { signal: controller?.signal })
    const { tags } = (await res.json()) as { tags: string[] }
    return tags
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
