import * as v from 'valibot'
import { ref, computed } from '@vue/reactivity'

import { i18n } from '~/i18n'

import { useLocale, useCookieStore } from '~/composables'

interface SearchPropertys {
  word?: string | null
  tagName?: string | null
}

export function useFrameSearch() {
  const { autoDetect } = useLocale()
  const { criteria } = useCookieStore()

  autoDetect()

  const schema = v.object({
    word: v.pipe(v.string(), v.maxLength(40)),
    tagName: v.pipe(v.string(), v.maxLength(10)),
  })

  const searchParams = ref<SearchPropertys>({})

  const queryMap = computed<{ q?: string }>(() => {
    const query: { q?: string } = {}

    if (searchParams.value.word) {
      query.q = JSON.stringify({ word: searchParams.value.word })
    } else if (searchParams.value.tagName) {
      query.q = JSON.stringify({ tag_name: searchParams.value.tagName })
    } else {
      query.q = JSON.stringify({})
    }

    return query
  })

  const errors = ref<SearchPropertys>({ word: '', tagName: '' })

  const init = () => {
    searchParams.value.word = criteria.value?.word ?? ''
    searchParams.value.tagName = criteria.value?.tag_name ?? ''
  }

  const validate = () => {
    const result = v.safeParse(schema, searchParams.value, { lang: i18n.global.locale.value })
    const errorMessages = result.issues ? v.flatten(result.issues).nested : {}
    const success = result.success

    errors.value.word = errorMessages?.word?.at(0) ?? ''
    errors.value.tagName = errorMessages?.tagName?.at(0) ?? ''

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
      if (criteria.value) criteria.value = queryMap.value.q
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
