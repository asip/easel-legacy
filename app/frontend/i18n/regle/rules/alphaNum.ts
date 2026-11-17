import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const alphaNum = (i18n: Composer) => {
  const { t } = i18n

  return r.withMessage(r.alphaNum, () => t('regle.rules.alphaNum'))
}
