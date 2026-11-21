import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const hexadecimal = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.hexadecimal,
    (issue) => t('valibot.actions.hexadecimal', { received: issue.received }),
    locale.value,
  )
}
