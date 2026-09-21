import * as v from 'valibot'

import { useI18nGlobal } from '@vesperjs/vue'

const { t, locale } = useI18nGlobal()

export const maxLength = () => {
  v.setSpecificMessage(
    v.maxLength,
    (issue) => t('valibot.actions.maxLength', { max: issue.requirement.toString() }),
    locale.value,
  )
}
