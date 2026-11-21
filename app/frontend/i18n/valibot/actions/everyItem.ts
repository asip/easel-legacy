import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const everyItem = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.everyItem,
    (issue) => t('valibot.actions.everyItem', { received: issue.received }),
    locale.value,
  )
}
