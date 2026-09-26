import * as v from 'valibot'

import { useI18nGlobal } from '@vesperjs/vue'

export const maxLength = () => {
  const { t, locale } = useI18nGlobal()
  v.setSpecificMessage(
    v.maxLength,
    (issue) => t('valibot.actions.maxLength', { max: issue.requirement.toString() }),
    locale.value,
  )
}
