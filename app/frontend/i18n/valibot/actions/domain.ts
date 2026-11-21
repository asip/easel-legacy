import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const domain = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.domain,
    (issue) => t('valibot.actions.domain', { received: issue.received }),
    locale.value,
  )
}
