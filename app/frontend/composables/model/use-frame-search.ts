import * as v from 'valibot'
import { ref, computed } from '@vue/reactivity'

import { i18n } from '~/i18n'

import { useLocale, useCookieStore } from '~/composables'
import { Criteria } from '~/types'

interface QueryItems {
  q?: string
}

export function useFrameSearch() {
  const { autodetect } = useLocale()
  const { criteria } = useCookieStore()

  autodetect()

  const schema = v.object({
    word: v.pipe(v.string(), v.maxLength(40)),
    tag_name: v.pipe(v.string(), v.maxLength(10)),
  })

  const searchParams = ref<Criteria>({})

  const queryMap = computed<{ q?: string }>(() => {
    const query: QueryItems = {}
    const qItems: Criteria = {}

    if (searchParams.value.word) qItems.word = searchParams.value.word
    if (searchParams.value.tag_name) {
      qItems.tag_name = searchParams.value.tag_name
    }
    query.q = JSON.stringify(qItems)

    return query
  })

  const errors = ref<Criteria>({ word: '', tag_name: '' })

  const init = () => {
    searchParams.value.word = criteria.value?.word ?? ''
    searchParams.value.tag_name = criteria.value?.tag_name ?? ''
  }

  const validate = () => {
    const result = v.safeParse(schema, searchParams.value, { lang: i18n.global.locale.value })
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
    searchParams,
    errors: errors.value,
    init,
    search,
  }
}
