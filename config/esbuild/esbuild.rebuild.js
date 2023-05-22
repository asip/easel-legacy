const esbuild = require('esbuild')
const vuePlugin = require('esbuild-plugin-vue3')

async function watch(){
  let ctx = await esbuild.context({
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

  await ctx.watch()
}

watch()
