import ApplicationController from './application-controller'

import Tagify from '@yaireo/tagify'

export default class TagifyController extends ApplicationController {
  static targets = ['te', 'tl']

  declare readonly teTarget: HTMLInputElement
  declare readonly tlTarget: HTMLInputElement

  tagList: HTMLInputElement | null = null
  tagEditor: Tagify | null = null

  declare readonly hasTeTarget: boolean
  declare readonly hasTlTarget: boolean

  connect() {
    let teTrigger: HTMLInputElement | null = null
    if (this.hasTeTarget){
      teTrigger = this.teTarget
    }
    if (this.hasTlTarget){
      this.tagList = this.tlTarget
    }

    if (teTrigger){
      this.tagEditor = new Tagify(teTrigger, {
        maxTags: 5,
        dropdown: {
          classname: 'color-blue',
          enabled: 0,
          maxItems: 30,
          closeOnSelect: false,
          highlightFirst: true,
        }
      })

      this.tagEditor.on('add', () => { this.saveTagList() })
      this.tagEditor.on('remove', () => { this.saveTagList() })

      const tags: string | null = this.tagList?.value ?? null
      this.tagEditor.removeAllTags()
      if (tags && tags.length > 0) {
        this.tagEditor.addTags(tags.split(','))
      }
    }
  }

  saveTagList() {
    if (this.tagList){
      this.tagList.value = this.tagEditor?.value.map(v => v.value).join(',') ?? ''
    }
  }

  disconnect(){
    if (this.tagEditor){
      this.tagEditor.destroy()
      this.removeElementsByClassName('tagify')
    }
  }
}
