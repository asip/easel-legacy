import ApplicationController from './application-controller'

import { Datepicker } from 'vanillajs-datepicker'

import { useCalendar } from '~/composables'
import { useCriteriaStore } from '~/stores'

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

    if (this.calElement && this.wordElement) {
      const { date } = useCriteriaStore()

      this.wordElement.value = date ?? ''
      const { initCalendar } = useCalendar({
        el: this.calElement,
        wordEl: this.wordElement,
      })
      this.calendar = initCalendar()
    }
  }

  clear(): void {
    this.calendar?.destroy()
    if (this.calElement && this.wordElement) {
      const { initCalendar } = useCalendar({
        el: this.calElement,
        wordEl: this.wordElement,
      })
      this.calendar = initCalendar()
    }
  }

  disconnect(): void {
    this.calendar?.destroy()
  }
}
