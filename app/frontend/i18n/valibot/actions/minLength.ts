import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const minLength = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.minLength,
    (issue) => t('valibot.actions.minLength', { min: issue.requirement.toString() }),
    locale.value,
  )
}
