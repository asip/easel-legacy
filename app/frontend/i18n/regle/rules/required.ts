import * as r from '@regle/rules'
import { useI18nGlobal } from '@vesperjs/vue'

export const required = function () {
  const { t } = useI18nGlobal()
  return r.withMessage(r.required, () => t('regle.rules.required'))
}
