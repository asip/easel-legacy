import esbuild from 'esbuild'
import vuePlugin from 'esbuild-plugin-vue3'

esbuild.build({
  entryPoints: [
    'app/javascript/application.js',
    'app/javascript/components.js',
    'app/javascript/rails_admin.js',
    'app/javascript/turbo.js'
  ],
  bundle: true,
  format: 'esm',
  minify: true,
  sourcemap: false,
  outdir: 'app/assets/builds',
  plugins: [vuePlugin()]
})