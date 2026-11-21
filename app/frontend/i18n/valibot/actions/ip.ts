import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const ip = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.ip,
    (issue) => t('valibot.actions.ip', { received: issue.received }),
    locale.value,
  )
}
