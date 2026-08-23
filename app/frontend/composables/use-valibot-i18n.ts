import * as v from 'valibot'

import { useLocale } from '@vesperjs/vue'

import { i18n } from '@/i18n'

const { t } = i18n.global

const useValibotI18n = function () {
  const schemaMessage = () => {
    /*
    v.setSchemaMessage((issue) => `Invalid type: Please enter as type ${issue.expected ?? ''}, not type ${issue.received}`, 'en')
    v.setSchemaMessage((issue) => `無効な型です：${issue.received}型ではなく${issue.expected ?? ''}型で入力してください`, 'ja')
    */
    const { locale } = useLocale()
    v.setSchemaMessage(
      (issue) =>
        t('rules.schemaMessage', {
          received: issue.received,
          expected: issue.expected ?? '',
        }),
      locale.value,
    )
  }

  const maxLength = () => {
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

  const initValibotI18n = () => {
    schemaMessage()
    maxLength()
  }

  initValibotI18n()
}

export { useValibotI18n }
