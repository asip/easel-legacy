import * as v from 'valibot'

import { useI18nGlobal } from '@vesperjs/vue'

export const minBytes = () => {
  const { t, locale } = useI18nGlobal()
  v.setSpecificMessage(
    v.minBytes,
    (issue) =>
      t('valibot.actions.minBytes', { min: (issue.requirement / (1000 * 1000)).toString() }),
    locale.value,
  )
}
