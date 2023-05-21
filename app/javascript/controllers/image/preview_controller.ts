import ApplicationController from "../application_controller"

export default class PreviewController extends ApplicationController {
  static targets = ['upload', 'content', 'image']
  uploadTarget!: HTMLInputElement
  contentTarget!: HTMLElement
  imageTarget!: HTMLImageElement

  hasUploadTarget!: boolean
  hasContentTarget!: boolean
  hasImageTarget!: boolean

  connect() {
    let elm_upload: HTMLInputElement = null;
    if(this.hasUploadTarget){
      elm_upload = this.uploadTarget;
    }
    let content: HTMLElement = null;
    if(this.hasContentTarget) {
      content = this.contentTarget;
    }
    let preview: HTMLImageElement = null;
    if(this.hasImageTarget) {
      preview = this.imageTarget;
    }

    if (elm_upload) {
      elm_upload.addEventListener('change', function () {
        const file: { name?: string, ext?: string, data?: Blob } = {};
        file.name = this.value;
        file.ext = file.name.replace(/^.*\./, '').toLowerCase();
        if (file.ext.match(/^(jpeg|jpg|png|gif)$/)) {
          // .file_filedからデータを取得して変数file.dataに代入します
          file.data = this.files[0];
          // FileReaderオブジェクトを作成します
          const reader = new FileReader();
          // DataURIScheme文字列を取得します
          reader.readAsDataURL(file.data);
          // 読み込みが完了したら処理が実行されます
          reader.onload = function () {
            // 読み込んだファイルの内容を取得して変数imageに代入します
            const image: string | ArrayBuffer = this.result;
            //console.log(content.style.display);
            preview.src = image as string;
            // プレビュー画像がなければ表示します
            if (content.style.display == 'none') {
              content.style.display = 'block';
            }
          }
        } else {
          content.style.display = 'none';
        }
      });
    }
  }
}