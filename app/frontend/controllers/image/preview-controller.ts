import ApplicationController from '~/controllers/application-controller'

import { useImagePreview } from '~/composables'

export default class PreviewController extends ApplicationController {
  static targets = ['content', 'image']

  declare readonly contentTarget: HTMLElement
  declare readonly imageTarget: HTMLImageElement

  declare readonly hasUploadTarget: boolean
  declare readonly hasContentTarget: boolean
  declare readonly hasImageTarget: boolean

  contentElement: HTMLElement | null = null
  previewElement: HTMLImageElement | null = null

  connect(): void {
    if (this.hasContentTarget) this.contentElement = this.contentTarget
    if (this.hasImageTarget) this.previewElement = this.imageTarget
  }

  upload(evt: Event): void {
    // (.file_fieldからデータを取得して変数fileに代入します)
    const file: File | null = (evt.target as HTMLInputElement).files?.item(0) ?? null
    useImagePreview({ file, contentEl: this.contentElement, previewEl: this.previewElement })
  }
}
