import ApplicationController from './application-controller'

import { useCookie } from '~/composables'
import { useSearchCriteria } from '~/stores'

export default class FrameTagSearchController extends ApplicationController {
  static values = {
    q: String,
  }

  declare readonly qValue: string

  setCriteria(): void {
    const { cookies } = useCookie()
    const { setCriteria } = useSearchCriteria()

    setCriteria(this.qValue)
    cookies.set('q', this.qValue, { path: '/' })
  }
}
