import { defineRegleConfig } from '@regle/core'
import { useI18nGlobal } from '@vesperjs/vue'

import { required } from '@regle-rules/i18n'

export const { useRegle: useRegleI18n } = defineRegleConfig({
  rules: () => {
    const i18n = useI18nGlobal()
    return {
      required: required(i18n),
    }
  },
})
