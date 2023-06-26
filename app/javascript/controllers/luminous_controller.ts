import ApplicationController from './application_controller'
//@ts-ignore
import { Luminous } from 'luminous-lightbox'

export default class LuminousController extends ApplicationController {
  static targets = ['lm']

  declare readonly lmTarget: HTMLElement

  image: Luminous

  declare readonly hasLmTarget: boolean

  connect() {
    let lm_trigger: HTMLElement | null = null
    if(this.hasLmTarget){
      lm_trigger = this.lmTarget
    }

    if(lm_trigger){
      const options = { showCloseButton: true }
      this.image = new Luminous(lm_trigger, options)
    }
  }

  disconnect(){
    if(this.image){
      this.image.destroy()
      this.removeElementsByClassName('lum-lightbox')
    }
  }
}
