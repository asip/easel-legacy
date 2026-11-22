import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const mac48 = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.mac48,
    (issue) => t('valibot.actions.mac48', { received: issue.received }),
    locale.value,
  )
}
