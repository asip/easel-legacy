import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const email = (i18n: Composer) => {
  const { locale, t } = i18n
  v.setSpecificMessage(
    v.email,
    (issue) => t('valibot.actions.email', { received: issue.received }),
    locale.value,
  )
}
