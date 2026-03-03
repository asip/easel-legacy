import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import vue from '@vitejs/plugin-vue'
// import react from '@vitejs/plugin-react'
// import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: 3036,
    hmr: {
      protocol: 'ws',
    },
  },
  plugins: [
    RubyPlugin(),
    vue(),
    //react(),
    //svelte(),
    tailwindcss(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
})
