import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const rfcEmail = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.rfcEmail,
    (issue) => t('valibot.actions.rfcEmail', { received: issue.received }),
    locale.value,
  )
}
