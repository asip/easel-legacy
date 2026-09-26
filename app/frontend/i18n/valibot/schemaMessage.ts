import * as v from 'valibot'

import { useI18nGlobal } from '@vesperjs/vue'

export const schemaMessage = () => {
  const { t, locale } = useI18nGlobal()
  v.setSchemaMessage(
    (issue) =>
      t('valibot.schemaMessage', {
        received: issue.received,
        expected: issue.expected ?? '',
      }),
    locale.value,
  )
}
