import { defineConfig } from 'eslint/config'

import js from '@eslint/js'
import typescriptESLintParser from '@typescript-eslint/parser'
import tseslint from 'typescript-eslint'
import vueESLint from 'eslint-plugin-vue'
import vueESLintParser from 'vue-eslint-parser'

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
    languageOptions: {
      globals: {
        'vue/setup-compiler-macros': true,
      },
      ecmaVersion: 2025,
      sourceType: 'module',
      parser: vueESLintParser,
      parserOptions: {
        parser: typescriptESLintParser,
        parserOptions: {
          project: './tsconfig.json',
        },
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      vue: vueESLint,
    },
    rules: {
      ...vueESLint.configs['recommended'].rules,
      //...vueESLint.configs['vue3-strongly-recommended'].rules,
      'no-useless-assignment': 0,
      'vue/no-v-html': 0,
    },
  },
])
