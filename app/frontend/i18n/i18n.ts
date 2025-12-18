import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  legacy: false,
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en: {
      misc: {
        page: 'page'
      },
      models: {
        comment: 'comment'
      },
      search: {
        tooltip: {
          word: 'Tag or Name or Date'
        }
      },
      rules: {
        required: 'Required.'
      },
      action: {
        error: {
          api: 'An error has occurred.({message})',
          login: 'Please log in.',
          not_found: 'This {source} has been deleted.'
        }
      }
    },
    ja: {
      misc: {
        page: 'ページ'
      },
      models: {
        comment: 'コメント'
      },
      search: {
        tooltip: {
          word: 'タグ or 名前 or 撮影/登録/更新日'
        }
      },
      rules: {
        required: '必須です。'
      },
      action: {
        error: {
          api: '不具合が発生しました。({message})',
          login: 'ログインしなおしてください。',
          not_found: 'この{source}は削除されています。'
        }
      }
    }
  }
})
