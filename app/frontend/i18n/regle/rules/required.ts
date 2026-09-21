import * as r from '@regle/rules'
import { useI18nGlobal } from '@vesperjs/vue'

const { t } = useI18nGlobal()

export const required = function () {
  return r.withMessage(r.required, () => t('regle.rules.required'))
}
