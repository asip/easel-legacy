import { useElement, useFrameSearch } from '~/composables'
import ApplicationController from './application-controller'

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

    const { searchParams, initSearchParams } = useFrameSearch()
    const { value: wordValue } = useElement(this.wordElement)
    const { value: tagValue } = useElement(this.tagElement)

    initSearchParams()
    wordValue.value = searchParams.value.word
    tagValue.value = searchParams.value.tagName
  }

  submit(ev: Event): void {
    const { errors, searchParams, search } = useFrameSearch({
      el: this.element,
    })
    const { value: wordValue } = useElement(this.wordElement)
    const { value: tagValue } = useElement(this.tagElement)
    const { content: wordMessage } = useElement(this.wordMessageElement)
    const { content: tagMessage } = useElement(this.tagMessageElement)

    searchParams.value.word = wordValue.value
    searchParams.value.tagName = tagValue.value
    search(ev)
    wordMessage.value = errors.word
    tagMessage.value = errors.tagName
  }

  clearWordMessage(): void {
    const { content: wordMessage } = useElement(this.wordMessageElement)
    wordMessage.value = ''
  }

  clearTagMessage(): void {
    const { content: tagMessage } = useElement(this.tagMessageElement)
    tagMessage.value = ''
  }
}
