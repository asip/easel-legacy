import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const nonEmpty = (i18n: Composer) => {
  const { locale, t } = i18n
  v.setSpecificMessage(
    v.nonEmpty,
    (issue) =>
      t('valibot.actions.nonEmpty', { expected: issue.expected, received: issue.received }),
    locale.value,
  )
}
