import * as v from 'valibot'
import { i18n } from '../i18n'

import { useLocale } from '~/composables';

const schemaMessage = () => {
  /*
  v.setSchemaMessage((issue) => `Invalid type: Please enter as type ${issue.expected || ''}, not type ${issue.received}`, 'en')
  v.setSchemaMessage((issue) => `無効な型です：${issue.received}型ではなく${issue.expected || ''}型で入力してください`, 'ja')
  */
  const { locale } = useLocale()
  v.setSchemaMessage((issue) => i18n.global.t('rules.schemaMessage', { received: issue.received, expected: issue.expected || '' }), locale.value)
}

export { schemaMessage }
