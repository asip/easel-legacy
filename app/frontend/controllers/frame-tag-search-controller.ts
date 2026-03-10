import ApplicationController from './application-controller'

import { useCookieStore } from '~/composables'
import { useSearchCriteria } from '~/stores'

export default class FrameTagSearchController extends ApplicationController {
  static values = {
    q: String,
  }

  declare readonly qValue: string

  setCriteria(): void {
    const { criteria } = useSearchCriteria()
    const { criteriaCookie } = useCookieStore()

    criteria.value = this.qValue
    criteriaCookie.value = this.qValue
  }
}
