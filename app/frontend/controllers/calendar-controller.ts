import ApplicationController from './application-controller'

import { Calendar } from 'vanilla-calendar-pro'

import { useElement } from '@vesperjs/vue'
import { useCalendar, useCookieStore } from '@/composables'

export default class CalendarController extends ApplicationController {
  static targets = ['cal', 'word']

  declare readonly calTarget: HTMLElement
  declare readonly hasCalTarget: boolean

  declare readonly wordTarget: HTMLInputElement
  declare readonly hasWordTarget: boolean

  calendar: Calendar | null = null

  connect(): void {
    if (this.hasCalTarget && this.hasWordTarget) {
      const { date: dateCookie } = useCookieStore()
      const { value: word } = useElement(this.wordTarget, { property: 'value' })
      word.value = dateCookie
      const { initCalendar } = useCalendar({
        el: this.calTarget,
        date: word,
      })
      this.calendar = initCalendar()
      this.calendar?.init()
    }
  }

  change(): void {
    if (this.hasCalTarget && this.hasWordTarget) {
      const { value: word } = useElement(this.wordTarget, { property: 'value' })
      const { setCalendar, selectedDateStr } = useCalendar({
        date: word,
      })

      if (this.calendar) {
        setCalendar(this.calendar)
        selectedDateStr.value = word.value
      }
    }
  }

  disconnect(): void {
    this.calendar?.destroy()
  }
}
