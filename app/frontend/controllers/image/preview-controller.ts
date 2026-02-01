interface SetImageOptions {
  preview: HTMLImageElement | null
  content: HTMLElement| null
  file: { data?: File | null }
}

import ApplicationController from '~/controllers/application-controller'

export default class PreviewController extends ApplicationController {
  static targets = ['upload', 'content', 'image']

  declare readonly uploadTarget: HTMLInputElement
  declare readonly contentTarget: HTMLElement
  declare readonly imageTarget: HTMLImageElement

  declare readonly hasUploadTarget: boolean
  declare readonly hasContentTarget: boolean
  declare readonly hasImageTarget: boolean

  connect(): void {
    let elmUpload: HTMLInputElement | null = null
    let content: HTMLElement| null = null
    let preview: HTMLImageElement | null = null

    if (this.hasUploadTarget) elmUpload = this.uploadTarget
    if (this.hasContentTarget) content = this.contentTarget
    if (this.hasImageTarget) preview = this.imageTarget

    if (elmUpload) {
      this.#setEventListeners(elmUpload, { preview, content })
    }
  }

  #setEventListeners(elmUpload: HTMLInputElement, { preview, content }: { preview: HTMLImageElement | null, content: HTMLElement | null }): void {
    const setImage = this.#setImage.bind(this)

    elmUpload.addEventListener('change', function () {
      const file: { data?: File | null } = {}
      // (.file_fieldからデータを取得して変数file.dataに代入します)
      file.data = this.files?.item(0)
      if (file.data?.type.match(/^image\/(jpeg|jpg|png|gif|webp|avif)$/)) {
        setImage({ preview, content, file })
      } else {
        if (content && content.classList.contains('block')) {
          content.classList.add('hidden')
        }
      }
    })
  }

  #setImage({ preview, content, file }: SetImageOptions): void {
    // (FileReaderオブジェクトを作成します)
    const reader = new FileReader()
    // (読み込みが完了したら処理が実行されます)
    reader.onload = function () {
      // (読み込んだファイルの内容を取得して変数imageに代入します)
      const image: string | ArrayBuffer | null = this.result
      //console.log(content.classList);
      if (preview) { preview.src = image as string }
      // (プレビュー画像がなければ表示します)
      if (content && content.classList.contains('hidden')) {
        content.classList.remove('hidden')
      }
    }
    // (DataURIScheme文字列を取得します)
    if (file.data) reader.readAsDataURL(file.data)
  }
}
