import Tagify from '@yaireo/tagify'

import ApplicationController from './application-controller'

import { useElement } from '@vesperjs/vue'

import { useTagSearch, useTagList, useTagEditor } from '@/composables'

export default class TagifyController extends ApplicationController {
  static targets = ['te', 'tl']

  declare readonly teTarget: HTMLInputElement
  declare readonly hasTeTarget: boolean

  declare readonly tlTarget: HTMLInputElement
  declare readonly hasTlTarget: boolean

  tagEditor: Tagify | null = null

  connect(): void {
    if (this.hasTeTarget && this.hasTlTarget) {
      const tagSearch = useTagSearch()

      const { value: tags } = useElement(this.tlTarget, { property: 'value' })
      const { tagList } = useTagList(tags)

      const settings = {
        maxTags: 5,
        dropdown: {
          classname: 'color-blue',
          enabled: 0,
          maxItems: 30,
          closeOnSelect: false,
          highlightFirst: true,
        },
      }

      const { initTagEditor } = useTagEditor({ el: this.teTarget, settings, tagList, tagSearch })

      this.tagEditor = initTagEditor()
    }
  }

  disconnect(): void {
    if (this.tagEditor) {
      this.tagEditor.destroy()
      this.removeElements('.tagify')
    }
  }
}
