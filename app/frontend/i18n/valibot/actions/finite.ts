import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const finite = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.finite,
    (issue) => t('valibot.actions.finite', { expected: issue.expected, received: issue.received }),
    locale.value,
  )
}
