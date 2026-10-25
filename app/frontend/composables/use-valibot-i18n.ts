import * as v from 'valibot'

import { schemaMessage } from '@/i18n/valibot'

export const useValibotI18n = function (options: v.GlobalConfig) {
  let actions: () => void = () => undefined

  const setup = (func: () => void): void => {
    actions = func
  }

  const globalConfig = () => {
    v.setGlobalConfig(options)
  }

  const init = () => {
    schemaMessage()
    actions()
    globalConfig()
  }

  return { init, setup }
}
