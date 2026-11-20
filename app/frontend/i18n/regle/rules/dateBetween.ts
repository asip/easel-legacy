import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

import { formatLocaleDate } from './util/formatLocaleDate'

export const dateBetween = (i18n: Composer) => {
  const { t, locale } = i18n

  return r.withMessage(r.dateBetween, ({ $params: [before, after] }) =>
    t('regle.rules.dateBefore', {
      before: formatLocaleDate(locale.value, before),
      after: formatLocaleDate(locale.value, after),
    }),
  )
}
