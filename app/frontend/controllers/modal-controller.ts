import ApplicationController from './application-controller'

import { useModal } from '@/composables'

export default class ModalController extends ApplicationController {
  static values = {
    selector: String,
  }
  declare readonly selectorValue: string

  open(): void {
    const { openModal } = useModal()

    openModal(this.selectorValue)
  }
}
