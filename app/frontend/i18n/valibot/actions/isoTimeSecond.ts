import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const isoTimeSecond = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.isoTimeSecond,
    (issue) => t('valibot.actions.isoTimeSecond', { received: issue.received }),
    locale.value,
  )
}
