import ApplicationController from './application-controller'
import { Datepicker } from 'vanillajs-datepicker'
import ja from '../locales/date-picker/ja'

import { searchCriteria } from '../stores'

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
      const qItems: Record<'word', string> = JSON.parse(searchCriteria.get()) as Record<'word', string>
      const date = this.#isValidDate(qItems['word']) ? qItems['word'] : null

      Object.assign(Datepicker.locales, ja)

      this.calendar = new Datepicker(calElement, {
        buttonClass: 'btn',
        format: 'yyyy/mm/dd',
        language: 'ja'
      })

      if (date) this.calendar.setDate(Datepicker.parseDate(date, 'yyyy/mm/dd'))

      calElement.addEventListener('changeDate', function (e: CustomEvent) {
        // globalThis.console.log(e);
        // globalThis.console.log(e.detail.datepicker.getDate("yyyy/mm/dd"));
        // globalThis.console.log(wordElement)

        // eslint-disable-next-line
        if (wordElement) wordElement.value = e.detail.datepicker.getDate('yyyy/mm/dd')
      })
    }
  }

  disconnect(): void {
    if (this.calendar) this.calendar.destroy()
  }

  #isValidDate(str: string):boolean {
    return !isNaN(Date.parse(str))
  }
}
