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

    const { setSearchParams } = useFrameSearch({ wordEl: this.wordElement, tagEl: this.tagElement })
    setSearchParams()
  }

  submit(ev: Event): void {
    const { search } = useFrameSearch({
      el: this.element,
      wordEl: this.wordElement,
      wordMessageEl: this.wordMessageElement,
      tagEl: this.tagElement,
      tagMessageEl: this.tagMessageElement,
    })

    search(ev)
  }

  clearWordMessage(): void {
    const { clearErrorMessage } = useFrameSearch({})

    clearErrorMessage(this.wordMessageElement)
  }

  clearTagMessage(): void {
    const { clearErrorMessage } = useFrameSearch({})

    clearErrorMessage(this.tagMessageElement)
  }
}
