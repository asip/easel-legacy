import ApplicationController from './application_controller'

import Tagify from '@yaireo/tagify'

export default class TagifyController extends ApplicationController {
  static targets = ['te', 'tl']

  declare readonly teTarget: HTMLElement
  declare readonly tlTarget: HTMLInputElement

  tag_list!: HTMLInputElement
  tag_editor: Tagify

  declare readonly hasTeTarget: boolean
  declare readonly hasTlTarget: boolean

  connect() {
    let te_trigger: HTMLElement | null = null
    if(this.hasTeTarget){
      te_trigger = this.teTarget
    }
    if(this.hasTlTarget){
      this.tag_list = this.tlTarget
    }

    if(te_trigger){
      this.tag_editor = new Tagify(te_trigger, {
        maxTags: 5,
        dropdown: {
          classname: 'color-blue',
          enabled: 0,
          maxItems: 30,
          closeOnSelect: false,
          highlightFirst: true,
        }
      })

      this.tag_editor.on('add', () => this.saveTagList())
      this.tag_editor.on('remove', () => this.saveTagList())

      const tags: string = this.tag_list.value
      this.tag_editor.removeAllTags()
      if (tags.length > 0) {
        this.tag_editor.addTags(tags.split(','))
      }
    }
  }

  saveTagList() {
    this.tag_list.value = this.tag_editor.value.map(v => v.value).join(',')
    //console.log(this.tlTarget.value);
  }

  disconnect(){
    if(this.tag_editor){
      this.tag_editor.removeAllTags()
      this.removeElementsByClassName('tagify')
    }
  }
}
