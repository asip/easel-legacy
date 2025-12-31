import ApplicationController from './application-controller'
import GLightbox from 'glightbox'

export default class LightboxController extends ApplicationController {
  static values = {
    selector: String
  }

  declare readonly selectorValue: string

  lightbox: ReturnType<typeof GLightbox> | null = null

  connect(): void {
    this.lightbox = GLightbox({ selector: this.selectorValue })
  }

  disconnect(): void {
    if (this.lightbox) this.lightbox.close()
  }
}
