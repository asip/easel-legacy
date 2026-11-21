import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const digits = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.digits,
    (issue) => t('valibot.actions.digits', { received: issue.received }),
    locale.value,
  )
}
