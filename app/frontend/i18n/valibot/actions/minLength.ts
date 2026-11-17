import * as v from 'valibot'

import { useI18nGlobal } from '@vesperjs/vue'

export const minLength = () => {
  const { t, locale } = useI18nGlobal()
  v.setSpecificMessage(
    v.minLength,
    (issue) => t('valibot.actions.minLength', { min: issue.requirement.toString() }),
    locale.value,
  )
}
