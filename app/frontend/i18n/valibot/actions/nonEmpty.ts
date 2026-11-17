import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const nonEmpty = (i18n: Composer) => {
  const { locale, t } = i18n
  v.setSpecificMessage(v.nonEmpty, () => t('valibot.actions.nonEmpty', {}), locale.value)
}
