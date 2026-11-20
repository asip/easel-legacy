import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const contains = (i18n: Composer) => {
  const { t } = i18n

  return r.withMessage(r.contains, ({ $params: [part] }) => t('regle.rules.contains', { part }))
}
