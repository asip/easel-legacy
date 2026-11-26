import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const emoji = (i18n: Composer) => {
  const { locale, t } = i18n
  v.setSpecificMessage(
    v.emoji,
    (issue) => t('valibot.actions.emoji', { received: issue.received }),
    locale.value,
  )
}
