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
    if (this.hasTeTarget && this.hasTlTarget) {
      const { initTagEditor } = useTagEditor({ el: this.teTarget, tagListEl: this.tlTarget })

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
