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

  connect(): void {
    if (this.hasWordTarget && this.hasTagTarget) {
      const { searchParams, init } = useFrameSearch()
      const { value: wordValue } = useElement(this.wordTarget)
      const { value: tagValue } = useElement(this.tagTarget)

      init()
      wordValue.value = searchParams.value.word
      tagValue.value = searchParams.value.tag_name
    }
  }

  submit(ev: Event): void {
    const { errors, searchParams, search } = useFrameSearch()
    const { value: wordValue } = useElement(this.wordTarget)
    const { value: tagValue } = useElement(this.tagTarget)
    const { innerHtml: wordMessage } = useElement(this.wordMessageTarget)
    const { innerHtml: tagMessage } = useElement(this.tagMessageTarget)

    searchParams.value.word = wordValue.value
    searchParams.value.tag_name = tagValue.value
    search(ev)
    wordMessage.value = errors.word
    tagMessage.value = errors.tag_name
  }

  clearWordMessage(): void {
    const { innerHtml: wordMessage } = useElement(this.wordMessageTarget)
    wordMessage.value = ''
  }

  clearTagMessage(): void {
    const { innerHtml: tagMessage } = useElement(this.tagMessageTarget)
    tagMessage.value = ''
  }
}
