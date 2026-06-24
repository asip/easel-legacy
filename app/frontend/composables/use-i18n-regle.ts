import { i18n } from '@/i18n'

import { defineRegleConfig } from '@regle/core'
import { required, withMessage } from '@regle/rules'

const { t } = i18n.global

export const { useRegle: useI18nRegle } = defineRegleConfig({
  rules: () => ({
    required: withMessage(required, () => t('rules.required')),
  }),
})
