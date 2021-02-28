import { Controller } from "stimulus"

export default class FrameController extends Controller {
  static targets = ['lm', 'te']
  //static lm_elms = {};
  lm_trigger = null;

  connect() {
    //this.lm_trigger = null;
    try{
      this.lm_trigger = this.lmTarget;
    } catch(e) {}
    var te_trigger = null;
    try{
      te_trigger = this.teTarget;
    } catch(e) {}

    if(this.lm_trigger){
      var options = { showCloseButton: true };
      
      //if(FrameController.lm_elms[this.lm_trigger]){
      //  FrameController.lm_elms[this.lm_trigger].destroy();
      //  delete FrameController.lm_elms[this.lm_trigger];
      //  //console.log("111");
      //}
      //if(!FrameController.lm_elms[this.lm_trigger]){
        //FrameController.lm_elms[this.lm_trigger] = 
        new Luminous(this.lm_trigger, options);
        //console.log("222");
      //}
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
    //if(FrameController.lm_elms[this.lm_trigger]){
    //  FrameController.lm_elms[this.lm_trigger].destroy();
    //  delete FrameController.lm_elms[this.lm_trigger];
    //  //console.log(333);
    //}
  }
}
