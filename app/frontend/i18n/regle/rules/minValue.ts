import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const minValue = (i18n: Composer) => {
  const { t } = i18n

  return r.withMessage(r.minValue, ({ $params: [limit, options] }) =>
    options?.allowEqual
      ? t('regle.rules.minValueEqual', { limit })
      : t('regle.rules.minValue', { limit }),
  )
}
