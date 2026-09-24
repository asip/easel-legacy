import { computed } from '@vue/reactivity'

import { useElement } from '@vesperjs/vue'

interface PreviewUrlOptions {
  image: HTMLImageElement | null
  preview: HTMLElement | null
}

export const usePreviewUrl = function ({ image, preview }: PreviewUrlOptions) {
  const { src } = useElement<HTMLImageElement>(image, { property: 'src' })

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
    if (preview && preview.classList.contains('hidden')) {
      preview.classList.remove('hidden')
    }
  }

  const hidePreview = (): void => {
    if (preview && !preview.classList.contains('hidden')) {
      preview.classList.add('hidden')
    }
  }

  return previewUrl
}
