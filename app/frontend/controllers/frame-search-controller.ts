import ApplicationController from './application-controller'

import { useElement } from '@vesperjs/vue'
import { useFrameSearch } from '@/composables'

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
      const { params, criteria } = useFrameSearch()
      const { value: wordValue } = useElement(this.wordTarget, { property: 'value' })
      const { value: tagValue } = useElement(this.tagTarget, { property: 'value' })

      params.value.word = criteria.value?.word ?? ''
      params.value.tag_name = criteria.value?.tag_name ?? ''
      wordValue.value = params.value.word
      tagValue.value = params.value.tag_name
    }
  }

  submit(ev: Event): void {
    const { errors, params, submit } = useFrameSearch()
    const { value: wordValue } = useElement(this.wordTarget, { property: 'value' })
    const { value: tagValue } = useElement(this.tagTarget, { property: 'value' })
    const { innerHTML: wordMessage } = useElement(this.wordMessageTarget, { property: 'innerHTML' })
    const { innerHTML: tagMessage } = useElement(this.tagMessageTarget, { property: 'innerHTML' })

    params.value.word = wordValue.value
    params.value.tag_name = tagValue.value
    submit(ev)
    wordMessage.value = errors.value?.word?.at(0) ?? ''
    tagMessage.value = errors.value?.tag_name?.at(0) ?? ''
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
