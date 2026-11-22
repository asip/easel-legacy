import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const nanoid = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.nanoid,
    (issue) => t('valibot.actions.nanoid', { received: issue.received }),
    locale.value,
  )
}
