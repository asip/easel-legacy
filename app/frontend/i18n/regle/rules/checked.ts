import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const checked = (i18n: Composer) => {
  const { t } = i18n

  return r.withMessage(r.checked, () => t('regle.rules.checked'))
}
