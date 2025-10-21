import ApplicationController from './application-controller'

export default class FrameSearchController extends ApplicationController {
  static targets = ['tooltip', 'word', 'q']

  declare readonly tooltipTarget: HTMLDivElement
  declare readonly hasTooltipTarget: boolean
  declare readonly wordTarget: HTMLInputElement
  declare readonly hasWordTarget: boolean
  declare readonly qTarget: HTMLInputElement
  declare readonly hasQTarget: boolean

  tooltipTrigger: HTMLDivElement | null = null
  wordTrigger: HTMLInputElement | null = null
  qTrigger: HTMLInputElement | null = null

  connect() {
    if (this.hasTooltipTarget) {
      this.tooltipTrigger = this.tooltipTarget
    }
    if (this.hasWordTarget) {
      this.wordTrigger = this.wordTarget
    }
    if (this.hasQTarget) {
      this.qTrigger = this.qTarget
    }

    this.tooltipTrigger?.classList.remove('tooltip-error')
  }

  submit(event: Event) {
    // globalThis.console.log(this.wordTrigger?.value)
    if (this.qTrigger) {
      if (this.wordTrigger?.value) {
        this.qTrigger.value = JSON.stringify({ word: this.wordTrigger.value })
      } else {
        this.qTrigger.name= ''
      }
    }
    // globalThis.console.log(this.qTrigger?.value)

    if (this.wordTrigger?.value != null && this.wordTrigger.value.length <= 40) {
      (this.element as HTMLFormElement).requestSubmit()
    } else {
      if (this.tooltipTrigger) {
        this.tooltipTrigger.dataset['tip'] = '40文字以内で入力してください'
        this.tooltipTrigger.classList.add('tooltip-open')
        this.tooltipTrigger.classList.add('tooltip-error')
      }
      event.preventDefault()
    }
  }

  clearTooltip(){
    if (this.tooltipTrigger && this.tooltipTrigger.dataset['tip'] !=  'タグ or 名前 or 撮影/登録/更新日') {
      this.tooltipTrigger.dataset['tip'] =  'タグ or 名前 or 撮影/登録/更新日'
      this.tooltipTrigger.classList.remove('tooltip-error')
      this.tooltipTrigger.classList.remove('tooltip-open')
    }
  }
}
