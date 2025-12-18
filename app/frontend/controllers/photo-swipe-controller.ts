import ApplicationController from './application-controller'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
// @ts-expect-error : @types doesn't exist
import PhotoSwipeFullscreen from 'photoswipe-fullscreen'

export default class PhotoSwipeController extends ApplicationController {
  static targets = ['ps']

  declare readonly psTarget: HTMLElement

  declare readonly hasPsTarget: boolean

  lightbox: PhotoSwipeLightbox | null = null

  connect(): void {
    let psElement: HTMLElement | null = null

    if (this.hasPsTarget) psElement = this.psTarget

    if (psElement) {
      void (async () => {
        await this.assignSize(psElement)
      })()

      this.lightbox = new PhotoSwipeLightbox({
        gallery: '#image',
        children: 'a',
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

  async assignSize(trigger: HTMLElement): Promise<void> {
    const gallery = trigger.querySelectorAll('a')
    for (const el of gallery) {
      const img: HTMLImageElement = await this.loadImage(el.href)
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
