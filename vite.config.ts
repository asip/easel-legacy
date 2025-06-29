import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    RubyPlugin(),
    vue(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      'vanillajs-datepicker': path.resolve(__dirname, 'node_modules/vanillajs-datepicker'),
    },
  },
})
