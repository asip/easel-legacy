import { Application } from '@hotwired/stimulus'

//import { definitionsFromContext } from "stimulus/webpack-helpers"
//const context = require.context(".", true, /_controller\.js$/)
//application.load(definitionsFromContext(context))
import CalendarController from './calendar-controller'
import TagifyController from './tagify-controller'
import LightboxController from './lightbox-controller'
import PhotoSwipeController from './photo-swipe-controller'
import PreviewController from './image/preview-controller'
import ToastController from './toast-controller'

const application: Application = Application.start()

// Configure Stimulus development experience
application.debug = false

application.register('calendar', CalendarController)
application.register('tagify', TagifyController)
application.register('lightbox', LightboxController)
application.register('pswipe', PhotoSwipeController)
application.register('preview', PreviewController)
application.register('toast', ToastController)

export { application }
