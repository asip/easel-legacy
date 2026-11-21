import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const isoDateTimeSecond = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.isoDateTimeSecond,
    (issue) => t('valibot.actions.isoDateTimeSecond', { received: issue.received }),
    locale.value,
  )
}
