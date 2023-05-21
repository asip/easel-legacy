import { createApp, onMounted, App as Application } from 'vue/dist/vue.esm-bundler.js'
import TurbolinksAdapter from 'vue-turbolinks';
import Axios from 'axios'
import sanitizeHtml from 'sanitize-html'
import { useViewData } from '../../composables/use_view_data';
import { useCookieData } from '../../composables/use_cookie_data';
import { useAccount } from '../../composables/use_account';
import { useComment } from '../../composables/use_comment';

const initCommentComponent = (): void => {

  const { root, constants } = useViewData();

  if (root) {
    Axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': constants.csrf_token
    };

    const comment_vm: Application = createApp({
      setup() {
        const { access_token } = useCookieData();

        const { account, logged_in, current_user, getAccount } = useAccount();

        const { comment, comments, error_messages ,getComments, setComment, deleteComment} = useComment(current_user);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const getSanitizedCommentBody = (row: any): string => {
          return sanitizeHtml(row.body).replace(/\n/g, '<br>');
        };

        onMounted(async () => {
          current_user.token = access_token;
          //console.log(access_token)
          logged_in.value = current_user.token != null;
          //console.log(current_user.token);
          //console.log(logged_in.value);
          if (current_user.token != null && current_user.token != '') {
            await getAccount();
          }
          comment.frame_id = constants.frame_id;
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
          setComment,
          deleteComment
        }
      }
    });

    comment_vm.use(TurbolinksAdapter);

    comment_vm.mount('#comments_component');

    //console.log(comment_vm);
  }
};

document.addEventListener('turbo:load', () => {
  initCommentComponent()
});
