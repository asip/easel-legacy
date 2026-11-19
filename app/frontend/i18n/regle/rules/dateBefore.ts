import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

import { formatLocaleDate } from './util/formatLocaleDate'

export const dateBefore = (i18n: Composer) => {
  const { t, locale } = i18n

  return r.withMessage(r.dateBefore, ({ $params: [before] }) =>
    t('regle.rules.dateBefore', { after: formatLocaleDate(locale.value, before) }),
  )
}
