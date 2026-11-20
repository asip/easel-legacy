import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const containsUppercase = (i18n: Composer) => {
  const { t } = i18n

  return r.withMessage(r.containsUppercase, ({ $params: [minUppercaseCount] }) =>
    t('regle.rules.containsUppercase', {
      minUppercaseCount,
      plural: minUppercaseCount && minUppercaseCount > 1 ? 's' : '',
    }),
  )
}
