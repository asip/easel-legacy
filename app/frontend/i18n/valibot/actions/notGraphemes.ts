import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const notGraphemes = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.notGraphemes,
    (issue) =>
      t('valibot.actions.notGraphemes', { expected: issue.expected, received: issue.received }),
    locale.value,
  )
}
