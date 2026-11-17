import { useI18nGlobal } from '@vesperjs/vue'
import * as r from '@regle/rules'

export const minLength = () => {
  const { t } = useI18nGlobal()

  return r.withMessage(r.minLength, ({ $params: [min] }) => t('regle.rules.minLength', { min }))
}
