import { defineConfig } from 'eslint/config'

import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import tseslint from 'typescript-eslint'
import vuePlugin from 'eslint-plugin-vue'

export default defineConfig([
  {
    ignores: [
      './app/assets/builds/**/*', // Ignore built files.
    ],
  },
  {
    files: ['**/*.{js,ts}'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
  },
  {
    files: ['**/*.vue'],
    extends: [vuePlugin.configs['flat/strongly-recommended']],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      ...vuePlugin.configs['recommended'].rules,
      //...vueESLint.configs['vue3-strongly-recommended'].rules,
      'no-useless-assignment': 0,
      'vue/no-v-html': 0,
      'vue/multi-word-component-names': 0,
    },
  },
])
