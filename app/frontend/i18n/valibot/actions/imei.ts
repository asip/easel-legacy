import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const imei = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.imei,
    (issue) => t('valibot.actions.imei', { received: issue.received }),
    locale.value,
  )
}
