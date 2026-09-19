import { defineRegleConfig } from '@regle/core'

import { required } from '@/i18n/regle/rules'

export const { useRegle: useI18nRegle } = defineRegleConfig({
  rules: () => ({
    required,
  }),
})
