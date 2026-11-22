import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const regex = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.regex,
    (issue) => t('valibot.actions.regex', { requirement: issue.requirement }),
    locale.value,
  )
}
