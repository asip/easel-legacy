import { useFrameSearch } from '~/composables'
import ApplicationController from './application-controller'

export { useFrameSearch } from '~/composables'

export default class FrameSearchController extends ApplicationController {
  static targets = ['word', 'tag', 'wordMessage', 'tagMessage']

  declare readonly wordTarget: HTMLInputElement
  declare readonly hasWordTarget: boolean
  declare readonly tagTarget: HTMLInputElement
  declare readonly hasTagTarget: boolean
  declare readonly wordMessageTarget: HTMLDivElement
  declare readonly hasWordMessageTarget: boolean
  declare readonly tagMessageTarget: HTMLDivElement
  declare readonly hasTagMessageTarget: boolean

  wordElement: HTMLInputElement | null = null
  tagElement: HTMLInputElement | null = null
  wordMessageElement: HTMLDivElement | null = null
  tagMessageElement: HTMLDivElement | null = null

  connect(): void {
    if (this.hasWordTarget) this.wordElement = this.wordTarget
    if (this.hasTagTarget) this.tagElement = this.tagTarget
    if (this.hasWordMessageTarget) this.wordMessageElement = this.wordMessageTarget
    if (this.hasTagMessageTarget) this.tagMessageElement = this.tagMessageTarget

    const { searchParams, initSearchParams, setValue } = useFrameSearch()
    initSearchParams()
    setValue({ el: this.wordElement, value: searchParams.word ?? '' })
    setValue({ el: this.tagElement, value: searchParams.tagName ?? '' })
  }

  submit(ev: Event): void {
    const { errors, setSearchParams, search, setErrorMessage } = useFrameSearch({
      el: this.element,
    })
    setSearchParams({ word: this.wordElement?.value ?? '', tagName: this.tagElement?.value ?? '' })
    search(ev)
    setErrorMessage({ el: this.wordMessageElement, message: errors.word ?? '' })
    setErrorMessage({ el: this.tagMessageElement, message: errors.tagName ?? '' })
  }

  clearWordMessage(): void {
    const { setErrorMessage } = useFrameSearch()
    setErrorMessage({ el: this.wordMessageElement, message: '' })
  }

  clearTagMessage(): void {
    const { setErrorMessage } = useFrameSearch()
    setErrorMessage({ el: this.tagMessageElement, message: '' })
  }
}
