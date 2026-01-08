import { Application } from '@hotwired/stimulus'

import ToastController from './toast-controller'
import CalendarController from './calendar-controller'
import FrameSearchController from './frame-search-controller'
import FrameTagSearchController from './frame-tag-search-controller'
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
application.register('frameSearch', FrameSearchController)
application.register('frameTagSearch', FrameTagSearchController)

// image preview
application.register('preview', PreviewController)
// frame
application.register('lightbox', LightboxController)
application.register('pswp', PhotoSwipeController)
application.register('tagify', TagifyController)

export { application }
