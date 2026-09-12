import { Application } from '@hotwired/stimulus'

import {
  ToastifyController,
  CalendarController,
  FrameSearchController,
  QueryMapController,
  PreviewController,
  GLightboxController,
  PhotoSwipeController,
  TagifyController,
} from '@/controllers/index'

const application: Application = Application.start()

// Configure Stimulus development experience
application.debug = false

application.register('toast', ToastifyController)
// frame search
application.register('calendar', CalendarController)
application.register('frame-search', FrameSearchController)
// query map
application.register('query', QueryMapController)
// image preview
application.register('preview', PreviewController)
// frame
application.register('glbx', GLightboxController)
application.register('pswp', PhotoSwipeController)
application.register('tagify', TagifyController)

export { application }
