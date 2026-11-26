import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const notSize = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.notSize,
    (issue) => t('valibot.actions.notSize', { requirement: issue.requirement.toString() }),
    locale.value,
  )
}
