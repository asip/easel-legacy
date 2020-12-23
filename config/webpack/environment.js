const { environment } = require('@rails/webpacker')
const erb = require('./loaders/erb')
const { VueLoaderPlugin } = require('vue-loader')
const vue = require('./loaders/vue')

environment.splitChunks()

environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin())
environment.loaders.prepend('vue', vue)
// Vue.js フル版（Compiler入り）
environment.config.resolve.alias = { 'vue$': 'vue/dist/vue.esm.js' }

//const babelLoader= environment.loaders.get("babel")
//babelLoader.options
environment.loaders.delete('nodeModules')

environment.loaders.prepend('erb', erb)
module.exports = environment
