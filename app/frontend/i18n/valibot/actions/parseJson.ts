import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const parseJson = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.parseJson,
    (issue) => t('valibot.actions.parseJson', { received: issue.received }),
    locale.value,
  )
}
