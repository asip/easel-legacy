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

  lightbox!: PhotoSwipeLightbox

  declare readonly hasPsTarget: boolean

  connect() {
    let ps_trigger: HTMLElement | null = null
    if(this.hasPsTarget){
      ps_trigger = this.psTarget
    }

    if(ps_trigger){
      this.assignSize(ps_trigger)

      this.lightbox = new PhotoSwipeLightbox({
        gallery: '#image',
        children: 'a',
        initialZoomLevel: 'fit',
        // eslint-disable-nextline
        pswpModule: () => import('photoswipe')
      })
      new PhotoSwipeFullscreen(this.lightbox) // eslint-disable-line @typescript-eslint/no-unused-vars
      this.lightbox.init()
    }
  }

  disconnect(){
    if(this.lightbox){
      this.lightbox.destroy()
      this.removeElementsByClassName('pswp')
    }
  }

  assignSize(trigger: HTMLElement){
    const gallery = trigger.querySelectorAll('a')
    gallery.forEach(async (el: HTMLAnchorElement) => {
      const img: HTMLImageElement = await this.loadImage(el.href)
      el.setAttribute('data-pswp-width', img.naturalWidth.toString())
      el.setAttribute('data-pswp-height', img.naturalHeight.toString())
      el.firstElementChild?.removeAttribute('style')
    })
  }

  loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img: HTMLImageElement = new window.Image()
      img.onload = () => { resolve(img) }
      img.onerror = e => { reject(e) }
      img.src = src
    })
  }
}
