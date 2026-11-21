import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const ipv6 = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.ipv6,
    (issue) => t('valibot.actions.ipv6', { received: issue.received }),
    locale.value,
  )
}
