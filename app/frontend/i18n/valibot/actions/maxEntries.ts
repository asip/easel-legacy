import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const maxEntries = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.maxEntries,
    (issue) => t('valibot.actions.maxEntries', { requirement: issue.requirement.toString() }),
    locale.value,
  )
}
