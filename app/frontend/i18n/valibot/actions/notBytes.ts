import type { Composer } from 'vue-i18n'
import * as v from 'valibot'

import { formatFileSize } from './util/formatFileSize'

export const notBytes = (i18n: Composer) => {
  const { t, locale } = i18n
  v.setSpecificMessage(
    v.notBytes,
    (issue) => t('valibot.actions.notBytes', { requirement: formatFileSize(issue.requirement) }),
    locale.value,
  )
}
