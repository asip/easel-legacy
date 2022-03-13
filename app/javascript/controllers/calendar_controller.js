import { Controller } from "stimulus"
import { Datepicker } from 'vanillajs-datepicker';

export default class CalendarController extends Controller {
  static targets = ['cal'];
  calendar;

  connect() {
    var cal_trigger = null;
    try{
      cal_trigger = this.calTarget;
    } catch(e) {}

    if (cal_trigger){
      this.calendar = new Datepicker(cal_trigger, {
        buttonClass: 'btn'
      });
    }
  }
}
