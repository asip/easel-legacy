import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const maxBytes = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.maxBytes,
    (issue) =>
      t('valibot.actions.maxBytes', { max: (issue.requirement / (1000 * 1000)).toString() }),
    locale.value,
  )
}
