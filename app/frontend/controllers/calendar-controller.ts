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

  declare readonly dateValue: string
  declare readonly originValue: string

  calendar: Calendar | null = null

  connect(): void {
    if (this.hasCalTarget && this.hasWordTarget) {
      const { date } = useCookieStore()
      const { value: word } = useElement(this.wordTarget, { property: 'value' })
      word.value = date
      const { initCalendar } = useCalendar({
        el: this.calTarget,
        word,
      })
      this.calendar = initCalendar()
    }
  }

  change(): void {
    if (this.hasCalTarget && this.hasWordTarget) {
      const { value: word } = useElement(this.wordTarget, { property: 'value' })
      const { utcDate, utcToday } = useCalendar({
        word,
      })

      if (this.calendar) {
        this.calendar.selectedDates = utcDate.value ? [utcDate.value] : []
        if (utcToday.value?.getFullYear())
          this.calendar.selectedYear = utcDate.value?.getFullYear() ?? utcToday.value.getFullYear()
        this.calendar.selectedMonth = (utcDate.value?.getMonth() ?? utcToday.value?.getMonth()) as
          | 0
          | 1
          | 2
          | 3
          | 4
          | 5
          | 6
          | 7
          | 8
          | 9
          | 10
          | 11
        this.calendar.init()
      }
    }
  }

  disconnect(): void {
    this.calendar?.destroy()
  }
}
