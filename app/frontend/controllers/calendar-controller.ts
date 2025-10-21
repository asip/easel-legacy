import ApplicationController from './application-controller'
import { Datepicker } from 'vanillajs-datepicker'
import ja from '../locales/date-picker/ja'

export default class CalendarController extends ApplicationController {
  static targets = ['cal', 'word']
  static values = {
    date: String,
  }

  declare readonly calTarget: HTMLElement
  declare readonly hasCalTarget: boolean
  declare readonly wordTarget: HTMLInputElement
  declare readonly hasWordTarget: boolean

  declare readonly dateValue: string
  declare readonly originValue: string

  calendar: Datepicker | null = null

  connect() {
    let calTrigger: HTMLElement | null = null
    if (this.hasCalTarget){
      calTrigger = this.calTarget
    }

    let wordTrigger: HTMLInputElement | null = null
    if (this.hasWordTarget){
      wordTrigger = this.wordTarget
    }

    if (calTrigger){
      const date = this.dateValue

      Object.assign(Datepicker.locales, ja)

      this.calendar = new Datepicker(calTrigger, {
        buttonClass: 'btn',
        format: 'yyyy/mm/dd',
        language: 'ja'
      })

      if (date) this.calendar.setDate(Datepicker.parseDate(date, 'yyyy/mm/dd'))

      calTrigger.addEventListener('changeDate', function (e: CustomEvent) {
        // globalThis.console.log(e);
        // globalThis.console.log(e.detail.datepicker.getDate("yyyy/mm/dd"));
        // globalThis.console.log(wordTrigger)

        // eslint-disable-next-line
        if (wordTrigger) wordTrigger.value = e.detail.datepicker.getDate('yyyy/mm/dd')
      })
    }
  }

  disconnect(){
    if (this.calendar){
      this.calendar.destroy()
    }
  }
}
