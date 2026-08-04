import * as v from 'valibot'
import { ref, computed } from '@vue/reactivity'
import { useRegleSchema } from '@regle/schemas'

import { useLocale } from '@vesperjs/vue'

import { Criteria } from '@/types'
import { useCookieStore } from '@/composables'
import { useFrameSearchSchema } from './validation'

interface QueryItems {
  q?: string
}

export const useFrameSearch = function () {
  const { autodetect, locale } = useLocale()
  const { criteria } = useCookieStore()
  const { frameSearchSchema } = useFrameSearchSchema()

  v.setGlobalConfig({ lang: locale.value })
  autodetect()

  const params = ref<Criteria>({})

  const queryMap = computed<QueryItems>(() => {
    const query: QueryItems = {}
    const qItems: Criteria = {}

    if (params.value.word) qItems.word = params.value.word
    if (params.value.tag_name) qItems.tag_name = params.value.tag_name
    query.q = JSON.stringify(qItems)

    return query
  })

  const { r$ } = useRegleSchema(params.value, frameSearchSchema)

  const submit = async (ev: Event): Promise<void> => {
    r$.$touch()
    const { valid } = await r$.$validate()

    if (valid) {
      if (queryMap.value.q) {
        criteria.value = queryMap.value.q

        const el = ev.target as HTMLFormElement
        el.requestSubmit()
      }
    } else {
      ev.preventDefault()
    }
  }

  return {
    params,
    criteria,
    r$,
    submit,
  }
}
