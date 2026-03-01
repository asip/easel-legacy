import * as v from 'valibot'
import { ref, computed } from '@vue/reactivity'

import { i18n } from '~/i18n'

import { useLocale, useCookie } from '~/composables'
import { useSearchCriteria } from '~/stores'

interface SearchPropertys {
  word?: string | null
  tagName?: string | null
}

export function useFrameSearch(options?: { el?: Element }) {
  const { autoDetect } = useLocale()
  const { criteria } = useSearchCriteria()

  autoDetect()

  const schema = v.object({
    word: v.pipe(v.string(), v.maxLength(40)),
    tagName: v.pipe(v.string(), v.maxLength(10)),
  })

  const searchParams = ref<SearchPropertys>({})

  const queryMap = computed<{ q?: string }>(() => {
    const items = searchParams.value
    const query: { q?: string } = {}

    if (items.word) {
      query.q = JSON.stringify({ word: items.word })
    } else if (items.tagName) {
      query.q = JSON.stringify({ tag_name: items.tagName })
    } else {
      query.q = JSON.stringify({})
    }

    return query
  })

  const errors = ref<SearchPropertys>({ word: '', tagName: '' })

  const initSearchParams = () => {
    searchParams.value.word = criteria.value.word
    searchParams.value.tagName = criteria.value.tag_name
  }

  const search = (ev: Event): void => {
    const success = validateSearchParams()

    if (success) {
      submit()
    } else {
      ev.preventDefault()
    }
  }

  const validateSearchParams = () => {
    const result = v.safeParse(schema, searchParams.value, { lang: i18n.global.locale.value })
    const errorMessages = result.issues ? v.flatten(result.issues).nested : {}
    const success = result.success

    errors.value.word = errorMessages?.word?.at(0) ?? ''
    errors.value.tagName = errorMessages?.tagName?.at(0) ?? ''

    return success
  }

  const submit = (): void => {
    const { criteriaCookie } = useCookie()

    if (queryMap.value.q) {
      criteria.value = queryMap.value.q
      criteriaCookie.value = queryMap.value.q
      ;(options?.el as HTMLFormElement).requestSubmit()
    }
  }

  const setValue = ({ el, value }: { el: HTMLInputElement | null; value: string }): void => {
    if (el) el.value = value
  }

  const setErrorMessage = ({
    el,
    message,
  }: {
    el: HTMLDivElement | null
    message: string
  }): void => {
    if (el) el.innerHTML = message
  }

  return { searchParams, errors, initSearchParams, search, setValue, setErrorMessage }
}
