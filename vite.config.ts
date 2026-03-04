import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: 3036,
    hmr: {
      protocol: 'ws',
    },
  },
  plugins: [RubyPlugin(), vue(), tailwindcss()],
  resolve: {
    tsconfigPaths: true,
  },
})
