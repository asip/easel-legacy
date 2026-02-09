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

  submit(ev: Event): void {
    const { autoDetect } = useLocale()

    autoDetect()

    this.#params = {
      word: this.wordElement?.value,
      tag_name: this.tagElement?.value
    }

    const { success, errorMessages } = this.#validateParams()

    if (this.#params.word) {
      this.#searchWord({ ev, success, message: errorMessages?.word?.at(0) ?? '' })
    } else {
      this.#searchTagName({ ev, success, message: errorMessages?.tag_name?.at(0) ?? '' })
    }
  }

  #validateParams(){
    const result = v.safeParse(this.#schema, this.#params, { lang: i18n.global.locale.value })
    const errorMessages = result.issues ? v.flatten(result.issues).nested : {}
    const success = result.success

    return { success, errorMessages }
  }

  #searchWord({ ev, success, message }: { ev: Event, success: boolean, message: string }): void {
    if (success) {
      this.#params.q = JSON.stringify({ word: this.#params.word })
      this.#search()
    } else {
      this.#setErrorMessage({ ev, el: this.wordMessageElement, message })
    }
  }

  #searchTagName({ ev, success, message }: { ev: Event, success: boolean, message: string }): void {
    if (success) {
      this.#params.q = this.tagElement?.value ? JSON.stringify({ tag_name: this.#params.tag_name }) : '{}'
      this.#search()
    } else {
      this.#setErrorMessage({ ev, el: this.tagMessageElement, message })
    }
  }

  #setErrorMessage({ ev, el, message }: { ev: Event, el: HTMLDivElement | null, message: string }) {
    if (el) el.innerHTML = message
    ev.preventDefault()
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
