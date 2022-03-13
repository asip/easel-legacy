import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

//import { definitionsFromContext } from "stimulus/webpack-helpers"
//const context = require.context(".", true, /_controller\.js$/)
//application.load(definitionsFromContext(context))
import CalendarController from "./calendar_controller";
import FrameController from "./frame_controller";
import PreviewController from "./preview_controller";
Stimulus.register("calendar", CalendarController);
Stimulus.register("frame", FrameController);
Stimulus.register("preview", PreviewController);

export { application }
