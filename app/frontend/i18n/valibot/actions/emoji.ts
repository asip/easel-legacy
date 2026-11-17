import * as v from 'valibot'

import { useI18nGlobal } from '@vesperjs/vue'

export const emoji = () => {
  const { locale, t } = useI18nGlobal()
  v.setSpecificMessage(v.emoji, () => t('valibot.actions.emoji', {}), locale.value)
}
