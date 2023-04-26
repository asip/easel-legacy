import { Controller } from "stimulus"
import { Luminous } from 'luminous-lightbox'

export default class LuminousController extends Controller {
  static targets = ['lm'];
  lmTarget!: HTMLElement

  image: Luminous;

  hasLmTarget!: boolean;

  connect() {
    let lm_trigger: HTMLElement = null;
    if(this.hasLmTarget){
      lm_trigger = this.lmTarget;
    }

    if(lm_trigger){
      const options = { showCloseButton: true };
      this.image = new Luminous(lm_trigger, options);
    }
  }

  disconnect(){
    if(this.image){
      this.image.destroy();
      this.removeElementsByClassName('lum-lightbox')
    }
  }

  removeElementsByClassName(className){
    const elements: HTMLCollectionOf<Element> = this.element.getElementsByClassName(className);
    Array.from(elements).forEach(e => e.remove());
  }
}
