import * as v from 'valibot'

import { useI18nGlobal } from '@vesperjs/vue'

const { t, locale } = useI18nGlobal()

export const schemaMessage = () => {
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
