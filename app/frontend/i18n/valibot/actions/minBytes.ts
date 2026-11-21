import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

import { formatFileSize } from './util/formatFileSize'

export const minBytes = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.minBytes,
    (issue) => t('valibot.actions.minBytes', { requirement: formatFileSize(issue.requirement) }),
    locale.value,
  )
}
