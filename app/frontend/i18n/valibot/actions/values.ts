import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const values = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.values,
    (issue) => t('valibot.actions.values', { requirement: issue.requirement.join(',') }),
    locale.value,
  )
}
