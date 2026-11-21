import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const checkItemsAsync = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.checkItemsAsync,
    (issue) => t('valibot.actions.checkItemsAsync', { received: issue.received }),
    locale.value,
  )
}
