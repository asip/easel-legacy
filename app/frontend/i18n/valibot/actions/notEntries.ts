import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const notEntries = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.notEntries,
    (issue) =>
      t('valibot.actions.notEntries', { expected: issue.expected, received: issue.received }),
    locale.value,
  )
}
