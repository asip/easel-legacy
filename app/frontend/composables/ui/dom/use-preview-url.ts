import { computed } from '@vue/reactivity'

import { useElement } from './use-element'

interface PreviewUrlOptions {
  imageEl: HTMLImageElement | null
  contentEl: HTMLElement | null
}

export function usePreviewUrl({ imageEl, contentEl }: PreviewUrlOptions) {
  const { src } = useElement(imageEl)

  const previewUrl = computed<string | null>({
    get() {
      return src.value
    },
    set(value: string | null) {
      if (value) {
        showPreview()
      } else {
        hidePreview()
      }

      src.value = value
    },
  })

  const showPreview = (): void => {
    // (プレビュー画像がなければ表示します)
    if (contentEl && contentEl.classList.contains('hidden')) {
      contentEl.classList.remove('hidden')
    }
  }

  const hidePreview = (): void => {
    if (contentEl && contentEl.classList.contains('block')) {
      contentEl.classList.add('hidden')
    }
  }

  return { previewUrl }
}
