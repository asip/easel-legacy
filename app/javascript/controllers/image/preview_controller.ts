import ApplicationController from '../application_controller'

export default class PreviewController extends ApplicationController {
  static targets = ['upload', 'content', 'image']

  declare readonly uploadTarget: HTMLInputElement
  declare readonly contentTarget: HTMLElement
  declare readonly imageTarget: HTMLImageElement

  declare readonly hasUploadTarget: boolean
  declare readonly hasContentTarget: boolean
  declare readonly hasImageTarget: boolean

  connect() {
    let elm_upload: HTMLInputElement | null = null
    if(this.hasUploadTarget){
      elm_upload = this.uploadTarget
    }
    let content: HTMLElement| null = null
    if(this.hasContentTarget) {
      content = this.contentTarget
    }
    let preview: HTMLImageElement | null = null
    if(this.hasImageTarget) {
      preview = this.imageTarget
    }

    if (elm_upload) {
      elm_upload.addEventListener('change', function () {
        const file: { name?: string, ext?: string, data?: Blob } = {}
        file.name = this.value
        file.ext = file.name.replace(/^.*\./, '').toLowerCase()
        if (file.ext.match(/^(jpeg|jpg|png|gif)$/)) {
          // .file_filedからデータを取得して変数file.dataに代入します
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          file.data = this.files![0]
          // FileReaderオブジェクトを作成します
          const reader = new FileReader()
          // 読み込みが完了したら処理が実行されます
          reader.onload = function () {
            // 読み込んだファイルの内容を取得して変数imageに代入します
            const image: string | ArrayBuffer | null = this.result
            //console.log(content.style.display);
            preview && (preview.src = image as string)
            // プレビュー画像がなければ表示します
            if (content && content.style.display == 'none') {
              content.style.display = 'block'
            }
          }
          // DataURIScheme文字列を取得します
          reader.readAsDataURL(file.data)
        } else {
          content && (content.style.display = 'none')
        }
      })
    }
  }
}