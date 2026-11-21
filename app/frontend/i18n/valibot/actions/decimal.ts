import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const decimal = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.decimal,
    (issue) => t('valibot.actions.decimal', { received: issue.received }),
    locale.value,
  )
}
