import ApplicationController from './application_controller'
//@ts-ignore
import PhotoSwipeLightbox from 'photoswipe/lightbox'

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
      const gallery = ps_trigger.querySelectorAll('a')
      gallery.forEach((el: any) => {
        this.loadImage(el.href).then((img: any) => {
          el.setAttribute('data-pswp-width', img.naturalWidth)
          el.setAttribute('data-pswp-height', img.naturalHeight)
          el.firstElementChild.removeAttribute('style')
        })
      })

      this.lightbox = new PhotoSwipeLightbox({
        gallery: '#image',
        children: 'a',
        initialZoomLevel: 'fit',
        pswpModule: () => import('photoswipe')
      })
      this.lightbox.init()
    }
  }

  disconnect(){
    if(this.lightbox){
      this.lightbox.destroy()
      this.removeElementsByClassName('pswp')
    }
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
