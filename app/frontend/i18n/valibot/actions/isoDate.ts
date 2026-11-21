import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const isoDate = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.isoDate,
    (issue) => t('valibot.actions.isoDate', { received: issue.received }),
    locale.value,
  )
}
