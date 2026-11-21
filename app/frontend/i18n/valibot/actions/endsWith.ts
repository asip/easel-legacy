import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const endsWith = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.endsWith,
    (issue) => t('valibot.actions.endsWith', { requirement: issue.requirement }),
    locale.value,
  )
}
