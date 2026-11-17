import { useI18nGlobal } from '@vesperjs/vue'
import * as r from '@regle/rules'

export const sameAs = () => {
  const { t } = useI18nGlobal()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return r.withMessage(r.sameAs, ({ $params: [_, otherName = 'other'] }) =>
    t('regle.rules.sameAs', { otherName }),
  )
}
