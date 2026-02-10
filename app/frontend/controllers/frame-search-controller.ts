import { useFrameSearch } from '~/composables'
import ApplicationController from './application-controller'

export { useFrameSearch } from '~/composables'
import { searchCriteria } from '~/stores'

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

    if(this.wordElement && this.tagElement) {
      const qItems: Record<'word'|'tag_name', string>  = JSON.parse(searchCriteria.get()) as Record<'word'|'tag_name', string>
      this.wordElement.value = qItems.word ? qItems.word : ''
      this.tagElement.value = qItems.tag_name ? qItems.tag_name : ''
    }
  }

  submit(ev: Event): void {
    const { search } = useFrameSearch(
      {
        el: this.element,
        wordEl: this.wordElement, wordMessageEl: this.wordMessageElement,
        tagEl: this.tagElement, tagMessageEl: this.tagMessageElement
      }
    )

    search(ev)
  }

  clearWordMessage(): void {
    this.#clearErrorMessage(this.wordMessageElement)
  }

  clearTagMessage(): void {
    this.#clearErrorMessage(this.tagMessageElement)
  }

  #clearErrorMessage(el: HTMLDivElement | null): void {
    if (el && el.innerHTML != '') el.innerHTML = ''
  }
}
