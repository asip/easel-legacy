import ApplicationController from './application-controller'

export default class ModalController extends ApplicationController {
  static values = {
    selector: String,
  }

  declare readonly selectorValue: string

  open(): void {
    const el: HTMLDialogElement | null = globalThis.document.querySelector(this.selectorValue)

    el?.showModal()
  }
}
