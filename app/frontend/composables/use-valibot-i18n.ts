import * as v from 'valibot'

import { useI18n } from '@/composables'

const { t, locale } = useI18n()

export const useValibotI18n = function () {
  const schemaMessage = () => {
    /*
    v.setSchemaMessage((issue) => `Invalid type: Please enter as type ${issue.expected ?? ''}, not type ${issue.received}`, 'en')
    v.setSchemaMessage((issue) => `無効な型です：${issue.received}型ではなく${issue.expected ?? ''}型で入力してください`, 'ja')
    */
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
    v.setSpecificMessage(
      v.maxLength,
      (issue) => t('rules.maxLength', { max: issue.requirement.toString() }),
      locale.value,
    )
  }

  const specificMessage = () => {
    maxLength()
  }

  const globalConfig = () => {
    v.setGlobalConfig({ lang: locale.value })
  }

  const initValibotI18n = () => {
    schemaMessage()
    specificMessage()
    globalConfig()
  }

  initValibotI18n()
}
