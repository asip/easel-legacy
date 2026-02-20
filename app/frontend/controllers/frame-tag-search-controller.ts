import ApplicationController from './application-controller'

import { useCookie } from '~/composables'
import { useSearchCriteria } from '~/stores'

export default class FrameTagSearchController extends ApplicationController {
  static values = {
    q: String,
  }

  declare readonly qValue: string

  setCriteria(): void {
    const { criteria } = useSearchCriteria()
    const { setCriteriaToCookie } = useCookie()

    criteria.value = this.qValue
    setCriteriaToCookie(this.qValue)
  }
}
