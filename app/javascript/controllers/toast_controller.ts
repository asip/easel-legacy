import { Controller } from '@hotwired/stimulus'
import * as bootstrap from 'bootstrap'

export default class ToastController extends Controller {
  connect() {
    new bootstrap.Toast(this.element,{delay: 2000}).show()
  }
}