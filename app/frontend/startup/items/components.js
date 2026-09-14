import { createApp, vaporInteropPlugin } from 'vue'
import { RegleVuePlugin } from '@regle/core'
import { createPinia } from 'pinia'
import plugin from 'turbo-mount/vue'
import { TurboMount } from 'turbo-mount'
import { registerComponent } from 'turbo-mount/vue'
import { i18n } from '@vesperjs/vue'

import index from '@/components/index.vue'

const pinia = createPinia()

plugin.mountComponent = (mountProps) => {
  const { el, Component, props } = mountProps
  const app = createApp(Component, props)
  app.use(RegleVuePlugin).use(pinia).use(vaporInteropPlugin).use(i18n).mount(el)
  return () => {
    app.unmount()
  }
}

const turboMount = new TurboMount()

// to register a component use:
// registerComponent(turboMount, "Hello", Hello); // where Hello is the imported the component

// to override the default controller use:
// registerComponent(turboMount, "Hello", Hello, HelloController); // where HelloController is a Stimulus controller extended from TurboMountController

registerComponent(turboMount, 'index', index)
