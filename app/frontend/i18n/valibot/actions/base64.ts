import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const base64 = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.base64,
    (issue) => t('valibot.actions.base64', { received: issue.received }),
    locale.value,
  )
}
