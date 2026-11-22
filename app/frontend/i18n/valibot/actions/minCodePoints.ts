import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const minCodePoints = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.minCodePoints,
    (issue) => t('valibot.actions.minCodePoints', { requirement: issue.requirement.toString() }),
    locale.value,
  )
}
