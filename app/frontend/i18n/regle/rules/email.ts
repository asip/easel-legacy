import { useI18nGlobal } from '@vesperjs/vue'
import * as r from '@regle/rules'

export const email = () => {
  const { t } = useI18nGlobal()

  return r.withMessage(r.email, () => t('regle.rules.email'))
}
