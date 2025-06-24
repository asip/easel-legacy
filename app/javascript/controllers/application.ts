import { Application } from '@hotwired/stimulus'

//import { definitionsFromContext } from "stimulus/webpack-helpers"
//const context = require.context(".", true, /_controller\.js$/)
//application.load(definitionsFromContext(context))
import ToastController from './toast-controller'
import CalendarController from './calendar-controller'
// image preview
import PreviewController from './image/preview-controller'
// frame
import LightboxController from './lightbox-controller'
import PhotoSwipeController from './photo-swipe-controller'
import TagifyController from './tagify-controller'

const application: Application = Application.start()

// Configure Stimulus development experience
application.debug = false

application.register('toast', ToastController)
application.register('calendar', CalendarController)
// image preview
application.register('preview', PreviewController)
// frame
application.register('lightbox', LightboxController)
application.register('pswipe', PhotoSwipeController)
application.register('tagify', TagifyController)

export { application }
