import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const isrc = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.isrc,
    (issue) => t('valibot.actions.isrc', { received: issue.received }),
    locale.value,
  )
}
