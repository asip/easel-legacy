import { Controller } from "stimulus"
import Tagify from '@yaireo/tagify'

export default class FrameController extends Controller {
  static targets = ['lm', 'te', 'tl']
  //static lm_elms = {};
  lm_trigger = null;
  tl_trigger = null;
  image;
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
      const options = { showCloseButton: true };
      this.image = new Luminous(this.lm_trigger, options);
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
    if(this.image){
      this.image.destroy();
      const image_elements = this.element.getElementsByClassName('lum-lightbox');
      Array.from(image_elements).forEach(e => e.remove());
    }

    if(this.editor){
      this.editor.removeAllTags()
      const editor_elements = this.element.getElementsByClassName('tagify');
      Array.from(editor_elements).forEach(e => e.remove());
    }
  }
}
