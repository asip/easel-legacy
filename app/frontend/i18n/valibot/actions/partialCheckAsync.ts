import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const partialCheckAsync = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.partialCheckAsync,
    (issue) => t('valibot.actions.partialCheckAsync', { received: issue.received }),
    locale.value,
  )
}
