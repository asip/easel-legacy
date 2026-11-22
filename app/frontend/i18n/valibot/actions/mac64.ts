import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const mac64 = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.mac64,
    (issue) => t('valibot.actions.mac64', { received: issue.received }),
    locale.value,
  )
}
