import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const length = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.length,
    (issue) => t('valibot.actions.length', { requirement: issue.requirement.toString() }),
    locale.value,
  )
}
