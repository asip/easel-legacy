import ApplicationController from './application-controller'

import { useCookieStore } from '@/composables'

import { QueryItems } from '@/types'

export default class QueryMapController extends ApplicationController {
  static values = {
    q: String,
  }

  declare readonly qValue: string

  setQueryMap(ev: Event): void {
    const { criteria, refItems, page } = useCookieStore()

    ev.preventDefault()

    const map = JSON.parse(this.qValue) as QueryItems

    if (map.q) criteria.value = map.q
    refItems.value = map.ref ?? '{}'
    page.value = map.page ?? ''
    // globalThis.console.log(criteria.value)
    // globalThis.console.log(refItems.value)
    // globalThis.console.log(page.value)

    globalThis.location.href = (this.element as HTMLLinkElement).href
  }
}
