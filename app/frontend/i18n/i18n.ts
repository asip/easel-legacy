import { createI18n } from 'vue-i18n'
import { setI18n } from '@vesperjs/vue'

import { en } from './locales/en.json'
import { ja } from './locales/ja.json'

const i18n = createI18n({
  legacy: false,
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en,
    ja,
  },
})

setI18n(i18n)
