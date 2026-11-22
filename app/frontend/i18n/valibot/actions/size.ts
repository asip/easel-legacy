import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const size = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.size,
    (issue) => t('valibot.actions.size', { expected: issue.expected, received: issue.received }),
    locale.value,
  )
}
