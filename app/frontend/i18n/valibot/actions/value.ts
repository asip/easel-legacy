import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const value = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.value,
    (issue) => t('valibot.actions.value', { expected: issue.expected, received: issue.received }),
    locale.value,
  )
}
