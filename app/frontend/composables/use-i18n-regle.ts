import { defineRegleConfig } from '@regle/core'

import { required } from '@/i18n/regle/rules'

export const { useRegle: useRegleI18n } = defineRegleConfig({
  rules: () => ({
    required: required(),
  }),
})
