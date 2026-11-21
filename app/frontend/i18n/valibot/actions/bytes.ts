import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const bytes = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.bytes,
    (issue) => t('valibot.actions.bytes', { expected: issue.expected, received: issue.received }),
    locale.value,
  )
}
