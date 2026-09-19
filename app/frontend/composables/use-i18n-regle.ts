import { useI18nGlobal } from '@vesperjs/vue'

import { defineRegleConfig } from '@regle/core'
import * as r from '@regle/rules'

const { t } = useI18nGlobal()

export const { useRegle: useI18nRegle } = defineRegleConfig({
  rules: () => ({
    required: r.withMessage(r.required, () => t('rules.required')),
  }),
})
