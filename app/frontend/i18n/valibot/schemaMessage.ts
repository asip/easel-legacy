import * as v from 'valibot'

import { useI18nGlobal } from '@vesperjs/vue'

const { t, locale } = useI18nGlobal()

export const schemaMessage = () => {
  v.setSchemaMessage(
    (issue) =>
      t('rules.schemaMessage', {
        received: issue.received,
        expected: issue.expected ?? '',
      }),
    locale.value,
  )
}
