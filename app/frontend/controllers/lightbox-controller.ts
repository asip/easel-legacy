import ApplicationController from './application-controller'
import GLightbox from 'glightbox'

export default class LightboxController extends ApplicationController {
  // static targets = ['lb']

  // declare readonly lbTarget: HTMLElement

  lightbox: any

  // declare readonly hasLbTarget: boolean

  connect() {
    /*
    let lbTrigger: HTMLElement | null = null
    if (this.hasLbTarget){
      lbTrigger = this.lbTarget
    }
    */

    //if (lbTrigger){

    this.lightbox = GLightbox({ selector: '.lb' })
    //}
  }

  disconnect(){
    if (this.lightbox){
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      this.lightbox.close()
    }
  }
}
