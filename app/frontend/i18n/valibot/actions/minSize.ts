import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const minSize = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.minSize,
    (issue) => t('valibot.actions.minSize', { requirement: issue.requirement.toString() }),
    locale.value,
  )
}
