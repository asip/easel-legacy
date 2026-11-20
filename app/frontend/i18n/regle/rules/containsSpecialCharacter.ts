import type { Composer } from 'vue-i18n'
import * as r from '@regle/rules'

export const containsSpecialCharacter = (i18n: Composer) => {
  const { t } = i18n

  return r.withMessage(r.containsSpecialCharacter, ({ $params: [minCharactersCount] }) =>
    t('regle.rules.containsSpecialCharacter', {
      minCharactersCount,
      plural: minCharactersCount && minCharactersCount > 1 ? 's' : '',
    }),
  )
}
