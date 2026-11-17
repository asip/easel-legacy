import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const minBytes = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.minBytes,
    (issue) =>
      t('valibot.actions.minBytes', { min: (issue.requirement / (1000 * 1000)).toString() }),
    locale.value,
  )
}
