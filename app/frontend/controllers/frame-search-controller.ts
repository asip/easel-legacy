import ApplicationController from './application-controller'

import * as v from 'valibot'

import { i18n } from '../i18n'
import { useLocale, useCookie } from '../composables'
import { searchCriteria } from '../stores'

export default class FrameSearchController extends ApplicationController {
  static targets = ['tooltip', 'message', 'word', 'tag', 'q']

  declare readonly tooltipTarget: HTMLDivElement
  declare readonly hasTooltipTarget: boolean
  declare readonly messageTarget: HTMLInputElement
  declare readonly hasMessageTarget: boolean
  declare readonly wordTarget: HTMLInputElement
  declare readonly hasWordTarget: boolean
  declare readonly tagTarget: HTMLInputElement
  declare readonly hasTagTarget: boolean
  declare readonly qTarget: HTMLInputElement
  declare readonly hasQTarget: boolean

  tooltipElement: HTMLDivElement | null = null
  messageElement: HTMLDivElement | null = null
  wordElement: HTMLInputElement | null = null
  tagElement: HTMLInputElement | null = null
  qElement: HTMLInputElement | null = null

  connect(): void {
    if (this.hasTooltipTarget) this.tooltipElement = this.tooltipTarget
    if (this.hasMessageTarget) this.messageElement = this.messageTarget
    if (this.hasWordTarget) this.wordElement = this.wordTarget
    if (this.hasTagTarget) this.tagElement = this.tagTarget
    if (this.hasQTarget) this.qElement = this.qTarget

    this.tooltipElement?.classList.remove('tooltip-error')

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
          if (this.tooltipElement) {
            this.tooltipElement.dataset['tip'] = wordResult.issues[0].message
            this.tooltipElement.classList.add('tooltip-open')
            this.tooltipElement.classList.add('tooltip-error')
          }
          event.preventDefault()
        }
      } else {
        const tagSchema = v.pipe(v.string(), v.maxLength(10))
        const tagResult = v.safeParse(tagSchema, this.tagElement?.value, { lang: i18n.global.locale.value })

        if (tagResult.success) {
          this.qElement.value = this.tagElement?.value ? JSON.stringify({ tag_name: this.tagElement.value }) : '{}'
          this.#search()
        } else {
          if (this.messageElement) this.messageElement.innerHTML = tagResult.issues[0].message
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

  clearTooltip(): void {
    if (this.tooltipElement && this.tooltipElement.dataset['tip'] != i18n.global.t('search.tooltip.word')) {
      this.tooltipElement.dataset['tip'] = i18n.global.t('search.tooltip.word')
      this.tooltipElement.classList.remove('tooltip-error')
      this.tooltipElement.classList.remove('tooltip-open')
    }
  }

  clearMessage(): void {
    if (this.messageElement && this.messageElement.innerHTML != '') this.messageElement.innerHTML = ''
  }
}
