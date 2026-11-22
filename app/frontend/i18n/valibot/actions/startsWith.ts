import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const startsWith = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.startsWith,
    (issue) => t('valibot.actions.startsWith', { requirement: issue.requirement }),
    locale.value,
  )
}
