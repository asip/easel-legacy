import ApplicationController from './application_controller'
import { Datepicker } from 'vanillajs-datepicker'
import ja from '../locales/date-picker/ja'

declare var window: Window

export default class CalendarController extends ApplicationController {
  static targets = ['cal']

  declare readonly calTarget: HTMLElement
  declare readonly hasCalTarget: boolean

  calendar: Datepicker | null = null

  connect() {
    let cal_trigger: HTMLElement | null = null
    if(this.hasCalTarget){
      cal_trigger = this.calTarget
    }

    if (cal_trigger){

      const origin = cal_trigger.getAttribute('data-origin')

      Object.assign(Datepicker.locales, ja)

      this.calendar = new Datepicker(cal_trigger, {
        buttonClass: 'btn',
        format: 'yyyy/mm/dd',
        language: 'ja'
      })
      cal_trigger.addEventListener('changeDate', function (e: CustomEvent) {
        //console.log(e);
        //console.log(e.detail.datepicker.getDate("yyyy/mm/dd"));

        // eslint-disable-next-line
        window.location.href=`${origin}/frames?q=${e.detail.datepicker.getDate('yyyy/mm/dd')}`
      })
    }
  }

  disconnect(){
    if(this.calendar){
      this.calendar.destroy()
    }
  }
}
