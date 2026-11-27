import { useI18nGlobal } from '@vesperjs/vue'

import { useValibotConfig } from '@valibot-i18n/vue'
import { maxLength, schemaMessage } from '@valibot-i18n/vue'

export const useValibotI18n = () => {
  const i18n = useI18nGlobal()
  const { locale } = i18n

  const { setup } = useValibotConfig({ lang: locale.value })

  setup(() => {
    schemaMessage(i18n)
    maxLength(i18n)
  })
}
