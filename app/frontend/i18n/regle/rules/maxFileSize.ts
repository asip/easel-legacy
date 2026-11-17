import { useI18nGlobal } from '@vesperjs/vue'
import * as r from '@regle/rules'

export const maxFileSize = () => {
  const { t } = useI18nGlobal()

  return r.withMessage(r.maxFileSize, ({ $params: [maxSize] }) =>
    t('regle.rules.maxFileSize', { max: maxSize / (1000 * 1000) }),
  )
}
