import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const email = (i18n: Composer) => {
  const { locale, t } = i18n
  v.setSpecificMessage(v.email, () => t('valibot.actions.email', {}), locale.value)
}
