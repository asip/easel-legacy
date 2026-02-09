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
      this.#initTagEditor(teElement)
      this.#initTags()
      this.#setEventCallbacks()
    }
  }

  #initTagEditor(el: HTMLInputElement): void {
    this.tagEditor = new Tagify(el, {
      maxTags: 5,
      dropdown: {
        classname: 'color-blue',
        enabled: 0,
        maxItems: 30,
        closeOnSelect: false,
        highlightFirst: true,
      }
    })
  }

  #initTags(): void {
    this.tagEditor?.removeAllTags()
    const tags: string | null = this.tagList?.value ?? null
    if (tags && tags.length > 0) this.tagEditor?.addTags(tags.split(','))
  }

  #setEventCallbacks(): void {
    this.tagEditor?.on('input', (ev) => { this.#onInput(ev) })
    this.tagEditor?.on('add', () => { this.#saveTagList() })
    this.tagEditor?.on('remove', () => { this.#saveTagList() })
  }

  #onInput(ev: CustomEvent): void {
    // eslint-disable-next-line
    const value = ev.detail.value as string
    if(this.tagEditor) this.tagEditor.whitelist = []

    this.controller?.abort()
    this.controller = new AbortController()

    void (async () => {
      const tags = await this.#searchTag(value)
      this.#setAutocomplete(value, tags)
    })()
  }

  #searchTag = async (tag: string): Promise<string[]> => {
    const { baseURL } = useConstants()

    const url = tag ? `${baseURL}/tags/search?q=${tag}` : `${baseURL}/tags/search`

    const res = await globalThis.fetch(url, { signal: this.controller?.signal })
    const { tags } = (await res.json()) as { tags: string[] }
    return tags
  }

  #setAutocomplete = (value: string, tags: string[]): void => {
    if(this.tagEditor) {
      this.tagEditor.whitelist = tags
      this.tagEditor.loading(false).dropdown.show(value)
    }
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
