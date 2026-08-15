import ApplicationController from './application-controller'

import { Calendar } from 'vanilla-calendar-pro'

import { useElement, useDate } from '@vesperjs/vue'
import { useCalendar, useCookieStore } from '@/composables'

export default class CalendarController extends ApplicationController {
  static targets = ['cal', 'word']

  declare readonly calTarget: HTMLElement
  declare readonly hasCalTarget: boolean

  declare readonly wordTarget: HTMLInputElement
  declare readonly hasWordTarget: boolean

  declare readonly dateValue: string
  declare readonly originValue: string

  calendar: Calendar | null = null

  connect(): void {
    if (this.hasCalTarget && this.hasWordTarget) {
      const { date: dateCookie } = useCookieStore()
      const { value: word } = useElement(this.wordTarget, { property: 'value' })
      word.value = dateCookie
      const { initCalendar } = useCalendar({
        el: this.calTarget,
        word,
      })
      this.calendar = initCalendar()
      this.calendar?.init()
    }
  }

  change(): void {
    if (this.hasCalTarget && this.hasWordTarget) {
      const { isValidDate } = useDate()

      const { value: word } = useElement(this.wordTarget, { property: 'value' })
      const { initCalendar } = useCalendar({
        el: this.calTarget,
        word,
      })

      if (isValidDate(word.value) && this.calendar) {
        this.calendar = initCalendar()
        this.calendar?.init()
      }
    }
  }

  disconnect(): void {
    this.calendar?.destroy()
  }
}
