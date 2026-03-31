import Tagify from '@yaireo/tagify'

import ApplicationController from './application-controller'

import { useTagSearch, useTagEditor, useTagList } from '~/composables'

export default class TagifyController extends ApplicationController {
  static targets = ['te', 'tl']

  declare readonly teTarget: HTMLInputElement
  declare readonly hasTeTarget: boolean

  declare readonly tlTarget: HTMLInputElement
  declare readonly hasTlTarget: boolean

  tagEditor: Tagify | null = null

  connect(): void {
    if (this.hasTeTarget && this.hasTlTarget) {
      const { tagList } = useTagList(this.tlTarget)
      const tagSearch = useTagSearch()
      const { initTagEditor } = useTagEditor({ el: this.teTarget, tagList, tagSearch })

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
