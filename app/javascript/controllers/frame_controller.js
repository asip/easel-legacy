import { Controller } from "stimulus"
import Tagify from '@yaireo/tagify'

export default class FrameController extends Controller {
  static targets = ['lm', 'te', 'tl']
  //static lm_elms = {};
  lm_trigger = null;
  tl_trigger = null;
  editor;

  connect() {
    //this.lm_trigger = null;
    try{
      this.lm_trigger = this.lmTarget;
    } catch(e) {}
    var te_trigger = null;
    try{
      te_trigger = this.teTarget;
    } catch(e) {}
    //this.tl_trigger = null;
    try{
      this.tl_trigger = this.tlTarget;
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
      this.editor = new Tagify(te_trigger, {
        maxTags: 5,
        dropdown: {
          classname: "color-blue",
          enabled: 0,
          maxItems: 30,
          closeOnSelect: false,
          highlightFirst: true,
        }
      });

      this.editor.on('add', e => this.saveTagList(e.detail.tagify));
      this.editor.on('remove', e => this.saveTagList(e.detail.tagify));

      const tag_list = this.tl_trigger.value;
      this.editor.removeAllTags();
      if (tag_list.length > 0) {
        this.editor.addTags(tag_list.split(','));
      }
    }
  }

  saveTagList(tagify) {
    this.tl_trigger.value = this.editor.value.map(v => v.value).join(",");
    //console.log(this.tlTarget.value);
  }

  disconnect(){
    //if(FrameController.lm_elms[this.lm_trigger]){
    //  FrameController.lm_elms[this.lm_trigger].destroy();
    //  delete FrameController.lm_elms[this.lm_trigger];
    //  //console.log(333);
    //}

    if(this.editor){
      this.editor.removeAllTags()
      const classes = this.element.getElementsByClassName('tagify');
      Array.from(classes).forEach(e => e.remove());
    }
  }
}
