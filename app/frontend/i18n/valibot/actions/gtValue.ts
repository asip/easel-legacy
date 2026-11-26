import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const gtValue = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.gtValue,
    (issue) => t('valibot.actions.gtValue', { requirement: issue.requirement.valueOf() }),
    locale.value,
  )
}
