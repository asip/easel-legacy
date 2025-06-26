import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    RubyPlugin(),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    vue()
  ],
})
