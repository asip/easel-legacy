import { computed } from '@vue/reactivity'

import { useElement } from './use-element'

interface ImagePreviewOptions {
  file: File | null
  contentEl: HTMLElement | null
  previewEl: HTMLImageElement | null
}

export function useImagePreview({ file, contentEl, previewEl }: ImagePreviewOptions) {
  const { src } = useElement(previewEl)

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

  const setPreview = (): void => {
    // (FileReaderオブジェクトを作成します)
    const reader = new FileReader()
    // (読み込みが完了したら処理が実行されます)
    reader.onload = function () {
      // (読み込んだファイルの内容を取得して変数imageに代入します)
      const image: string | ArrayBuffer | null = this.result
      //console.log(content.classList);
      // eslint-disable-next-line
      previewUrl.value = image?.toString() ?? null
    }
    // (DataURIScheme文字列を取得します)
    if (file) reader.readAsDataURL(file)
  }

  const previewImage = (): void => {
    if (file?.type.match(/^image\/(jpeg|jpg|png|gif|webp|avif)$/)) {
      setPreview()
    } else {
      previewUrl.value = null
    }
  }

  previewImage()
}
