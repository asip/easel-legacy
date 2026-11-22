import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const rawTransformAsync = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.rawTransformAsync,
    (issue) => t('valibot.actions.rawTransformAsync', { received: issue.received }),
    locale.value,
  )
}
