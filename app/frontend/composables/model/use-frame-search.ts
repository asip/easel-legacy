import * as v from 'valibot'
import { ref, computed } from '@vue/reactivity'

import { useLocale } from '@vesperjs/vue'

import { Criteria } from '@/types'
import { useCookieStore } from '@/composables'

interface QueryItems {
  q?: string
}

export const useFrameSearch = function () {
  const { locale, autodetect } = useLocale()
  const { criteria } = useCookieStore()

  autodetect()

  const schema = v.object({
    word: v.pipe(v.string(), v.maxLength(40)),
    tag_name: v.pipe(v.string(), v.maxLength(10)),
  })

  const params = ref<Criteria>({})

  const queryMap = computed<{ q?: string }>(() => {
    const query: QueryItems = {}
    const qItems: Criteria = {}

    if (params.value.word) qItems.word = params.value.word
    if (params.value.tag_name) {
      qItems.tag_name = params.value.tag_name
    }
    query.q = JSON.stringify(qItems)

    return query
  })

  const errors = ref<Criteria>({ word: '', tag_name: '' })

  const validate = () => {
    const result = v.safeParse(schema, params.value, { lang: locale.value })
    const errorMessages = result.issues ? v.flatten(result.issues).nested : {}
    const success = result.success

    errors.value.word = errorMessages?.word?.at(0) ?? ''
    errors.value.tag_name = errorMessages?.tag_name?.at(0) ?? ''

    return success
  }

  const search = (ev: Event): void => {
    const success = validate()

    if (success) {
      submit(ev)
    } else {
      ev.preventDefault()
    }
  }

  const submit = (ev: Event): void => {
    const el = ev.target as HTMLFormElement
    if (queryMap.value.q) {
      criteria.value = queryMap.value.q

      el.requestSubmit()
    }
  }

  return {
    params,
    criteria,
    errors: errors.value,
    search,
  }
}
