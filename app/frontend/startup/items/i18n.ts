import { useI18nGlobal } from '@vesperjs/vue'

import { useValibotI18n } from '@/composables'

import '@/i18n'

const { locale } = useI18nGlobal()

const { initValibotI18n } = useValibotI18n({ lang: locale.value })

initValibotI18n()
