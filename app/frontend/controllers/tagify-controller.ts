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

  controller: AbortController | null = null

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


      this.tagEditor.on('input', (ev) => { this.#onInput(ev) })

      this.tagEditor.on('add', () => { this.#saveTagList() })
      this.tagEditor.on('remove', () => { this.#saveTagList() })

      const tags: string | null = this.tagList?.value ?? null
      this.tagEditor.removeAllTags()
      if (tags && tags.length > 0) this.tagEditor.addTags(tags.split(','))
    }
  }

  #onInput(ev: CustomEvent): void {
    const { baseURL } = useConstants()

    // eslint-disable-next-line
    const value = ev.detail.value as string
    if(this.tagEditor) this.tagEditor.whitelist = []

    this.controller?.abort()
    this.controller = new AbortController()

    void (async () => {
      const url = value ? `${baseURL}/tags/search?q=${value}` : `${baseURL}/tags/search`

      const res = await globalThis.fetch(url, { signal: this.controller?.signal })
      const { tags } = (await res.json()) as { tags: string[] }
      if(this.tagEditor) {
        this.tagEditor.whitelist = tags
        this.tagEditor.loading(false).dropdown.show(value)
      }
    })()
  }

  #saveTagList(): void {
    if (this.tagList) this.tagList.value = this.tagEditor?.value.map(v => v.value).join(',') ?? ''
  }

  disconnect(): void {
    if (this.tagEditor) {
      this.tagEditor.destroy()
      this.removeElementsByClassName('tagify')
    }
  }
}
