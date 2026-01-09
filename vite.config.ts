import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import vue from '@vitejs/plugin-vue'
// import react from '@vitejs/plugin-react'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  server: {
    port: 3036,
    hmr: {
      protocol: 'ws',
    }
  },
  plugins: [
    RubyPlugin(),
    vue(),
    //react(),
    svelte(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      'vanillajs-datepicker': path.resolve(__dirname, 'node_modules/vanillajs-datepicker'),
      '~': path.resolve(__dirname, 'app/frontend')
    },
  },
})
