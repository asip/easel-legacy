import { defineRegleConfig } from '@regle/core'
import { useI18nGlobal } from '@vesperjs/vue'

import { required } from '@/i18n/regle/rules'

export const { useRegle: useRegleI18n } = defineRegleConfig({
  rules: () => {
    const i18n = useI18nGlobal()
    return {
      required: required(i18n),
    }
  },
})
