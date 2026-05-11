import { Application } from '@hotwired/stimulus'

import {
  ToastController,
  CalendarController,
  FrameSearchController,
  QueryMapController,
  PreviewController,
  LightboxController,
  PhotoSwipeController,
  TagifyController,
} from '~/controllers/index'

const application: Application = Application.start()

// Configure Stimulus development experience
application.debug = false

application.register('toast', ToastController)
// frame search
application.register('calendar', CalendarController)
application.register('frameSearch', FrameSearchController)
// query map
application.register('queryMap', QueryMapController)
// image preview
application.register('preview', PreviewController)
// frame
application.register('lightbox', LightboxController)
application.register('pswp', PhotoSwipeController)
application.register('tagify', TagifyController)

export { application }
