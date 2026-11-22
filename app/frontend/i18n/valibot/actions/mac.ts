import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const mac = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.mac,
    (issue) => t('valibot.actions.mac', { received: issue.received }),
    locale.value,
  )
}
