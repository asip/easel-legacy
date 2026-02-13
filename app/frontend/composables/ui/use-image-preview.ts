interface ImagePreviewOptions {
  el: HTMLInputElement | null
  contentEl: HTMLElement | null
  previewEl: HTMLImageElement | null
}

export function useImagePreview({ el, contentEl, previewEl }: ImagePreviewOptions) {
  const setUploadEventListener = (): void => {
    el?.addEventListener('change', function () {
      // (.file_fieldからデータを取得して変数fileに代入します)
      const file: File | null | undefined = this.files?.item(0)

      if (file?.type.match(/^image\/(jpeg|jpg|png|gif|webp|avif)$/)) {
        setImage({ file })
      } else {
        hidePreview()
      }
    })
  }

  const setImage = ({ file }: { file: File }): void => {
    // (FileReaderオブジェクトを作成します)
    const reader = new FileReader()
    // (読み込みが完了したら処理が実行されます)
    reader.onload = function () {
      // (読み込んだファイルの内容を取得して変数imageに代入します)
      const image: string | ArrayBuffer | null = this.result
      //console.log(content.classList);
      if (previewEl) {
        previewEl.src = image as string
      }
      // (プレビュー画像がなければ表示します)
      if (contentEl && contentEl.classList.contains('hidden')) {
        contentEl.classList.remove('hidden')
      }
    }
    // (DataURIScheme文字列を取得します)
    reader.readAsDataURL(file)
  }

  const hidePreview = (): void => {
    if (contentEl && contentEl.classList.contains('block')) {
      contentEl.classList.add('hidden')
    }
  }

  return { setUploadEventListener }
}
