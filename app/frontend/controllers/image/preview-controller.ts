import ApplicationController from '~/controllers/application-controller'

export default class PreviewController extends ApplicationController {
  static targets = ['upload', 'content', 'image']

  declare readonly uploadTarget: HTMLInputElement
  declare readonly contentTarget: HTMLElement
  declare readonly imageTarget: HTMLImageElement

  declare readonly hasUploadTarget: boolean
  declare readonly hasContentTarget: boolean
  declare readonly hasImageTarget: boolean

  elmUpload: HTMLInputElement | null = null
  content: HTMLElement| null = null
  preview: HTMLImageElement | null = null

  connect(): void {
    if (this.hasUploadTarget) this.elmUpload = this.uploadTarget
    if (this.hasContentTarget) this.content = this.contentTarget
    if (this.hasImageTarget) this.preview = this.imageTarget

    this.#setUploadEventListener()
  }

  #setUploadEventListener(): void {
    const previewImage = this.#previewImage.bind(this)
    const hidePreview = this.#hidePreview.bind(this)

    this.elmUpload?.addEventListener('change', function () {
      const file: { data?: File | null } = {}
      // (.file_fieldからデータを取得して変数file.dataに代入します)
      file.data = this.files?.item(0)
      if (file.data?.type.match(/^image\/(jpeg|jpg|png|gif|webp|avif)$/)) {
        previewImage({ file })
      } else {
        hidePreview()
      }
    })
  }

  #previewImage({ file }: { file: { data?: File | null } }): void {
    const content = this.content
    const preview = this.preview

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

  #hidePreview(): void {
    if (this.content && this.content.classList.contains('block')) {
      this.content.classList.add('hidden')
    }
  }
}
