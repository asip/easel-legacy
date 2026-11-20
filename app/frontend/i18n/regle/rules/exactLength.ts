import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const exactLength = (i18n: Composer) => {
  const { t } = i18n

  return r.withMessage(r.exactLength, ({ $params: [count] }) =>
    t('regle.rules.exactLength', { count }),
  )
}
