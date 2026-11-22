import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const toNumber = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.toNumber,
    (issue) => t('valibot.actions.toNumber', { received: issue.received }),
    locale.value,
  )
}
