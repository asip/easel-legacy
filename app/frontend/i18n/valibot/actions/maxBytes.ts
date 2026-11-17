import * as v from 'valibot'

import { useI18nGlobal } from '@vesperjs/vue'

export const maxBytes = () => {
  const { t, locale } = useI18nGlobal()
  v.setSpecificMessage(
    v.maxBytes,
    (issue) =>
      t('valibot.actions.maxBytes', { max: (issue.requirement / (1000 * 1000)).toString() }),
    locale.value,
  )
}
