import { createApp, App as Application } from 'vue'
// @ts-expect-error : @types doesn't exist
import TurbolinksAdapter from 'vue-turbolinks'

import Comments from '../Comments.vue'

declare var document: Document

const initCommentComponent = (): void => {

  const root: HTMLElement | null = document.querySelector('#comments_component')

  if (root) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const comment_vm: Application = createApp(Comments)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    comment_vm.use(TurbolinksAdapter)

    comment_vm.mount('#comments_component')

    //console.log(comment_vm);
  }
}

document.addEventListener('turbo:load', () => {
  initCommentComponent()
})
