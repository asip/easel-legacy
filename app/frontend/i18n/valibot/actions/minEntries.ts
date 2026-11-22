import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const minEntries = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.minEntries,
    (issue) => t('valibot.actions.minEntries', { requirement: issue.requirement.toString() }),
    locale.value,
  )
}
