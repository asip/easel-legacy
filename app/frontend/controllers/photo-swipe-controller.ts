import ApplicationController from './application-controller'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
// @ts-expect-error : @types doesn't exist
import PhotoSwipeFullscreen from 'photoswipe-fullscreen'

export default class PhotoSwipeController extends ApplicationController {
  static values = {
    selector: String,
    anchor: String
  }

  declare readonly selectorValue: string
  declare readonly anchorValue: string

  lightbox: PhotoSwipeLightbox | null = null

  connect(): void {
    if (this.selectorValue) {
      void (async () => {
        await this.assignSize()
      })()

      this.lightbox = new PhotoSwipeLightbox({
        gallery: this.selectorValue,
        children: this.anchorValue ? this.anchorValue : 'a',
        initialZoomLevel: 'fit',
        pswpModule: () => import('photoswipe')
      })
      new PhotoSwipeFullscreen(this.lightbox) // eslint-disable-line
      this.lightbox.init()
    }
  }

  disconnect(): void {
    if (this.lightbox) {
      this.lightbox.destroy()
      this.removeElementsByClassName('pswp')
    }
  }

  async assignSize(): Promise<void> {
    const galleryAnchors = globalThis.document.querySelectorAll(`${this.selectorValue} ${this.anchorValue ? this.anchorValue : 'a'}`)
    // globalThis.console.log(`${this.selectorValue} ${this.anchorValue ? this.anchorValue : 'a'}`)
    // globalThis.console.log(galleryAnchors)

    for (const el of galleryAnchors) {
      const img: HTMLImageElement = await this.loadImage((el as HTMLLinkElement).href)
      // globalThis.console.log(img.naturalWidth.toString())
      // globalThis.console.log(img.naturalHeight.toString())
      el.setAttribute('data-pswp-width', img.naturalWidth.toString())
      el.setAttribute('data-pswp-height', img.naturalHeight.toString())
      el.firstElementChild?.removeAttribute('style')
    }
  }

  async loadImage(src: string): Promise<HTMLImageElement> {
    const img: HTMLImageElement = new globalThis.Image()
    img.src = src
    await img.decode()
    return img
  }
}
