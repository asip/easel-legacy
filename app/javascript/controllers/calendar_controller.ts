import ApplicationController from './application_controller'
import { Datepicker } from 'vanillajs-datepicker'
import ja from '../locales/date-picker/ja'

declare var window: Window

export default class CalendarController extends ApplicationController {
  static targets = ['cal']
  static values = {
    date: String,
  }

  declare readonly calTarget: HTMLElement
  declare readonly hasCalTarget: boolean

  declare readonly dateValue: string
  declare readonly originValue: string

  calendar: Datepicker | null = null

  connect() {
    let cal_trigger: HTMLElement | null = null
    if(this.hasCalTarget){
      cal_trigger = this.calTarget
    }

    if (cal_trigger){
      const date = this.dateValue

      Object.assign(Datepicker.locales, ja)

      this.calendar = new Datepicker(cal_trigger, {
        buttonClass: 'btn',
        format: 'yyyy/mm/dd',
        language: 'ja'
      })

      if(date) this.calendar.setDate(Datepicker.parseDate(date, 'yyyy/mm/dd'))

      cal_trigger.addEventListener('changeDate', function (e: CustomEvent) {
        //console.log(e);
        //console.log(e.detail.datepicker.getDate("yyyy/mm/dd"));

        // eslint-disable-next-line
        window.location.href=`/frames?q=${e.detail.datepicker.getDate('yyyy/mm/dd')}`
      })
    }
  }

  disconnect(){
    if(this.calendar){
      this.calendar.destroy()
    }
  }
}
