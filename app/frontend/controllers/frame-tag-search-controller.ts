import ApplicationController from './application-controller'

import { useCookieStore } from '~/composables'

export default class FrameTagSearchController extends ApplicationController {
  static values = {
    q: String,
  }

  declare readonly qValue: string

  setCriteria(): void {
    const { criteria } = useCookieStore()

    criteria.value = this.qValue
  }
}
