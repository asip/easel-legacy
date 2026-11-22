import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const stringifyJson = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.stringifyJson,
    (issue) => t('valibot.actions.stringifyJson', { received: issue.received }),
    locale.value,
  )
}
