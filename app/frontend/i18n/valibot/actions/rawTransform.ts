import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const rawTransform = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.rawTransform,
    (issue) => t('valibot.actions.rawTransform', { received: issue.received }),
    locale.value,
  )
}
