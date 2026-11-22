import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const parseBoolean = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.parseBoolean,
    (issue) => t('valibot.actions.parseBoolean', { received: issue.received }),
    locale.value,
  )
}
