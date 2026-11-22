import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const words = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.words,
    (issue) => t('valibot.actions.words', { expected: issue.expected, received: issue.received }),
    locale.value,
  )
}
