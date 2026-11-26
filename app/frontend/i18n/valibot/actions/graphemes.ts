import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const graphemes = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.graphemes,
    (issue) => t('valibot.actions.graphemes', { requirement: issue.requirement }),
    locale.value,
  )
}
