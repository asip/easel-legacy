import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const cuid2 = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.cuid2,
    (issue) => t('valibot.actions.cuid2', { received: issue.received }),
    locale.value,
  )
}
