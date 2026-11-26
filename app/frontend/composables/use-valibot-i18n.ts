import { useI18nGlobal } from '@vesperjs/vue'

import { useValibotConfig } from '@/i18n/valibot'
import { maxLength } from '@/i18n/valibot/actions'

export const useValibotI18n = () => {
  const i18n = useI18nGlobal()
  const { locale } = i18n

  const { setup } = useValibotConfig({ lang: locale.value })

  setup(() => {
    maxLength(i18n)
  })
}
