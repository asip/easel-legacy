import ApplicationController from '~/controllers/application-controller'

import { useImagePreview, usePreviewUrl } from '~/composables'

export default class PreviewController extends ApplicationController {
  static targets = ['content', 'image']

  declare readonly contentTarget: HTMLElement
  declare readonly imageTarget: HTMLImageElement

  declare readonly hasUploadTarget: boolean
  declare readonly hasContentTarget: boolean
  declare readonly hasImageTarget: boolean

  upload(evt: Event): void {
    // (.file_fieldからデータを取得して変数fileに代入します)
    const file: File | null = (evt.target as HTMLInputElement).files?.item(0) ?? null
    const { previewUrl } = usePreviewUrl({
      imageEl: this.imageTarget,
      contentEl: this.contentTarget,
    })
    useImagePreview({ file, previewUrl })
  }
}
