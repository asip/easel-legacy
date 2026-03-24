import { Ref } from '@vue/reactivity'

interface ImagePreviewOptions {
  file: File | null
  previewUrl: Ref<string | null>
}

export const useImagePreview = function ({ file, previewUrl }: ImagePreviewOptions) {
  const setPreview = (): void => {
    // (FileReaderオブジェクトを作成します)
    const reader = new FileReader()
    // (読み込みが完了したら処理が実行されます)
    reader.onload = function () {
      // (読み込んだファイルの内容を取得して変数imageに代入します)
      const image: string | ArrayBuffer | null = this.result
      // console.log(content.classList);
      previewUrl.value = image ? (image as string) : null
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
