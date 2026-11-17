import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const minFileSize = (i18n: Composer) => {
  const { t } = i18n

  return r.withMessage(r.minFileSize, ({ $params: [minSize] }) =>
    t('regle.rules.minFileSize', { min: minSize / (1000 * 1000) }),
  )
}
