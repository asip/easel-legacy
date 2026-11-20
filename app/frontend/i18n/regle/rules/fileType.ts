import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const fileType = (i18n: Composer) => {
  const { t } = i18n

  return r.withMessage(r.fileType, ({ $params: [accept] }) =>
    t('regle.rules.fileType', { allowed: accept.map((type) => type.split('/')[1]).join(', ') }),
  )
}
