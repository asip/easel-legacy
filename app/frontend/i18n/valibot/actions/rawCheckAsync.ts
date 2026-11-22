import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const rawCheckAsync = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.rawCheckAsync,
    (issue) => t('valibot.actions.rawCheckAsync', { received: issue.received }),
    locale.value,
  )
}
