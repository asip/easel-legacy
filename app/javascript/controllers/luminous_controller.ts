import ApplicationController from './application_controller'
// @ts-expect-error : @types doesn't exist
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
      this.image = new Luminous(lm_trigger, options) // eslint-disable-line
    }
  }

  disconnect(){
    if(this.image){
      this.image.destroy() // eslint-disable-line
      this.removeElementsByClassName('lum-lightbox')
    }
  }
}
