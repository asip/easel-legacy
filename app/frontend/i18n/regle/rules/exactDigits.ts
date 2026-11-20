import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const exactDigits = (i18n: Composer) => {
  const { t } = i18n

  return r.withMessage(r.exactDigits, ({ $params: [count] }) =>
    t('regle.rules.exactDigits', { count }),
  )
}
