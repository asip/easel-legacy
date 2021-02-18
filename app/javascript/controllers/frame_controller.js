import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ['lm', 'te']
  
  connect() {
    var lm_trigger = null;
    try{
      lm_trigger = this.lmTarget;
    } catch(e) {}
    var te_trigger = null;
    try{
      te_trigger = this.teTarget;
    } catch(e) {}

    if(lm_trigger){
      new Luminous(lm_trigger);
    }

    if(te_trigger){
      $(te_trigger).tagEditor('destroy');
      $(te_trigger).tagEditor({
        placeholder: '',
        delimiter: ', '
      });
    }
  }
}
