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
      const { form, criteria } = useFrameSearch()
      const { value: wordValue } = useElement(this.wordTarget, { property: 'value' })
      const { value: tagValue } = useElement(this.tagTarget, { property: 'value' })

      form.value.word = criteria.value?.word ?? ''
      form.value.tag_name = criteria.value?.tag_name ?? ''
      wordValue.value = form.value.word
      tagValue.value = form.value.tag_name
    }
  }

  submit(ev: Event): void {
    const { form, submit, r$ } = useFrameSearch()
    const { value: wordValue } = useElement(this.wordTarget, { property: 'value' })
    const { value: tagValue } = useElement(this.tagTarget, { property: 'value' })
    const { innerHTML: wordMessage } = useElement(this.wordMessageTarget, { property: 'innerHTML' })
    const { innerHTML: tagMessage } = useElement(this.tagMessageTarget, { property: 'innerHTML' })

    form.value.word = wordValue.value
    form.value.tag_name = tagValue.value
    void (async () => {
      await submit(ev)
      wordMessage.value = r$.$errors.word.at(0) ?? ''
      tagMessage.value = r$.$errors.tag_name.at(0) ?? ''
    })()
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
