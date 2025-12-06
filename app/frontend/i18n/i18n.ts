import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  legacy: false,
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en: {
      rules: {
        required: 'Required.'
      },
      action: {
        error: {
          api: 'An error has occurred.({statusCode})',
          system: 'An error has occurred.({message})',
          login: 'Please log in.'
        }
      }
    },
    ja: {
      rules: {
        required: '必須です。'
      },
      action: {
        error: {
          api: '不具合が発生しました。({statusCode})',
          system: '不具合が発生しました。({message})',
          login: 'ログインしなおしてください'
        }
      }
    }
  }
})
