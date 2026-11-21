import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const isbn = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.isbn,
    (issue) => t('valibot.actions.isbn', { received: issue.received }),
    locale.value,
  )
}
