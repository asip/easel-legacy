import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const oneOf = (i18n: Composer) => {
  const { t } = i18n

  return r.withMessage(r.oneOf, ({ $params: [options] }) =>
    t('regle.rules.oneOf', {
      following: (Array.isArray(options) ? options : Object.values(options)).join(', '),
    }),
  )
}
