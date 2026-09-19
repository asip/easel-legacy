import * as v from 'valibot'

import { useI18nGlobal } from '@vesperjs/vue'

const { t, locale } = useI18nGlobal()

export const maxLength = () => {
  /*
  v.setSpecificMessage(v.maxLength, (issue) => `are limited to ${issue.requirement.toString()} characters.`, 'en')
  v.setSpecificMessage(v.maxLength, (issue) => `${issue.requirement.toString()}文字以内で入力してください`, 'ja')
  */
  v.setSpecificMessage(
    v.maxLength,
    (issue) => t('rules.maxLength', { max: issue.requirement.toString() }),
    locale.value,
  )
}
