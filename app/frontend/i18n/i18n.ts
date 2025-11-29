import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  legacy: false,
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en: {
      rules: {
        required: 'Required.'
      }
    },
    ja: {
      rules: {
        required: '必須です。'
      }
    }
  }
})
