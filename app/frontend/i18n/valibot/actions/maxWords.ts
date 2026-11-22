import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const maxWords = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.maxWords,
    (issue) => t('valibot.actions.maxWords', { requirement: issue.requirement.toString() }),
    locale.value,
  )
}
