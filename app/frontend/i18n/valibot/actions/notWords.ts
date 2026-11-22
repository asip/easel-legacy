import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const notWords = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.notWords,
    (issue) =>
      t('valibot.actions.notWords', { expected: issue.expected, received: issue.received }),
    locale.value,
  )
}
