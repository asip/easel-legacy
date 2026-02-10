import ApplicationController from '~/controllers/application-controller'

import { useImagePreview } from '~/composables'

export default class PreviewController extends ApplicationController {
  static targets = ['upload', 'content', 'image']

  declare readonly uploadTarget: HTMLInputElement
  declare readonly contentTarget: HTMLElement
  declare readonly imageTarget: HTMLImageElement

  declare readonly hasUploadTarget: boolean
  declare readonly hasContentTarget: boolean
  declare readonly hasImageTarget: boolean

  connect(): void {
    let uploadElement: HTMLInputElement | null = null
    let contentElement: HTMLElement| null = null
    let previewElement: HTMLImageElement | null = null

    if (this.hasUploadTarget) uploadElement = this.uploadTarget
    if (this.hasContentTarget) contentElement = this.contentTarget
    if (this.hasImageTarget) previewElement = this.imageTarget

    const { setUploadEventListener } = useImagePreview(
      { el: uploadElement, contentEl: contentElement, previewEl: previewElement }
    )

    setUploadEventListener()
  }
}
