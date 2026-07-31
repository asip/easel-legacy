import { computed } from '@vue/reactivity'

import { useElement } from '@vesperjs/vue'

interface PreviewUrlOptions {
  imageEl: HTMLImageElement | null
  previewEl: HTMLElement | null
}

export const usePreviewUrl = function ({ imageEl, previewEl }: PreviewUrlOptions) {
  const { src } = useElement<HTMLImageElement>(imageEl, { property: 'src' })

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
    // If there is no preview image, it will be displayed.
    // (プレビュー画像がなければ表示します)
    if (previewEl && previewEl.classList.contains('hidden')) {
      previewEl.classList.remove('hidden')
    }
  }

  const hidePreview = (): void => {
    if (previewEl && !previewEl.classList.contains('hidden')) {
      previewEl.classList.add('hidden')
    }
  }

  return { previewUrl }
}
