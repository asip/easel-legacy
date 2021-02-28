import { Controller } from "stimulus"

export default class FrameController extends Controller {
  static targets = ['lm', 'te']
  static lm_elm;

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
      var options = { showCloseButton: true };
      if(!FrameController.lm_elm){
        FrameController.lm_elm = new Luminous(lm_trigger, options);
      }
    }

    if(te_trigger){
      $(te_trigger).tagEditor('destroy');
      $(te_trigger).tagEditor({
        placeholder: '',
        delimiter: ', '
      });
    }
  }

  disconnect(){
    FrameController.lm_elm.destroy();
  }
}
