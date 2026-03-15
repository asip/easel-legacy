import ApplicationController from './application-controller'

import { Datepicker } from 'vanillajs-datepicker'

import { useCalendar, useCookieStore } from '~/composables'

export default class CalendarController extends ApplicationController {
  static targets = ['cal', 'word']

  declare readonly calTarget: HTMLElement
  declare readonly hasCalTarget: boolean
  declare readonly wordTarget: HTMLInputElement
  declare readonly hasWordTarget: boolean

  declare readonly dateValue: string
  declare readonly originValue: string

  calendar: Datepicker | null = null

  connect(): void {
    if (this.hasCalTarget && this.hasWordTarget) {
      const { date } = useCookieStore()

      const { initCalendar, word } = useCalendar({
        el: this.calTarget,
        wordEl: this.wordTarget,
      })
      word.value = date
      this.calendar = initCalendar()
    }
  }

  clear(): void {
    this.calendar?.destroy()
    if (this.hasCalTarget && this.hasWordTarget) {
      const { initCalendar } = useCalendar({
        el: this.calTarget,
        wordEl: this.wordTarget,
      })
      this.calendar = initCalendar()
    }
  }

  disconnect(): void {
    this.calendar?.destroy()
  }
}
