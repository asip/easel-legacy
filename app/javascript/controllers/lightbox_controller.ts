import ApplicationController from './application_controller'
// @ts-expect-error : @types doesn't exist
import baguetteBox from 'baguettebox.js'

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
    /*
    // eslint-disable-next-line no-undef
    if(document.querySelector('#baguetteBox-overlay')){
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      baguetteBox.destroy()
    }
    */

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    this.lightbox = baguetteBox.run('.lb')
    //}
  }

  disconnect(){
    // eslint-disable-next-line no-undef
    if(this.lightbox && document.querySelector('#baguetteBox-overlay')){
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      baguetteBox.destroy() 
    }
  }
}
