import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const check = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.check,
    (issue) => t('valibot.actions.check', { received: issue.received }),
    locale.value,
  )
}
