import ApplicationController from './application_controller'
import GLightbox from 'glightbox'

export default class LightboxController extends ApplicationController {
  // static targets = ['lb']

  // declare readonly lbTarget: HTMLElement

  lightbox: any

  // declare readonly hasLbTarget: boolean

  connect() {
    /*
    let lb_trigger: HTMLElement | null = null
    if(this.hasLbTarget){
      lb_trigger = this.lbTarget
    }
    */

    //if(lb_trigger){

    this.lightbox = GLightbox({ selector: '.lb' })
    //}
  }

  disconnect(){
    if(this.lightbox){
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      this.lightbox.close()
    }
  }
}
