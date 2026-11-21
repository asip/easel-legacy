import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const hash = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.hash,
    (issue) => t('valibot.actions.hash', { received: issue.received }),
    locale.value,
  )
}
