import ApplicationController from './application-controller'

import { searchCriteria } from '../stores'

export default class FrameTagSearchController extends ApplicationController {
  static values = {
    criteria: String
  }

  declare readonly criteriaValue: string

  setCriteria(): void {
    searchCriteria.set(this.criteriaValue)
  }

}