import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const hostname = (i18n: Composer) => {
  const { t } = i18n

  return r.withMessage(r.hostname, () => t('regle.rules.hostname'))
}
