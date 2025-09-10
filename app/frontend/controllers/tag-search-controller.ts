import ApplicationController from './application-controller'

export default class TagSearchController extends ApplicationController {
  static targets = ['word', 'q']

  declare readonly wordTarget: HTMLInputElement
  declare readonly hasWordTarget: boolean
  declare readonly qTarget: HTMLInputElement
  declare readonly hasQTarget: boolean

  wordTrigger: HTMLInputElement | null = null
  qTrigger: HTMLInputElement | null = null

  connect() {
    if (this.hasWordTarget) {
      this.wordTrigger = this.wordTarget
    }
    if (this.hasQTarget) {
      this.qTrigger = this.qTarget
    }
  }

  submit() {
    // globalThis.console.log(this.wordTrigger?.value)
    if (this.qTrigger) {
      if (this.wordTrigger?.value) {
        this.qTrigger.value = JSON.stringify({ word: this.wordTrigger.value })
      } else {
        this.qTrigger.name= ''
      }
    }
    // globalThis.console.log(this.qTrigger?.value)

    (this.element as HTMLFormElement).requestSubmit()
  }
}