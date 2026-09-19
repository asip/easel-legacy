import * as v from 'valibot'

import { schemaMessage } from '@/i18n/valibot'
import { maxLength } from '@/i18n/valibot/actions'

export const useValibotI18n = function (options: v.GlobalConfig) {
  const defaultActions = () => {
    maxLength()
  }

  let customActions: () => void = () => undefined

  const setup = (func: () => void): void => {
    customActions = func
  }

  const globalConfig = () => {
    v.setGlobalConfig(options)
  }

  const initValibotI18n = () => {
    schemaMessage()
    defaultActions()
    customActions()
    globalConfig()
  }

  return { initValibotI18n, setup }
}
