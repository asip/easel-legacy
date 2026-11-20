import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const startsWith = (i18n: Composer) => {
  const { t } = i18n

  return r.withMessage(r.startsWith, ({ $params: [part] }) => t('regle.rules.startsWith', { part }))
}
