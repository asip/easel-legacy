import { Application } from '@hotwired/stimulus'

//import { definitionsFromContext } from "stimulus/webpack-helpers"
//const context = require.context(".", true, /_controller\.js$/)
//application.load(definitionsFromContext(context))
import CalendarController from './calendar_controller'
import TagifyController from './tagify_controller'
import LuminousController from './luminous_controller'
import PhotoSwipeController from './photo_swipe_controller'
import PreviewController from './image/preview_controller'
import ToastController from './toast_controller'

const application: Application = Application.start()

// Configure Stimulus development experience
application.debug = false

application.register('calendar', CalendarController)
application.register('tagify', TagifyController)
application.register('luminous', LuminousController)
application.register('pswipe', PhotoSwipeController)
application.register('preview', PreviewController)
application.register('toast', ToastController)

export { application }
