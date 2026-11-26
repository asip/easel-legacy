import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const notValue = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.notValue,
    (issue) => t('valibot.actions.notValue', { requirement: issue.requirement.toString() }),
    locale.value,
  )
}
