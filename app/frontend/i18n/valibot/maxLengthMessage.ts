import * as v from 'valibot'

import { useLocale } from '@vesperjs/vue'

import { i18n } from '@/i18n'

const { t } = i18n.global

const maxLengthMessage = () => {
  /*
  v.setSpecificMessage(v.maxLength, (issue) => `are limited to ${issue.requirement.toString()} characters.`, 'en')
  v.setSpecificMessage(v.maxLength, (issue) => `${issue.requirement.toString()}文字以内で入力してください`, 'ja')
  */
  const { locale } = useLocale()
  v.setSpecificMessage(
    v.maxLength,
    (issue) => t('rules.maxLength', { max: issue.requirement.toString() }),
    locale.value,
  )
}

export { maxLengthMessage }
