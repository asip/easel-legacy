import { customRef, type Ref } from '@vue/reactivity'
import Tagify from '@yaireo/tagify'

interface AutocompleteTagsType {
  tags: Ref<string[]>
  filterBy: (name: string, { signal }: { signal: AbortSignal }) => Promise<void>
}

type TagifyOptions = Tagify.TagifySettings & {
  autocompleteTags?: AutocompleteTagsType
}

export const useTagify = function (
  el: HTMLInputElement | HTMLTextAreaElement,
  tagList: Ref<string[] | undefined>,
  options: TagifyOptions,
) {
  const autocompleteTags = options.autocompleteTags
  if (options.autocompleteTags) delete options.autocompleteTags

  let tagify: Tagify | null = null
  let controller: AbortController | null = null

  const tags = customRef<Tagify.TagData[] | undefined, string[] | undefined>(() => {
    return {
      get() {
        return tagify?.value
      },
      set(value: string[] | undefined) {
        tagify?.loadOriginalValues(value ?? [])
      },
    }
  })

  const autocomplete = customRef<string[] | Tagify.TagData[], string>(() => {
    return {
      get() {
        return tagify?.whitelist ?? []
      },
      set(value: string) {
        if (tagify) tagify.whitelist = autocompleteTags?.tags.value ?? []
        tagify?.loading(false).dropdown.show(value)
      },
    }
  })

  const init = (): Tagify => {
    tagify = new Tagify(el, options)

    eventCallbacks()

    return tagify
  }

  const eventCallbacks = (): void => {
    tagify?.on('input', (ev) => {
      void (async () => {
        await onInput(ev)
      })()
    })
    tagify?.on('add', () => {
      tagList.value = tags.value?.map((v) => v.value)
    })
    tagify?.on('remove', () => {
      tagList.value = tags.value?.map((v) => v.value)
    })
  }

  const onInput = async (ev: CustomEvent): Promise<void> => {
    // eslint-disable-next-line
    const value = ev.detail.value as string
    if (tagify) tagify.whitelist = []

    controller?.abort()
    controller = new AbortController()

    await autocompleteTags?.filterBy(value, { signal: controller.signal })
    autocomplete.value = value
  }

  return { tags, init }
}
