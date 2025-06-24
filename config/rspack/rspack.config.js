import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineConfig } from '@rspack/cli'
import rspack from '@rspack/core'
import { VueLoaderPlugin } from 'vue-loader'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// eslint-disable-next-line no-undef
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production'

export default defineConfig({
  mode,
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm-bundler.js',
    },
    extensions: ['.ts', '.js', '.vue']
  },
  entry: {
    admin: './app/javascript/admin.js',
    application: './app/javascript/application.js',
    components: './app/javascript/components.js',
    rails_admin: './app/javascript/rails_admin.js',
    turbo: './app/javascript/turbo.js'
  },
  output: {
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    path: path.resolve(__dirname, '..', '..', 'app/assets/builds'),
  },
  plugins: [
    new VueLoaderPlugin(),
    new rspack.optimize.LimitChunkCountPlugin({
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
        loader: 'vue-loader',
        options: {
          // Note, for the majority of features to be available, make sure this option is `true`
          experimentalInlineMatchResource: true,
        }
      },
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loader: 'builtin:swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
            },
          },
        },
        type: 'javascript/auto',
      }
    ]
  }
})
