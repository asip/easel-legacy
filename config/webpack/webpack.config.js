const path    = require("path")
const webpack = require("webpack")
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';

module.exports = {
  mode,
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm-bundler.js',
    },
  },
  entry: {
    application: "./app/javascript/application.js",
    web_components: "./app/javascript/web_components.js"
  },
  output: {
    filename: "[name].js",
    sourceMapFilename: "[name].js.map",
    path: path.resolve(__dirname, '..', '..', 'app/assets/builds'),
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ],
  optimization: {
    chunkIds: 'named'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2015'  // Syntax to compile to (see options below for possible values)
        }
      },
      {
        test: /\.erb$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [{
          loader: 'rails-erb-loader',
          options: {
            runner: (/^win/.test(process.platform) ? 'ruby ' : '') + 'bin/rails runner'
          }
        }]
      },
      {
        test: /\.vue(\.erb)?$/,
        use: [{
          loader: 'vue-loader'
        }]
      }
    ]
  }
}
