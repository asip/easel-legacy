import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const toString = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.toString,
    (issue) => t('valibot.actions.toString', { received: issue.received }),
    locale.value,
  )
}
