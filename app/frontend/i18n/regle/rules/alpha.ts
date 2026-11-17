import { useI18nGlobal } from '@vesperjs/vue'
import * as r from '@regle/rules'

export const alpha = () => {
  const { t } = useI18nGlobal()

  return r.withMessage(r.alpha, () => t('regle.rules.alpha'))
}
