import ApplicationController from './application-controller'

import { useCriteriaCookie, useRefCookie, usePageCookie } from '@/composables'

import { QueryItems } from '@/types'

export default class QueryMapController extends ApplicationController {
  static values = {
    q: String,
  }

  declare readonly qValue: string

  setQueryMap(ev: Event): void {
    const { criteria } = useCriteriaCookie()
    const { refItems } = useRefCookie()
    const { page } = usePageCookie()

    ev.preventDefault()

    const map = JSON.parse(this.qValue) as QueryItems
    // globalThis.console.log(map)

    criteria.value = map.q ?? null
    refItems.value = map.ref ?? null
    page.value = map.page ?? null
    // globalThis.console.log(criteria.value)
    // globalThis.console.log(refItems.value)
    // globalThis.console.log(page.value)

    globalThis.location.href = (this.element as HTMLLinkElement).href
  }
}
