import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const slug = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.slug,
    (issue) => t('valibot.actions.slug', { received: issue.received }),
    locale.value,
  )
}
