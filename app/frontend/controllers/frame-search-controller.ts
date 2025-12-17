import ApplicationController from './application-controller'

import * as v from 'valibot'

import { i18n } from '../i18n'
import { useLocale, useCookie } from '../composables'
import { searchCriteria } from '../stores'

export default class FrameSearchController extends ApplicationController {
  static targets = ['tooltip', 'word', 'q']

  declare readonly tooltipTarget: HTMLDivElement
  declare readonly hasTooltipTarget: boolean
  declare readonly wordTarget: HTMLInputElement
  declare readonly hasWordTarget: boolean
  declare readonly qTarget: HTMLInputElement
  declare readonly hasQTarget: boolean

  tooltipElement: HTMLDivElement | null = null
  wordElement: HTMLInputElement | null = null
  qElement: HTMLInputElement | null = null

  connect(): void {
    if (this.hasTooltipTarget) this.tooltipElement = this.tooltipTarget
    if (this.hasWordTarget) this.wordElement = this.wordTarget
    if (this.hasQTarget) this.qElement = this.qTarget

    this.tooltipElement?.classList.remove('tooltip-error')

    if(this.wordElement) {
      const qItems: Record<'word', string>  = JSON.parse(searchCriteria.get()) as Record<'word', string>
      this.wordElement.value = qItems['word'] ? qItems['word'] : ''
    }
  }

  submit(event: Event): void {
    // globalThis.console.log(this.wordElement?.value)
    if (this.qElement) {
      const { cookies } = useCookie()
      const { autoDetect } = useLocale()

      autoDetect()

      const schema = v.pipe(v.string(), v.maxLength(40))
      const result = v.safeParse(schema, this.wordElement?.value, { lang: i18n.global.locale.value })

      if (result.success) {
        this.qElement.value = this.wordElement?.value ? JSON.stringify({ word: this.wordElement.value }) : '{}'
        searchCriteria.set(this.qElement.value)
        cookies.set('q', this.qElement.value, { path: '/' });
        (this.element as HTMLFormElement).requestSubmit()
      } else {
        if (this.tooltipElement) {
          this.tooltipElement.dataset['tip'] = result.issues[0].message
          this.tooltipElement.classList.add('tooltip-open')
          this.tooltipElement.classList.add('tooltip-error')
        }
        event.preventDefault()
      }
    }
    // globalThis.console.log(this.qElement?.value)

  }

  clearTooltip(): void {
    if (this.tooltipElement && this.tooltipElement.dataset['tip'] != 'タグ or 名前 or 撮影/登録/更新日') {
      this.tooltipElement.dataset['tip'] = 'タグ or 名前 or 撮影/登録/更新日'
      this.tooltipElement.classList.remove('tooltip-error')
      this.tooltipElement.classList.remove('tooltip-open')
    }
  }
}
