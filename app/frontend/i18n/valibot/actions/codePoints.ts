import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const codePoints = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.codePoints,
    (issue) => t('valibot.actions.codePoints', { received: issue.received }),
    locale.value,
  )
}
