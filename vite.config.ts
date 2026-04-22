import { defineConfig } from 'vite'
import rails from 'rails-vite-plugin'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [rails({ sourceDir: 'app/frontend' }), vue(), tailwindcss()],
  resolve: {
    tsconfigPaths: true,
  },
})
