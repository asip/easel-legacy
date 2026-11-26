import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const multipleOf = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.multipleOf,
    (issue) => t('valibot.actions.multipleOf', { requirement: issue.requirement.toString() }),
    locale.value,
  )
}
