import ApplicationController from '@/controllers/application-controller'

import { useImagePreview, usePreviewUrl } from '@/composables'

export default class PreviewController extends ApplicationController {
  static targets = ['preview', 'image']

  declare readonly previewTarget: HTMLElement
  declare readonly imageTarget: HTMLImageElement

  declare readonly hasPreviewTarget: boolean
  declare readonly hasImageTarget: boolean

  upload(evt: Event): void {
    const { previewUrl } = usePreviewUrl({
      imageEl: this.imageTarget,
      previewEl: this.previewTarget,
    })
    const { preview } = useImagePreview({ previewUrl })

    // Retrieve the uploaded data and assign it to the file variable.
    // (アップロードされたデータを取得して変数fileに代入します)
    const file: File | null = (evt.target as HTMLInputElement).files?.item(0) ?? null

    preview.value = file
  }
}
