import { useI18nGlobal } from '@vesperjs/vue'
import * as r from '@regle/rules'

export const minFileSize = () => {
  const { t } = useI18nGlobal()

  return r.withMessage(r.minFileSize, ({ $params: [minSize] }) =>
    t('regle.rules.minFileSize', { min: minSize / (1000 * 1000) }),
  )
}
