import { computed, ref } from '@vue/reactivity'
import { useRegleSchema } from '@regle/schemas'

import { useLocale } from '@vesperjs/vue'

import { Criteria /* , QueryItems */ } from '@/types'
import { useCookieStore, useFormAction } from '@/composables'
import { useFrameSearchSchema } from './validation'

export const useFrameSearch = function () {
  const { autodetect } = useLocale()
  const { criteria } = useCookieStore()
  const { frameSearchSchema } = useFrameSearchSchema()
  const { submit: submitForm } = useFormAction()

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

  const { r$ } = useRegleSchema(form.value, frameSearchSchema)

  const submit = async (ev: SubmitEvent): Promise<void> => {
    r$.$touch()
    const { valid } = await r$.$validate()

    if (valid) {
      criteria.value = qItems.value

      submitForm(ev)
    }
  }

  return {
    form,
    criteria,
    r$,
    submit,
  }
}
