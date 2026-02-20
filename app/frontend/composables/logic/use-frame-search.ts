import * as v from 'valibot'

import { i18n } from '~/i18n'

import { useLocale, useCookie } from '~/composables'
import { useSearchCriteria } from '~/stores'

interface FrameSearchOptions {
  el?: Element
  wordEl?: HTMLInputElement | null
  wordMessageEl?: HTMLDivElement | null
  tagEl?: HTMLInputElement | null
  tagMessageEl?: HTMLDivElement | null
}

interface SearchOptions {
  ev: Event
  success: boolean
  message: string
}

interface SearchParams {
  word?: string | null
  tagName?: string | null
  q?: string
}

export function useFrameSearch({
  el,
  wordEl,
  wordMessageEl,
  tagEl,
  tagMessageEl,
}: FrameSearchOptions) {
  const { autoDetect } = useLocale()

  const { criteria } = useSearchCriteria()

  autoDetect()

  const schema = v.object({
    word: v.pipe(v.string(), v.maxLength(40)),
    tagName: v.pipe(v.string(), v.maxLength(10)),
  })

  let params: SearchParams = { word: wordEl?.value, tagName: tagEl?.value }

  const setSearchParams = () => {
    if (wordEl && tagEl) {
      wordEl.value = criteria.value.word ? criteria.value.word : ''
      tagEl.value = criteria.value.tag_name ? criteria.value.tag_name : ''
    }
  }

  const search = (ev: Event): void => {
    const { success, errorMessages } = validateParams()

    if (params.word) {
      searchByWord({ ev, success, message: errorMessages?.word?.at(0) ?? '' })
    } else {
      searchByTagName({ ev, success, message: errorMessages?.tagName?.at(0) ?? '' })
    }
  }

  const validateParams = () => {
    const result = v.safeParse(schema, params, { lang: i18n.global.locale.value })
    const errorMessages = result.issues ? v.flatten(result.issues).nested : {}
    const success = result.success

    return { success, errorMessages }
  }

  const searchByWord = ({ ev, success, message }: SearchOptions): void => {
    if (success) {
      params.q = params.word ? JSON.stringify({ word: params.word }) : '{}'
      submit()
    } else {
      setErrorMessage({ el: wordMessageEl, message })
      ev.preventDefault()
    }
  }

  const searchByTagName = ({ ev, success, message }: SearchOptions): void => {
    if (success) {
      params.q = params.tagName ? JSON.stringify({ tag_name: params.tagName }) : '{}'
      submit()
    } else {
      setErrorMessage({ el: tagMessageEl, message })
      ev.preventDefault()
    }
  }

  const setErrorMessage = ({
    el,
    message,
  }: {
    el: HTMLDivElement | null | undefined
    message: string
  }) => {
    if (el) el.innerHTML = message
  }

  const submit = (): void => {
    const { setCriteriaToCookie } = useCookie()

    if (params.q) {
      criteria.value = params.q
      setCriteriaToCookie(params.q)
      ;(el as HTMLFormElement).requestSubmit()
    }
  }

  const clearErrorMessage = (el: HTMLDivElement | null): void => {
    if (el && el.innerHTML != '') el.innerHTML = ''
  }

  return { setSearchParams, search, clearErrorMessage }
}
