import { i18n } from '@vesperjs/vue'

import { en } from './locales/en.json'
import { ja } from './locales/ja.json'

i18n.global.mergeLocaleMessage('en', en)
i18n.global.mergeLocaleMessage('ja', ja)

export { i18n }
