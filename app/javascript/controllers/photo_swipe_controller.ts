import ApplicationController from './application_controller'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
// @ts-expect-error : @types doesn't exist
import PhotoSwipeFullscreen from 'photoswipe-fullscreen/photoswipe-fullscreen.esm.min.js'

interface Window {
  Image: {
    prototype: HTMLImageElement
    new (): HTMLImageElement
  }
}
declare var window: Window


export default class PhotoSwipeController extends ApplicationController {
  static targets = ['ps']

  declare readonly psTarget: HTMLElement

  lightbox: PhotoSwipeLightbox | null = null

  declare readonly hasPsTarget: boolean

  connect() {
    let ps_trigger: HTMLElement | null = null
    if(this.hasPsTarget){
      ps_trigger = this.psTarget
    }

    if(ps_trigger){
      void (async () => {
        await this.assignSize(ps_trigger)
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

  disconnect(){
    if(this.lightbox){
      this.lightbox.destroy()
      this.removeElementsByClassName('pswp')
    }
  }

  async assignSize(trigger: HTMLElement){
    const gallery = trigger.querySelectorAll('a')
    for  (const el of gallery){
      const img: HTMLImageElement = await this.loadImage(el.href)
      el.setAttribute('data-pswp-width', img.naturalWidth.toString())
      el.setAttribute('data-pswp-height', img.naturalHeight.toString())
      el.firstElementChild?.removeAttribute('style')
    }
  }

  async loadImage(src: string){
    const img: HTMLImageElement = new window.Image()
    img.src = src
    await img.decode()
    return img
  }
}
