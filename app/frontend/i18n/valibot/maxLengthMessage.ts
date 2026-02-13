import * as v from 'valibot'
import { i18n } from '../i18n'

import { useLocale } from '~/composables'

const maxLengthMessage = () => {
  /*
  v.setSpecificMessage(v.maxLength, (issue) => `are limited to ${issue.requirement.toString()} characters.`, 'en')
  v.setSpecificMessage(v.maxLength, (issue) => `${issue.requirement.toString()}文字以内で入力してください`, 'ja')
  */
  const { locale } = useLocale()
  v.setSpecificMessage(
    v.maxLength,
    (issue) => i18n.global.t('rules.maxLength', { max: issue.requirement.toString() }),
    locale.value,
  )
}

export { maxLengthMessage }
