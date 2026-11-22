import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const minWords = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.minWords,
    (issue) => t('valibot.actions.minWords', { requirement: issue.requirement.toString() }),
    locale.value,
  )
}
