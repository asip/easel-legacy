import Tagify from '@yaireo/tagify'

import ApplicationController from './application-controller'

import { useConstants } from '~/composables'

export default class TagifyController extends ApplicationController {
  static targets = ['te', 'tl']

  declare readonly teTarget: HTMLInputElement
  declare readonly tlTarget: HTMLInputElement

  declare readonly hasTeTarget: boolean
  declare readonly hasTlTarget: boolean

  tagList: HTMLInputElement | null = null
  tagEditor: Tagify | null = null

  connect(): void {
    let teElement: HTMLInputElement | null = null

    if (this.hasTeTarget) teElement = this.teTarget
    if (this.hasTlTarget) this.tagList = this.tlTarget

    if (teElement) {
      this.tagEditor = new Tagify(teElement, {
        maxTags: 5,
        dropdown: {
          classname: 'color-blue',
          enabled: 0,
          maxItems: 30,
          closeOnSelect: false,
          highlightFirst: true,
        }
      })

      const { baseURL } = useConstants()

      let controller: AbortController | null
      let tagify = this.tagEditor

      function onInput(event: CustomEvent): void {
        // eslint-disable-next-line
        const value = event.detail.value as string
        tagify.whitelist = []

        controller?.abort()
        controller = new AbortController()

        void (async () => {
          const res = await globalThis.fetch(`${baseURL}/tags/search?q=${value}`, { signal: controller.signal })
          const { tags: newWhiteList } = (await res.json()) as { tags: string[] }
          tagify.whitelist = newWhiteList
          tagify.loading(false).dropdown.show(value)
        })()
      }

      this.tagEditor.on('input', onInput)

      this.tagEditor.on('add', () => { this.saveTagList() })
      this.tagEditor.on('remove', () => { this.saveTagList() })

      const tags: string | null = this.tagList?.value ?? null
      this.tagEditor.removeAllTags()
      if (tags && tags.length > 0) this.tagEditor.addTags(tags.split(','))
    }
  }

  saveTagList(): void {
    if (this.tagList) this.tagList.value = this.tagEditor?.value.map(v => v.value).join(',') ?? ''
  }

  disconnect(): void {
    if (this.tagEditor) {
      this.tagEditor.destroy()
      this.removeElementsByClassName('tagify')
    }
  }
}
