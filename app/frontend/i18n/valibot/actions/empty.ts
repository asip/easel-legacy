import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const empty = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.empty,
    (issue) => t('valibot.actions.empty', { expected: issue.expected, received: issue.received }),
    locale.value,
  )
}
