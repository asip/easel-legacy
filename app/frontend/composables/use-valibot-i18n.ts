import * as v from 'valibot'

import { schemaMessage } from '@/i18n/valibot'
import { maxLength } from '@/i18n/valibot/actions'

export const useValibotI18n = function (options: v.GlobalConfig) {
  let i18nActions: () => void = () => {
    maxLength()
  }

  const setup = (func: () => void): void => {
    i18nActions = func
  }

  const globalConfig = () => {
    v.setGlobalConfig(options)
  }

  const initValibotI18n = () => {
    schemaMessage()
    i18nActions()
    globalConfig()
  }

  return { initValibotI18n, setup }
}
