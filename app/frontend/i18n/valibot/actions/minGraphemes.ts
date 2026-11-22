import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const minGraphemes = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.minGraphemes,
    (issue) => t('valibot.actions.minGraphemes', { requirement: issue.requirement.toString() }),
    locale.value,
  )
}
