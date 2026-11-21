import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const ipv4 = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.ipv4,
    (issue) => t('valibot.actions.ipv4', { received: issue.received }),
    locale.value,
  )
}
