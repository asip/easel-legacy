import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const bic = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.bic,
    (issue) => t('valibot.actions.bic', { received: issue.received }),
    locale.value,
  )
}
