import { Controller } from "stimulus"
import { Datepicker } from 'vanillajs-datepicker';

export default class CalendarController extends Controller {
  static targets = ['cal'];
  calTarget: HTMLElement;
  calendar: Datepicker;

  connect() {
    var cal_trigger: HTMLElement = null;
    try{
      cal_trigger = this.calTarget;
    } catch(e) {}

    if (cal_trigger){

      origin = cal_trigger.getAttribute("data-origin");

      this.calendar = new Datepicker(cal_trigger, {
        buttonClass: 'btn',
        format: 'yyyy/mm/dd'
      });
      cal_trigger.addEventListener('changeDate', function (e: CustomEvent) {
        //console.log(e);
        //console.log(e.detail.datepicker.getDate("yyyy/mm/dd"));
        window.location.href=`${origin}/frames?q=${e.detail.datepicker.getDate("yyyy/mm/dd")}`
      });
    }
  }

  disconnect(){
    if(this.calendar){
      this.calendar.destroy();
    }
  }
}
