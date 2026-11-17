import * as v from 'valibot'

import { useI18nGlobal } from '@vesperjs/vue'

export const email = () => {
  const { locale, t } = useI18nGlobal()
  v.setSpecificMessage(v.email, () => t('valibot.actions.email', {}), locale.value)
}
