import { createApp, App as Application } from 'vue'
// @ts-expect-error : @types doesn't exist
import TurbolinksAdapter from 'vue-turbolinks'
import Axios from 'axios'

import { useViewData } from '../../composables/use_view_data'

import Comments from '../Comments.vue'

declare var document: Document

const initCommentComponent = (): void => {

  const viewData = useViewData()

  if (viewData.root) {
    Axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': viewData.csrf_token
    }

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
