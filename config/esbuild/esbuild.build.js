import esbuild from 'esbuild'
import vuePlugin from 'esbuild-plugin-vue3'

esbuild.build({
  entryPoints: [
    'app/javascript/application.js',
    'app/javascript/rails_admin.js',
    'app/javascript/web_components.js'
  ],
  bundle: true,
  sourcemap: true,
  outdir: 'app/assets/builds',
  plugins: [vuePlugin()]
})