import ApplicationController from './application-controller'
import GLightbox from 'glightbox'

export default class LightboxController extends ApplicationController {
  // static targets = ['lb']

  // declare readonly lbTarget: HTMLElement

  lightbox: ReturnType<typeof GLightbox> | null = null

  // declare readonly hasLbTarget: boolean

  connect(): void {
    /*
    let lbElement: HTMLElement | null = null
    if (this.hasLbTarget){
      lbElement = this.lbTarget
    }
    */

    //if (lbElement){

    this.lightbox = GLightbox({ selector: '.lb' })
    //}
  }

  disconnect(): void {
    if (this.lightbox){
      this.lightbox.close()
    }
  }
}
