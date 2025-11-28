import ApplicationController from './application-controller'

import { searchCriteria } from '../stores'

export default class FrameTagSearchController extends ApplicationController {
  static values = {
    q: String
  }

  declare readonly qValue: string

  setCriteria(): void {
    searchCriteria.set(this.qValue)
  }

}