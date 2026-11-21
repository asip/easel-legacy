import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const isoDateTime = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.isoDateTime,
    (issue) => t('valibot.actions.isoDateTime', { received: issue.received }),
    locale.value,
  )
}
