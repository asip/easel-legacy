import * as v from 'valibot'

import { ref } from '@vue/reactivity'
import { useLocale } from '@vesperjs/vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useValibot = (model: object, schema: any) => {
  const { locale } = useLocale()

  const errors = ref<Readonly<Record<string, [string, ...string[]] | undefined>> | undefined>({})

  const validate = () => {
    const result = v.safeParse(schema, model, { lang: locale.value })
    const errorMessages = result.issues ? v.flatten(result.issues).nested : {}
    errors.value = errorMessages
    const valid = result.success
    return { valid }
  }

  return { validate, errors }
}
