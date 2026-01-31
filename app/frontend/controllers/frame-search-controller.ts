import ApplicationController from './application-controller'

import * as v from 'valibot'

import { i18n } from '~/i18n'
import { useLocale, useCookie } from '~/composables'
import { searchCriteria } from '~/stores'

interface SearchParams {
  word?: string | null
  tag_name?: string | null
  q?: string
}

export default class FrameSearchController extends ApplicationController {
  static targets = ['word', 'tag', 'wordMessage', 'tagMessage']

  declare readonly wordTarget: HTMLInputElement
  declare readonly hasWordTarget: boolean
  declare readonly tagTarget: HTMLInputElement
  declare readonly hasTagTarget: boolean
  declare readonly wordMessageTarget: HTMLDivElement
  declare readonly hasWordMessageTarget: boolean
  declare readonly tagMessageTarget: HTMLDivElement
  declare readonly hasTagMessageTarget: boolean

  wordElement: HTMLInputElement | null = null
  tagElement: HTMLInputElement | null = null
  wordMessageElement: HTMLDivElement | null = null
  tagMessageElement: HTMLDivElement | null = null

  #params: SearchParams = {}

  #schema = v.object({
    word: v.pipe(v.string(), v.maxLength(40)),
    tag_name: v.pipe(v.string(), v.maxLength(10))
  })

  connect(): void {
    if (this.hasWordTarget) this.wordElement = this.wordTarget
    if (this.hasTagTarget) this.tagElement = this.tagTarget
    if (this.hasWordMessageTarget) this.wordMessageElement = this.wordMessageTarget
    if (this.hasTagMessageTarget) this.tagMessageElement = this.tagMessageTarget

    if(this.wordElement && this.tagElement) {
      const qItems: Record<'word'|'tag_name', string>  = JSON.parse(searchCriteria.get()) as Record<'word'|'tag_name', string>
      this.wordElement.value = qItems.word ? qItems.word : ''
      this.tagElement.value = qItems.tag_name ? qItems.tag_name : ''
    }
  }

  submit(event: Event): void {
    // globalThis.console.log(this.wordElement?.value)
    const { autoDetect } = useLocale()

    autoDetect()

    this.#params = {
      word: this.wordElement?.value,
      tag_name: this.tagElement?.value
    }

    const result = v.safeParse(this.#schema, this.#params, { lang: i18n.global.locale.value })
    const messages = result.issues ? v.flatten(result.issues).nested : {}
    // globalThis.console.log(messages)

    const searchWord = (): void => {
      if (result.success) {
        this.#params.q = JSON.stringify({ word: this.#params.word })
        this.#search()
      } else {
        if (this.wordMessageElement) this.wordMessageElement.innerHTML = messages?.word?.at(0) ?? ''
        event.preventDefault()
      }
    }

    const searchTagName = (): void => {
      if (result.success) {
        this.#params.q = this.tagElement?.value ? JSON.stringify({ tag_name: this.#params.tag_name }) : '{}'
        this.#search()
      } else {
        if (this.tagMessageElement) this.tagMessageElement.innerHTML = messages?.tag_name?.at(0) ?? ''
        event.preventDefault()
      }
    }

    if (this.#params.word) {
      searchWord()
    } else {
      searchTagName()
    }
  }

  #search(): void {
    const { cookies } = useCookie()

    if (this.#params.q) {
      searchCriteria.set(this.#params.q)
      cookies.set('q', this.#params.q, { path: '/' });
      (this.element as HTMLFormElement).requestSubmit()
    }
  }

  clearWordMessage(): void {
    if (this.wordMessageElement && this.wordMessageElement.innerHTML != '') this.wordMessageElement.innerHTML = ''
  }

  clearTagMessage(): void {
    if (this.tagMessageElement && this.tagMessageElement.innerHTML != '') this.tagMessageElement.innerHTML = ''
  }
}
