import { TurboMount } from 'turbo-mount'
import { registerComponent } from 'turbo-mount/vue'
import Comments from '../components/Comments.vue'

const turboMount = new TurboMount()

// to register a component use:
// registerComponent(turboMount, "Hello", Hello); // where Hello is the imported the component

// to override the default controller use:
// registerComponent(turboMount, "Hello", Hello, HelloController); // where HelloController is a Stimulus controller extended from TurboMountController

registerComponent(turboMount, 'Comments', Comments)
