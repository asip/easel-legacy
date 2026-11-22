import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const maxValue = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.maxValue,
    (issue) => t('valibot.actions.maxValue', { requirement: issue.requirement.toString() }),
    locale.value,
  )
}
