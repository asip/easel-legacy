import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

export const emoji = (i18n: Composer) => {
  const { locale, t } = i18n
  v.setSpecificMessage(v.emoji, () => t('valibot.actions.emoji', {}), locale.value)
}
