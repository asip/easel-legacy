import { i18n } from '@voyage/vue'

const messages = {
  en: {
    misc: {
      page: 'page',
    },
    models: {
      comment: 'comment',
    },
    search: {
      tooltip: {
        word: 'Tag or Name or Date',
      },
    },
    rules: {
      required: 'Required.',
      schemaMessage: 'Invalid type: Please enter as type {expected}, not type {received}.',
      maxLength: 'are limited to {max} characters.',
    },
    backend: {
      error: {
        api: 'An error has occurred.({message})',
        login: 'Please log in.',
        not_found: 'This {source} has been deleted.',
      },
    },
  },
  ja: {
    misc: {
      page: 'ページ',
    },
    models: {
      comment: 'コメント',
    },
    search: {
      tooltip: {
        word: 'タグ or 名前 or 撮影/登録/更新日',
      },
    },
    rules: {
      required: '必須です。',
      schemaMessage: '無効な型です：{received}型ではなく{expected}型で入力してください',
      maxLength: '{max}文字以内で入力してください',
    },
    backend: {
      error: {
        api: '不具合が発生しました。({message})',
        login: 'ログインしなおしてください。',
        not_found: 'この{source}は削除されています。',
      },
    },
  },
}

i18n.global.mergeLocaleMessage('en', messages.en)
i18n.global.mergeLocaleMessage('ja', messages.ja)

export { i18n }
