import ApplicationController from './application-controller'

import { Calendar } from 'vanilla-calendar-pro'

import { computed } from 'vue'
import { format, parse } from '@formkit/tempo'
import { useDate, useElement } from '@vesperjs/vue'

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
      const { isValidDate } = useDate()
      const { date: dateCookie } = useCookieStore()
      const { value: word } = useElement(this.wordTarget, { property: 'value' })

      const wordDate = computed<Date | null | undefined>({
        get() {
          const date_ = word.value && isValidDate(word.value) ? word.value : null
          return date_ ? parse(date_, 'YYYY/MM/DD') : null
        },
        set(value: Date | null | undefined) {
          word.value = value ? format(value, 'YYYY/MM/DD') : ''
        },
      })

      word.value = dateCookie
      const { initCalendar } = useCalendar({
        el: this.calTarget,
        date: wordDate,
      })
      this.calendar = initCalendar()
    }
  }

  change(): void {
    if (this.hasCalTarget && this.hasWordTarget) {
      const { isValidDate } = useDate()
      const { value: word } = useElement(this.wordTarget, { property: 'value' })

      const wordDate = computed<Date | null | undefined>({
        get() {
          const date_ = word.value && isValidDate(word.value) ? word.value : null
          return date_ ? parse(date_, 'YYYY/MM/DD') : null
        },
        set(value: Date | null | undefined) {
          word.value = value ? format(value, 'YYYY/MM/DD') : ''
        },
      })

      const { setCalendar, selectedDate } = useCalendar({
        date: wordDate,
      })

      if (this.calendar) {
        setCalendar(this.calendar)
        selectedDate.value = wordDate.value
      }
    }
  }

  disconnect(): void {
    this.calendar?.destroy()
  }
}
