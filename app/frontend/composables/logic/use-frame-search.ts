import * as v from 'valibot'
import { ref } from '@vue/reactivity'

import { i18n } from '~/i18n'

import { useLocale, useCookie } from '~/composables'
import { useSearchCriteria } from '~/stores'

interface FrameSearchOptions {
  el?: Element
}

interface SearchOptions {
  ev: Event
  success: boolean
  message: string
}

interface SearchPropertys {
  word?: string | null
  tagName?: string | null
  q?: string
}

export function useFrameSearch(options?: FrameSearchOptions) {
  const { autoDetect } = useLocale()

  const { criteria } = useSearchCriteria()

  autoDetect()

  const schema = v.object({
    word: v.pipe(v.string(), v.maxLength(40)),
    tagName: v.pipe(v.string(), v.maxLength(10)),
  })

  const searchParams = ref<SearchPropertys>({})

  const errorMessages = ref<SearchPropertys>({ word: '', tagName: '' })

  const setSearchParams = () => {
    searchParams.value.word = criteria.value.word ? criteria.value.word : ''
    searchParams.value.tagName = criteria.value.tag_name ? criteria.value.tag_name : ''
  }

  const search = (ev: Event): void => {
    const { success, errorMessages } = validateParams()

    if (searchParams.value.word) {
      searchByWord({ ev, success, message: errorMessages?.word?.at(0) ?? '' })
    } else {
      searchByTagName({ ev, success, message: errorMessages?.tagName?.at(0) ?? '' })
    }
  }

  const validateParams = () => {
    const result = v.safeParse(schema, searchParams.value, { lang: i18n.global.locale.value })
    const errorMessages = result.issues ? v.flatten(result.issues).nested : {}
    const success = result.success

    return { success, errorMessages }
  }

  const searchByWord = ({ ev, success, message }: SearchOptions): void => {
    if (success) {
      searchParams.value.q = searchParams.value.word
        ? JSON.stringify({ word: searchParams.value.word ?? '' })
        : '{}'
      submit()
    } else {
      errorMessages.value.word = message
      ev.preventDefault()
    }
  }

  const searchByTagName = ({ ev, success, message }: SearchOptions): void => {
    if (success) {
      searchParams.value.q = searchParams.value.tagName
        ? JSON.stringify({ tag_name: searchParams.value.tagName ?? '' })
        : '{}'
      submit()
    } else {
      errorMessages.value.tagName = message
      ev.preventDefault()
    }
  }

  const submit = (): void => {
    const { criteriaCookie } = useCookie()

    if (searchParams.value.q) {
      criteria.value = searchParams.value.q
      criteriaCookie.value = searchParams.value.q
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

  return { searchParams, errorMessages, setSearchParams, search, setValue, setErrorMessage }
}
