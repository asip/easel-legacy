import { i18n } from '~/i18n'

import { defineRegleConfig } from '@regle/core'
import { required, withMessage } from '@regle/rules'

export const { useRegle: useI18nRegle } = defineRegleConfig({
  rules: () => ({
    required: withMessage(required, () => i18n.global.t('rules.required'))
  })
})
