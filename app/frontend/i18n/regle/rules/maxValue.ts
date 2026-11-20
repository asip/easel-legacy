import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const maxValue = (i18n: Composer) => {
  const { t } = i18n

  return r.withMessage(r.maxValue, ({ $params: [limit, options] }) =>
    options?.allowEqual
      ? t('regle.rules.maxValueEqual', { limit })
      : t('regle.rules.maxValue', { limit }),
  )
}
