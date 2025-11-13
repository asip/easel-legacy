import ApplicationController from './application-controller'

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
    if (this.hasTooltipTarget) {
      this.tooltipElement = this.tooltipTarget
    }
    if (this.hasWordTarget) {
      this.wordElement = this.wordTarget
    }
    if (this.hasQTarget) {
      this.qElement = this.qTarget
    }

    this.tooltipElement?.classList.remove('tooltip-error')
  }

  submit(event: Event): void {
    // globalThis.console.log(this.wordElement?.value)
    if (this.qElement) {
      if (this.wordElement?.value) {
        this.qElement.value = JSON.stringify({ word: this.wordElement.value })
      } else {
        this.qElement.name= ''
      }
    }
    // globalThis.console.log(this.qElement?.value)

    if (this.wordElement?.value != null && this.wordElement.value.length <= 40) {
      (this.element as HTMLFormElement).requestSubmit()
    } else {
      if (this.tooltipElement) {
        this.tooltipElement.dataset['tip'] = '40文字以内で入力してください'
        this.tooltipElement.classList.add('tooltip-open')
        this.tooltipElement.classList.add('tooltip-error')
      }
      event.preventDefault()
    }
  }

  clearTooltip(): void {
    if (this.tooltipElement && this.tooltipElement.dataset['tip'] !=  'タグ or 名前 or 撮影/登録/更新日') {
      this.tooltipElement.dataset['tip'] =  'タグ or 名前 or 撮影/登録/更新日'
      this.tooltipElement.classList.remove('tooltip-error')
      this.tooltipElement.classList.remove('tooltip-open')
    }
  }
}
