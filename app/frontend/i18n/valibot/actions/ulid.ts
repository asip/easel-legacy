import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const ulid = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.ulid,
    (issue) => t('valibot.actions.ulid', { received: issue.received }),
    locale.value,
  )
}
