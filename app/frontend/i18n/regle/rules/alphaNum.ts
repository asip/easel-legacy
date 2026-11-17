import { useI18nGlobal } from '@vesperjs/vue'
import * as r from '@regle/rules'

export const alphaNum = () => {
  const { t } = useI18nGlobal()

  return r.withMessage(r.alphaNum, () => t('regle.rules.alphaNum'))
}
