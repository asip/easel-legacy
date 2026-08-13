import * as v from 'valibot'
import { ref, computed } from '@vue/reactivity'
import { useRegleSchema } from '@regle/schemas'

import { useLocale } from '@vesperjs/vue'

import { Criteria /* , QueryItems */ } from '@/types'
import { useCookieStore } from '@/composables'
import { useFrameSearchSchema } from './validation'

export const useFrameSearch = function () {
  const { autodetect, locale } = useLocale()
  const { criteria } = useCookieStore()
  const { frameSearchSchema } = useFrameSearchSchema()

  autodetect()

  const form = ref<Criteria>({})

  const qItems = computed<Criteria>(() => {
    const items: Criteria = {}

    if (form.value.word) items.word = form.value.word
    if (form.value.tag_name) items.tag_name = form.value.tag_name
    return items
  })

  /*
  const queryMap = computed<QueryItems>(() => {
    const query: QueryItems = {}
    query.q = JSON.stringify(qItems)
    return query
  })
  */

  v.setGlobalConfig({ lang: locale.value })
  const { r$ } = useRegleSchema(form.value, frameSearchSchema)

  const submit = async (ev: Event): Promise<void> => {
    r$.$touch()
    const { valid } = await r$.$validate()

    if (valid) {
      criteria.value = JSON.stringify(qItems.value)

      const el = ev.target as HTMLFormElement
      el.requestSubmit()
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
