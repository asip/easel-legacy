import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const between = (i18n: Composer) => {
  const { t } = i18n

  return r.withMessage(r.between, ({ $params: [min, max] }) =>
    t('regle.rules.between', { min, max }),
  )
}
