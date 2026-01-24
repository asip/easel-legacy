import { Application } from '@hotwired/stimulus'

import { ToastController } from '../../../controllers/admin/index'

const application: Application = Application.start()

// Configure Stimulus development experience
application.debug = false

application.register('toast', ToastController)

export { application }
