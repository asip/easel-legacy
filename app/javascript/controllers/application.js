import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

import { definitionsFromContext } from "stimulus/webpack-helpers"
const context = require.context("controllers", true, /_controller\.js$/)
application.load(definitionsFromContext(context))

export { application }
