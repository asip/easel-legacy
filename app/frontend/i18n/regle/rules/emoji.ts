import { useI18nGlobal } from '@vesperjs/vue'
import * as r from '@regle/rules'

export const emoji = () => {
  const { t } = useI18nGlobal()

  return r.withMessage(r.emoji, () => t('regle.rules.emoji'))
}
