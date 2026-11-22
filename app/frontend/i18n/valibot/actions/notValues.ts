import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const notValues = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.notValues,
    (issue) =>
      t('valibot.actions.notValues', { expected: issue.expected, received: issue.received }),
    locale.value,
  )
}
