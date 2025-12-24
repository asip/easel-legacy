import { createApp } from 'vue'
import { RegleVuePlugin } from '@regle/core'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import plugin from 'turbo-mount/vue'
import { registerComponent } from 'turbo-mount/vue'
import { TurboMount } from 'turbo-mount'
import index from '../components/index.vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

plugin.mountComponent = (mountProps) => {
  const { el, Component, props } = mountProps
  const app = createApp(Component, props)
  app.use(RegleVuePlugin).use(pinia).mount(el)
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
