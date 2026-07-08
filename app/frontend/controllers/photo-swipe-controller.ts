import PhotoSwipeLightbox from 'photoswipe/lightbox'

import ApplicationController from './application-controller'

import { usePhotoSwipe } from '@/composables'

export default class PhotoSwipeController extends ApplicationController {
  static values = {
    selector: String,
    anchor: String,
  }

  declare readonly selectorValue: string
  declare readonly anchorValue: string

  lightbox: PhotoSwipeLightbox | null = null

  connect(): void {
    if (this.selectorValue) {
      const { initPhotoSwipe } = usePhotoSwipe({
        selector: this.selectorValue,
        anchor: this.anchorValue,
      })

      void (async () => {
        this.lightbox = await initPhotoSwipe()
      })()
    }
  }

  disconnect(): void {
    if (this.lightbox) {
      this.lightbox.destroy()
      this.removeElementsByClassName('pswp')
    }
  }
}
