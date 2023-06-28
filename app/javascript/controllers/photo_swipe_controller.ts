import ApplicationController from './application_controller'
//@ts-ignore
import PhotoSwipeLightbox from 'photoswipe/lightbox'
// @ts-ignore
import PhotoSwipeFullscreen from 'photoswipe-fullscreen/photoswipe-fullscreen.esm.min.js'
export default class PhotoSwipeController extends ApplicationController {
  static targets = ['ps']

  declare readonly psTarget: HTMLElement

  lightbox: PhotoSwipeLightbox

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
        //@ts-ignore
        pswpModule: () => import('photoswipe')
      })
      const fullscreenPlugin = new PhotoSwipeFullscreen(this.lightbox) // eslint-disable-line @typescript-eslint/no-unused-vars
      this.lightbox.init()
    }
  }

  disconnect(){
    if(this.lightbox){
      this.lightbox.destroy()
      this.removeElementsByClassName('pswp')
    }
  }

  assignSize(trigger: any){
    const gallery = trigger.querySelectorAll('a')
    gallery.forEach(async (el: any) => {
      const img: any = await this.loadImage(el.href)
      el.setAttribute('data-pswp-width', img.naturalWidth)
      el.setAttribute('data-pswp-height', img.naturalHeight)
      el.firstElementChild.removeAttribute('style')
    })
  }

  loadImage(src: any) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = e => reject(e)
      img.src = src
    })
  }
}
