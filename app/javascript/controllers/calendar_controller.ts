import ApplicationController from './application_controller'
import { Datepicker } from 'vanillajs-datepicker'
import ja from '../locales/date-picker/ja'

export default class CalendarController extends ApplicationController {
  static targets = ['cal']
  calTarget: HTMLElement
  calendar: Datepicker

  hasCalTarget!: boolean

  connect() {
    let cal_trigger: HTMLElement = null
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
