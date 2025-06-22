import esbuild from 'esbuild'
import vuePlugin from 'esbuild-plugin-vue3'

async function watch(){
  let ctx = await esbuild.context({
    entryPoints: [
      'app/javascript/application.js',
      'app/javascript/components.js',
      'app/javascript/rails_admin.js',
      'app/javascript/turbo.js'
    ],
    bundle: true,
    format: 'esm',
    sourcemap: true,
    outdir: 'app/assets/builds',
    plugins: [vuePlugin()]
  })

  await ctx.watch()
}

watch()
