import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const url = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.url,
    (issue) => t('valibot.actions.url', { received: issue.received }),
    locale.value,
  )
}
