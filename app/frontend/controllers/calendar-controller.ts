import ApplicationController from './application-controller'

import { Calendar } from 'vanilla-calendar-pro'

import { ref } from 'vue'
import { useElement, useLocale } from '@vesperjs/vue'

import { useCalendar, useDate, useCookieStore } from '@/composables'

export default class CalendarController extends ApplicationController {
  static targets = ['cal', 'word']

  declare readonly calTarget: HTMLElement
  declare readonly hasCalTarget: boolean

  declare readonly wordTarget: HTMLInputElement
  declare readonly hasWordTarget: boolean

  calendar: Calendar | null = null

  connect(): void {
    if (this.hasCalTarget && this.hasWordTarget) {
      const { locale } = useLocale()
      const { date: dateCookie } = useCookieStore()
      const { value: word } = useElement(this.wordTarget, { property: 'value' })
      const { date: wordDate } = useDate(word)

      word.value = dateCookie

      const { initCalendar } = useCalendar({
        el: ref(this.calTarget),
        date: wordDate,
        locale: locale.value,
      })
      this.calendar = initCalendar()
    }
  }

  change(): void {
    if (this.hasCalTarget && this.hasWordTarget) {
      const { value: word } = useElement(this.wordTarget, { property: 'value' })
      const { date: wordDate } = useDate(word)

      const { selectedDate } = useCalendar({ calendar: this.calendar })

      selectedDate.value = wordDate.value
    }
  }

  disconnect(): void {
    this.calendar?.destroy()
  }
}
