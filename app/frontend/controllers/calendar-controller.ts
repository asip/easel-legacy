import ApplicationController from './application-controller'
import { Datepicker } from 'vanillajs-datepicker'
import ja from '~/locales/date-picker/ja'

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

  wordElement: HTMLInputElement | null = null

  connect(): void {
    let calElement: HTMLElement | null = null

    if (this.hasCalTarget) calElement = this.calTarget
    if (this.hasWordTarget) this.wordElement = this.wordTarget

    if (calElement) {
      const date = this.#getDateValue()

      this.#initCalendar({ el: calElement, date })
    }
  }

  #getDateValue(): string | null {
    const qItems: Record<'word', string> = JSON.parse(searchCriteria.get()) as Record<'word', string>
    return this.#isValidDate(qItems.word) ? qItems.word : null
  }

  #initCalendar({el, date}: { el: HTMLElement, date: string | null }): void {
    Object.assign(Datepicker.locales, ja)

    this.calendar = new Datepicker(el, {
      buttonClass: 'btn',
      format: 'yyyy/mm/dd',
      language: 'ja'
    })

    this.#setChangeEventListener(el)
    if (date) this.calendar.setDate(Datepicker.parseDate(date, 'yyyy/mm/dd'))
  }

  #setChangeEventListener(el: HTMLElement): void {
    const wordElement = this.wordElement

    el.addEventListener('changeDate', function (e: CustomEvent) {
      // eslint-disable-next-line
      if (wordElement) wordElement.value = e.detail.datepicker.getDate('yyyy/mm/dd')
    })
  }

  disconnect(): void {
    if (this.calendar) this.calendar.destroy()
  }

  #isValidDate(str: string):boolean {
    return !isNaN(Date.parse(str))
  }
}
