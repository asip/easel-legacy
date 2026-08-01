import * as v from 'valibot'
import { ref, computed } from '@vue/reactivity'
import { useRegleSchema } from '@regle/schemas'

import { useLocale } from '@vesperjs/vue'

import { Criteria } from '@/types'
import { useCookieStore } from '@/composables'

interface QueryItems {
  q?: string
}

export const useFrameSearch = function () {
  const { autodetect, locale } = useLocale()
  const { criteria } = useCookieStore()

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

  const schema = v.object({
    word: v.pipe(v.string(), v.maxLength(40)),
    tag_name: v.pipe(v.string(), v.maxLength(10)),
  })

  const { r$ } = useRegleSchema(params.value, schema)

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
