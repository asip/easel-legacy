
import ApplicationController from './application-controller'

import { Datepicker } from 'vanillajs-datepicker'

import { useCalendar, useDateUtil } from '~/composables'
import { searchCriteria } from '~/stores'

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
    let calElement: HTMLElement | null = null
    let wordElement: HTMLInputElement | null = null

    if (this.hasCalTarget) calElement = this.calTarget
    if (this.hasWordTarget) wordElement = this.wordTarget

    if (calElement) {
      const date = this.#getDateValue()

      const { initCalendar } = useCalendar({ el: calElement, wordEl: wordElement, date })

      this.calendar = initCalendar()
    }
  }

  #getDateValue(): string | null {
    const { isValidDate } = useDateUtil()

    const qItems: Record<'word', string> = JSON.parse(searchCriteria.get()) as Record<'word', string>
    return isValidDate(qItems.word) ? qItems.word : null
  }

  disconnect(): void {
    if (this.calendar) this.calendar.destroy()
  }
}
