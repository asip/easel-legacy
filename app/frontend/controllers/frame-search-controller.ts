import ApplicationController from './application-controller'

import * as v from 'valibot'

import { i18n } from '../i18n'
import { useLocale, useCookie } from '../composables'
import { searchCriteria } from '../stores'

export default class FrameSearchController extends ApplicationController {
  static targets = ['word', 'tag', 'q', 'wordMessage', 'tagMessage']

  declare readonly wordTarget: HTMLInputElement
  declare readonly hasWordTarget: boolean
  declare readonly tagTarget: HTMLInputElement
  declare readonly hasTagTarget: boolean
  declare readonly qTarget: HTMLInputElement
  declare readonly hasQTarget: boolean
  declare readonly wordMessageTarget: HTMLDivElement
  declare readonly hasWordMessageTarget: boolean
  declare readonly tagMessageTarget: HTMLDivElement
  declare readonly hasTagMessageTarget: boolean

  wordElement: HTMLInputElement | null = null
  tagElement: HTMLInputElement | null = null
  qElement: HTMLInputElement | null = null
  wordMessageElement: HTMLDivElement | null = null
  tagMessageElement: HTMLDivElement | null = null

  connect(): void {
    if (this.hasWordTarget) this.wordElement = this.wordTarget
    if (this.hasTagTarget) this.tagElement = this.tagTarget
    if (this.hasQTarget) this.qElement = this.qTarget
    if (this.hasWordMessageTarget) this.wordMessageElement = this.wordMessageTarget
    if (this.hasTagMessageTarget) this.tagMessageElement = this.tagMessageTarget

    if(this.wordElement && this.tagElement) {
      const qItems: Record<'word'|'tag_name', string>  = JSON.parse(searchCriteria.get()) as Record<'word'|'tag_name', string>
      this.wordElement.value = qItems['word'] ? qItems['word'] : ''
      this.tagElement.value = qItems['tag_name'] ? qItems['tag_name'] : ''
    }
  }

  submit(event: Event): void {
    // globalThis.console.log(this.wordElement?.value)
    if (this.qElement) {
      const { autoDetect } = useLocale()

      autoDetect()

      if (this.wordElement?.value) {
        const wordSchema = v.pipe(v.string(), v.maxLength(40))
        const wordResult = v.safeParse(wordSchema, this.wordElement.value, { lang: i18n.global.locale.value })

        if (wordResult.success) {
          this.qElement.value = JSON.stringify({ word: this.wordElement.value })
          this.#search()
        } else {
          if (this.wordMessageElement) this.wordMessageElement.innerHTML = wordResult.issues[0].message
          event.preventDefault()
        }
      } else {
        const tagSchema = v.pipe(v.string(), v.maxLength(10))
        const tagResult = v.safeParse(tagSchema, this.tagElement?.value, { lang: i18n.global.locale.value })

        if (tagResult.success) {
          this.qElement.value = this.tagElement?.value ? JSON.stringify({ tag_name: this.tagElement.value }) : '{}'
          this.#search()
        } else {
          if (this.tagMessageElement) this.tagMessageElement.innerHTML = tagResult.issues[0].message
          event.preventDefault()
        }
      }
    }
    // globalThis.console.log(this.qElement?.value)
  }

  #search(): void {
    const { cookies } = useCookie()

    if (this.qElement) {
      searchCriteria.set(this.qElement.value)
      cookies.set('q', this.qElement.value, { path: '/' });
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
