import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const isoWeek = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.isoWeek,
    (issue) => t('valibot.actions.isoWeek', { received: issue.received }),
    locale.value,
  )
}
