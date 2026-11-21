import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const ltValue = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.ltValue,
    (issue) => t('valibot.actions.ltValue', { expected: issue.expected, received: issue.received }),
    locale.value,
  )
}
