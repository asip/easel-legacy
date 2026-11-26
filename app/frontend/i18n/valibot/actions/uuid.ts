import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const uuid = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.uuid,
    (issue) => t('valibot.actions.uuid', { received: issue.received }),
    locale.value,
  )
}
