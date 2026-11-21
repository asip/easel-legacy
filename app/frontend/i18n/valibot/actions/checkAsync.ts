import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const checkAsync = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.checkAsync,
    (issue) => t('valibot.actions.checkAsync', { received: issue.received }),
    locale.value,
  )
}
