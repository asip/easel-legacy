import { createApp, ref, reactive, onMounted, App as Application } from 'vue/dist/vue.esm-bundler.js'
import TurbolinksAdapter from 'vue-turbolinks';
import Axios, { AxiosResponse } from 'axios'
import sanitizeHtml from 'sanitize-html'
import Cookies from 'js-cookie';
import { root, constants } from '../../composables/constants';
import { useAccount } from '../../composables/use_account';
import { useComment } from '../../composables/use_comment';

let initCommentComponent = (): void => {

  if (root) {
    Axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': constants.csrf_token
    };

    const comment_vm: Application = createApp({
      setup() {
        const { account, logged_in, current_user, getAccount } = useAccount();

        const { comment, comments, error_messages ,getComments, postComment, setComment, deleteComment} = useComment(current_user);

        const getSanitizedCommentBody = (row: any): string => {
          return sanitizeHtml(row.attributes.body).replace(/\n/g, '<br>');
        };

        onMounted(async () => {
          current_user.token = Cookies.get('access_token');
          logged_in.value = root.dataset.login == 'true';
          //console.log(current_user.token);
          //console.log(logged_in.value);
          if (current_user.token != null && current_user.token != '') {
            await getAccount();
          }
          comment.frame_id = root.getAttribute('data-frame-id');
          //console.log(comment.frame_id);
          await getComments(comment.frame_id);
          //this.$forceUpdate();
        });

        return {
          account,
          logged_in,
          current_user,
          comment,
          comments,
          error_messages,
          getSanitizedCommentBody,
          getAccount,
          getComments,
          postComment,
          setComment,
          deleteComment
        }
      }
    });

    comment_vm.use(TurbolinksAdapter);

    comment_vm.mount('#comment_component');

    //console.log(comment_vm);
  }
};

document.addEventListener('turbo:load', () => {
  initCommentComponent()
});
