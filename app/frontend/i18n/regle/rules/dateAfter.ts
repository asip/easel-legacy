import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

import { formatLocaleDate } from './util/formatLocaleDate'

export const dateAfter = (i18n: Composer) => {
  const { t, locale } = i18n

  return r.withMessage(r.dateAfter, ({ $params: [after] }) =>
    t('regle.rules.dateAfter', { after: formatLocaleDate(locale.value, after) }),
  )
}
