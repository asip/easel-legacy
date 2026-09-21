import { useI18nGlobal } from '@vesperjs/vue'

import { useValibotI18n } from '@/composables'
import { maxLength } from '@/i18n/valibot/actions'

const { locale } = useI18nGlobal()

export const useValibot = () => {
  const { initValibotI18n, setup } = useValibotI18n({ lang: locale.value })

  setup(() => {
    maxLength()
  })

  initValibotI18n()
}
