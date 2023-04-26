import ApplicationController from "./application_controller"
import * as bootstrap from 'bootstrap'

export default class ToastController extends ApplicationController {
  connect() {
    new bootstrap.Toast(this.element,{delay: 2000}).show()
  }
}