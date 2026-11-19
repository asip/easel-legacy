import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

import { formatFileSize } from './util/formatFileSize'

export const maxBytes = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.maxBytes,
    (issue) => t('valibot.actions.maxBytes', { max: formatFileSize(issue.requirement) }),
    locale.value,
  )
}
