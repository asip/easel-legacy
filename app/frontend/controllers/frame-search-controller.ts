import ApplicationController from './application-controller'

import { useElement } from '@vesperjs/vue'
import { useFrameSearch } from '~/composables'

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
      const { value: wordValue } = useElement(this.wordTarget, { property: 'value' })
      const { value: tagValue } = useElement(this.tagTarget, { property: 'value' })

      init()
      wordValue.value = searchParams.value.word
      tagValue.value = searchParams.value.tag_name
    }
  }

  submit(ev: Event): void {
    const { errors, searchParams, search } = useFrameSearch()
    const { value: wordValue } = useElement(this.wordTarget, { property: 'value' })
    const { value: tagValue } = useElement(this.tagTarget, { property: 'value' })
    const { innerHTML: wordMessage } = useElement(this.wordMessageTarget, { property: 'innerHTML' })
    const { innerHTML: tagMessage } = useElement(this.tagMessageTarget, { property: 'innerHTML' })

    searchParams.value.word = wordValue.value
    searchParams.value.tag_name = tagValue.value
    search(ev)
    wordMessage.value = errors.word
    tagMessage.value = errors.tag_name
  }

  clearWordMessage(): void {
    const { innerHTML: wordMessage } = useElement(this.wordMessageTarget, { property: 'innerHTML' })
    wordMessage.value = ''
  }

  clearTagMessage(): void {
    const { innerHTML: tagMessage } = useElement(this.tagMessageTarget, { property: 'innerHTML' })
    tagMessage.value = ''
  }
}
