// work in progress
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import webpack from 'webpack'
// import { VueLoaderPlugin } from 'vue-loader'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// eslint-disable-next-line no-undef
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production'

export default {
  mode,
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm-bundler.js',
    },
    extensions: ['.ts', '.js']
  },
  entry: {
    application: './app/javascript/application.js'
  },
  output: {
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    path: path.resolve(__dirname, '..', '..', 'app/assets/builds'),
  },
  plugins: [
    // new VueLoaderPlugin(),
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
        test: /\.vue(\.erb)?$/,
        use: [{
          loader: 'vue-loader'
        }]
      },
      {
        test: /\.[jt]s$/,
        use: [{
          loader: 'esbuild-loader',
          options: {
            loader: 'js',
            target: 'es2022'  // Syntax to compile to (see options below for possible values)
          }
        }],
        resolve: {
          fullySpecified: false
        }
      }
    ]
  }
}
