import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const excludes = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.excludes,
    (issue) => t('valibot.actions.excludes', { requirement: issue.requirement }),
    locale.value,
  )
}
