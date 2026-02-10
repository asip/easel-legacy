import Tagify from '@yaireo/tagify'

import ApplicationController from './application-controller'

import { useTagEditor } from '~/composables'

export default class TagifyController extends ApplicationController {
  static targets = ['te', 'tl']

  declare readonly teTarget: HTMLInputElement
  declare readonly tlTarget: HTMLInputElement

  declare readonly hasTeTarget: boolean
  declare readonly hasTlTarget: boolean

  tagEditor: Tagify | null = null

  connect(): void {
    let teElement: HTMLInputElement | null = null
    let tagListElement: HTMLInputElement | null = null

    if (this.hasTeTarget) teElement = this.teTarget
    if (this.hasTlTarget) tagListElement = this.tlTarget

    if (teElement) {
      const { initTagEditor } = useTagEditor({ el: teElement, tagListEl: tagListElement })

      this.tagEditor = initTagEditor()
    }
  }

  disconnect(): void {
    if (this.tagEditor) {
      this.tagEditor.destroy()
      this.removeElementsByClassName('tagify')
    }
  }
}
