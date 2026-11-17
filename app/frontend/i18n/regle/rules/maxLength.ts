import { useI18nGlobal } from '@vesperjs/vue'
import * as r from '@regle/rules'

export const maxLength = () => {
  const { t } = useI18nGlobal()

  return r.withMessage(r.maxLength, ({ $params: [max] }) => t('regle.rules.maxLength', { max }))
}
