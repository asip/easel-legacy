import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const creditCard = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.creditCard,
    (issue) => t('valibot.actions.creditCard', { received: issue.received }),
    locale.value,
  )
}
