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

    const { searchParams, setSearchParams } = useFrameSearch()
    setSearchParams()
    if (this.wordElement && this.tagElement) {
      this.wordElement.value = searchParams.value.word ?? ''
      this.tagElement.value = searchParams.value.tagName ?? ''
    }
  }

  submit(ev: Event): void {
    const { searchParams, errorMessages, search } = useFrameSearch({ el: this.element })
    searchParams.value.word = this.wordElement?.value
    searchParams.value.tagName = this.tagElement?.value
    search(ev)
    if (this.wordMessageElement && this.tagMessageElement) {
      this.wordMessageElement.innerHTML = errorMessages.value.word ?? ''
      this.tagMessageElement.innerHTML = errorMessages.value.tagName ?? ''
    }
  }

  clearWordMessage(): void {
    if (this.wordMessageElement) this.wordMessageElement.innerHTML = ''
  }

  clearTagMessage(): void {
    if (this.tagMessageElement) this.tagMessageElement.innerHTML = ''
  }
}
