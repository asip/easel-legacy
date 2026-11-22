import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const safeInteger = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.safeInteger,
    (issue) => t('valibot.actions.safeInteger', { received: issue.received }),
    locale.value,
  )
}
