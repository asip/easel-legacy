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

  autodetect()

  const form = ref<Criteria>({})

  const queryMap = computed<QueryItems>(() => {
    const query: QueryItems = {}
    const qItems: Criteria = {}

    if (form.value.word) qItems.word = form.value.word
    if (form.value.tag_name) qItems.tag_name = form.value.tag_name
    query.q = JSON.stringify(qItems)

    return query
  })

  v.setGlobalConfig({ lang: locale.value })
  const { r$ } = useRegleSchema(form.value, frameSearchSchema)

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
    form,
    criteria,
    r$,
    submit,
  }
}
