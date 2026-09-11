import { Application } from '@hotwired/stimulus'

import { ToastifyController } from '@/controllers/admin/index'

const application: Application = Application.start()

// Configure Stimulus development experience
application.debug = false

application.register('toast', ToastifyController)

export { application }
