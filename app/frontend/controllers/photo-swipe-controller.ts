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

  lightbox: PhotoSwipeLightbox | undefined = undefined

  connect(): void {
    if (this.selectorValue) {
      const { lightbox, init } = usePhotoSwipe(this.selectorValue, {
        anchor: this.anchorValue,
      })

      void (async () => {
        await init()
        this.lightbox = lightbox
      })()
    }
  }

  disconnect(): void {
    if (this.lightbox) {
      this.lightbox.destroy()
      this.removeElements('.pswp')
    }
  }
}
