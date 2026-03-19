import { RefItems } from '~/interfaces'
import ApplicationController from './application-controller'

import { useCookieStore } from '~/composables'

interface QueryItems {
  ref?: string
  page?: string
}

export default class QueryMapController extends ApplicationController {
  static values = {
    q: String,
  }

  declare readonly qValue: string
  declare readonly pageValue: string

  setQueryMap(ev: Event): void {
    const { refItems, page } = useCookieStore()

    ev.preventDefault()

    const map = JSON.parse(this.qValue) as QueryItems

    refItems.value = map.ref ?? ''
    page.value = map.page ?? ''
    // globalThis.console.log(refItems.value)
    // globalThis.console.log(page.value)

    globalThis.window.location.href = (this.element as HTMLLinkElement).href
  }
}
