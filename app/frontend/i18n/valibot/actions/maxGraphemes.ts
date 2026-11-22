import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const maxGraphemes = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.maxGraphemes,
    (issue) => t('valibot.actions.maxGraphemes', { requirement: issue.requirement.toString() }),
    locale.value,
  )
}
