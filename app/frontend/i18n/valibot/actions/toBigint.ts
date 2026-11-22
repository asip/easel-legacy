import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const toBigint = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.toBigint,
    (issue) => t('valibot.actions.toBigint', { received: issue.received }),
    locale.value,
  )
}
