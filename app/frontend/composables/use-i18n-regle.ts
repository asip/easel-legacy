import { useI18n } from '@/composables'

import { defineRegleConfig } from '@regle/core'
import { required, withMessage } from '@regle/rules'

export const { useRegle: useI18nRegle } = defineRegleConfig({
  rules: () => {
    const { t } = useI18n()
    return {
      required: withMessage(required, () => t('rules.required')),
    }
  },
})
