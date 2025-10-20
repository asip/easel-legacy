import ApplicationController from '../application-controller'

export default class PreviewController extends ApplicationController {
  static targets = ['upload', 'content', 'image']

  declare readonly uploadTarget: HTMLInputElement
  declare readonly contentTarget: HTMLElement
  declare readonly imageTarget: HTMLImageElement

  declare readonly hasUploadTarget: boolean
  declare readonly hasContentTarget: boolean
  declare readonly hasImageTarget: boolean

  connect() {
    let elmUpload: HTMLInputElement | null = null
    if (this.hasUploadTarget){
      elmUpload = this.uploadTarget
    }
    let content: HTMLElement| null = null
    if (this.hasContentTarget) {
      content = this.contentTarget
    }
    let preview: HTMLImageElement | null = null
    if (this.hasImageTarget) {
      preview = this.imageTarget
    }

    if (elmUpload) {
      elmUpload.addEventListener('change', function () {
        // let blob: Blob | null| undefined
        const file: { data?: File | null } = {}

        // (.file_fieldからデータを取得して変数file.dataに代入します)
        file.data = this.files?.item(0)
        /*
        if (file.data) {
          const buffer = await file.data.arrayBuffer()
          blob = new Blob([buffer], { type: file.data.type })
        }
        */
        if (file.data?.type.match(/^image\/(jpeg|jpg|png|gif)$/)) {
          // (FileReaderオブジェクトを作成します)
          const reader = new FileReader()
          // (読み込みが完了したら処理が実行されます)
          reader.onload = function () {
            // (読み込んだファイルの内容を取得して変数imageに代入します)
            const image: string | ArrayBuffer | null = this.result
            //console.log(content.style.display);
            if (preview) { preview.src = image as string }
            // (プレビュー画像がなければ表示します)
            if (content && content.style.display == 'none') {
              content.style.display = 'block'
            }
          }
          // (DataURIScheme文字列を取得します)
          reader.readAsDataURL(file.data)
        } else {
          if (content) { content.style.display = 'none' }
        }
      })
    }
  }
}
