import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const octal = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.octal,
    (issue) => t('valibot.actions.octal', { received: issue.received }),
    locale.value,
  )
}
