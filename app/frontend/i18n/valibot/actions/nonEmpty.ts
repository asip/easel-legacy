import * as v from 'valibot'

import { useI18nGlobal } from '@vesperjs/vue'

export const nonEmpty = () => {
  const { locale, t } = useI18nGlobal()
  v.setSpecificMessage(v.nonEmpty, () => t('valibot.actions.nonEmpty', {}), locale.value)
}
