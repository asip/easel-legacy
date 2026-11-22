import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const partialCheck = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.partialCheck,
    (issue) => t('valibot.actions.partialCheck', { received: issue.received }),
    locale.value,
  )
}
