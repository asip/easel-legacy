import ApplicationController from './application-controller'

import { Datepicker } from 'vanillajs-datepicker'

import { useCalendar } from '~/composables'
import { useSearchCriteria } from '~/stores'

export default class CalendarController extends ApplicationController {
  static targets = ['cal', 'word']

  declare readonly calTarget: HTMLElement
  declare readonly hasCalTarget: boolean
  declare readonly wordTarget: HTMLInputElement
  declare readonly hasWordTarget: boolean

  declare readonly dateValue: string
  declare readonly originValue: string

  calendar: Datepicker | null = null

  calElement: HTMLElement | null = null
  wordElement: HTMLInputElement | null = null

  connect(): void {
    if (this.hasCalTarget) this.calElement = this.calTarget
    if (this.hasWordTarget) this.wordElement = this.wordTarget

    if (this.calElement) {
      const { date } = useSearchCriteria()

      const { initCalendar } = useCalendar({
        el: this.calElement,
        wordEl: this.wordElement,
        date: date.value,
      })
      this.calendar = initCalendar()
    }
  }

  clear(): void {
    this.calendar?.destroy()
    if (this.calElement) {
      const { initCalendar } = useCalendar({
        el: this.calElement,
        wordEl: this.wordElement,
        date: '',
      })
      this.calendar = initCalendar()
    }
  }

  disconnect(): void {
    this.calendar?.destroy()
  }
}
