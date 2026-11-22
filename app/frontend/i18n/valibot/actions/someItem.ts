import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const someItem = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.someItem,
    (issue) => t('valibot.actions.someItem', { received: issue.received }),
    locale.value,
  )
}
