import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const hexColor = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.hexColor,
    (issue) => t('valibot.actions.hexColor', { received: issue.received }),
    locale.value,
  )
}
