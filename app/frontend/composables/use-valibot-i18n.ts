import * as v from 'valibot'

import { useI18nGlobal } from '@vesperjs/vue'

import { schemaMessage } from '@/i18n/valibot'
import { maxLength } from '@/i18n/valibot/actions'

const { locale } = useI18nGlobal()

export const useValibotI18n = function () {
  let i18nActions: () => void = () => {
    maxLength()
  }

  const setI18nActions = (func: () => void): void => {
    i18nActions = func
  }

  const globalConfig = () => {
    v.setGlobalConfig({ lang: locale.value })
  }

  const initValibotI18n = () => {
    schemaMessage()
    i18nActions()
    globalConfig()
  }

  return { initValibotI18n, setI18nActions }
}
