import ApplicationController from './application-controller'

import { useCookieStore } from '~/composables'

export default class QueryMapController extends ApplicationController {
  static values = {
    ref: String,
    page: String,
  }

  declare readonly refValue: string
  declare readonly pageValue: string

  setQueryMap(ev: Event): void {
    const { refItems, page } = useCookieStore()

    ev.preventDefault()

    refItems.value = this.refValue
    page.value = this.pageValue
    // globalThis.console.log(refItems.value)
    // globalThis.console.log(page.value)

    globalThis.window.location.href = (this.element as HTMLLinkElement).href
  }
}
