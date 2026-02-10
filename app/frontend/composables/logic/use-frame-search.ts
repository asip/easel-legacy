import * as v from 'valibot'

import { i18n } from '~/i18n'

import { useLocale, useCookie } from '~/composables'
import { searchCriteria } from '~/stores'

interface FrameSearchOptions {
  el: Element
  wordEl: HTMLInputElement | null
  wordMessageEl: HTMLDivElement | null
  tagEl: HTMLInputElement | null
  tagMessageEl: HTMLDivElement | null
}

interface SearchParams {
  word?: string | null
  tagName?: string | null
  q?: string
}

export function useFrameSearch({ el, wordEl, wordMessageEl, tagEl, tagMessageEl}: FrameSearchOptions ) {
  const { autoDetect } = useLocale()

  autoDetect()

  const schema = v.object({
    word: v.pipe(v.string(), v.maxLength(40)),
    tagName: v.pipe(v.string(), v.maxLength(10))
  })

  let params: SearchParams = { word: wordEl?.value, tagName: tagEl?.value }

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

  const searchByWord = ({ ev, success, message }: { ev: Event, success: boolean, message: string }): void => {
    if (success) {
      params.q = JSON.stringify({ word: params.word })
      submit()
    } else {
      setErrorMessage({ ev, el: wordMessageEl, message })
    }
  }

  const searchByTagName = ({ ev, success, message }: { ev: Event, success: boolean, message: string }): void => {
    if (success) {
      params.q = tagEl?.value ? JSON.stringify({ tag_name: params.tagName }) : '{}'
      submit()
    } else {
      setErrorMessage({ ev, el: tagMessageEl, message })
    }
  }

  const setErrorMessage = ({ ev, el, message }: { ev: Event, el: HTMLDivElement | null, message: string }) => {
    if (el) el.innerHTML = message
    ev.preventDefault()
  }

  const submit = (): void => {
    const { cookies } = useCookie()

    if (params.q) {
      searchCriteria.set(params.q)
      cookies.set('q', params.q, { path: '/' });
      (el as HTMLFormElement).requestSubmit()
    }
  }

  return { search }
}
