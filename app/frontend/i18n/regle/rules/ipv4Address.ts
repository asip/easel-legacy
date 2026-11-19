import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const ipv4Address = (i18n: Composer) => {
  const { t } = i18n

  return r.withMessage(r.ipv4Address, () => t('regle.rules.ipv4Address'))
}
