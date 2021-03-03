import { Controller } from "stimulus"
import Tagify from '@yaireo/tagify'

export default class FrameController extends Controller {
  static targets = ['lm', 'te', 'tl'];
  image;
  tag_list;
  tag_editor;

  connect() {
    var lm_trigger = null;
    try{
      lm_trigger = this.lmTarget;
    } catch(e) {}
    var te_trigger = null;
    try{
      te_trigger = this.teTarget;
    } catch(e) {}
    //this.tag_list = null;
    try{
      this.tag_list = this.tlTarget;
    } catch(e) {}

    if(lm_trigger){
      const options = { showCloseButton: true };
      this.image = new Luminous(lm_trigger, options);
    }

    if(te_trigger){
      this.tag_editor = new Tagify(te_trigger, {
        maxTags: 5,
        dropdown: {
          classname: "color-blue",
          enabled: 0,
          maxItems: 30,
          closeOnSelect: false,
          highlightFirst: true,
        }
      });

      this.tag_editor.on('add', e => this.saveTagList(e.detail.tagify));
      this.tag_editor.on('remove', e => this.saveTagList(e.detail.tagify));

      const tags = this.tag_list.value;
      this.tag_editor.removeAllTags();
      if (tags.length > 0) {
        this.tag_editor.addTags(tags.split(","));
      }
    }
  }

  saveTagList(tagify) {
    this.tag_list.value = this.tag_editor.value.map(v => v.value).join(",");
    //console.log(this.tlTarget.value);
  }

  disconnect(){
    if(this.image){
      this.image.destroy();
      const image_elements = this.element.getElementsByClassName('lum-lightbox');
      Array.from(image_elements).forEach(e => e.remove());
    }

    if(this.tag_editor){
      this.tag_editor.removeAllTags()
      const tag_editor_elements = this.element.getElementsByClassName('tagify');
      Array.from(tag_editor_elements).forEach(e => e.remove());
    }
  }
}
