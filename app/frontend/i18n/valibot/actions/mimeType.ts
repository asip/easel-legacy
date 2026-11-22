import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const mimeType = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.mimeType,
    (issue) => t('valibot.actions.mimeType', { received: issue.received }),
    locale.value,
  )
}
