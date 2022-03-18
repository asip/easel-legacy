import {createApp, ref, reactive, onMounted} from 'vue/dist/vue.esm-bundler.js'
import TurbolinksAdapter from 'vue-turbolinks';
import Axios, { AxiosResponse } from 'axios'
import sanitizeHtml from 'sanitize-html'

//console.log(constants.api_origin);

Axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
};

const root: HTMLElement = document.querySelector('#comment_component');

if (root) {
  const constants: { api_origin: string } = {
    api_origin: root.getAttribute('data-api-origin')
  }

  interface User {
    id: string,
    token: string
  }

  interface Comment {
    frame_id: string,
    body: string
  }

  var initCommentComponent = (): void => {
    const comment_vm: any = createApp({
      setup(){
        let account: any = null;
        const logged_in: any = ref<boolean>(false);
        const current_user: any = reactive<User>({
          id: '',
          token: ''
        })
        const comment: any = reactive<Comment>({
          frame_id: '',
          body: '',
        });
        const comments: any = reactive<any[]>([]);
        const error_messages: any = reactive<string[]>([]);

        const getSanitizedCommentBody = (row: any): string => {
          return sanitizeHtml(row.attributes.body).replace(/\n/g, '<br>');
        };
        const getAccount = async () => {
          const res: AxiosResponse<any, any> = await Axios.get(`${constants.api_origin}/account`,
            {
              headers: {
                Authorization: `Bearer ${current_user.token}`
              }
            })
          if (res.data) {
            account = res.data.data;
            //console.log(this.account);
            current_user.id = account.attributes.id;
          }
        };
        const getComments = async (frame_id: any) => {
          //console.log(frame_id);
          const res: AxiosResponse<any, any> = await Axios.get(`${constants.api_origin}/frames/${frame_id}/comments`);
          if (res.data) {
            //console.log(res.data.data);
            comments.splice(0, comments.length);
            for(var comment of res.data.data){
              //console.log(comment);
              comments.push(comment);
            }
            //console.log(comments);
          }
        };
        const postComment = async () => {
          try{
            const res: AxiosResponse<any, any> = await Axios.post(`${constants.api_origin}/frames/${comment.frame_id}/comments`,
              {
                comment: {
                  frame_id: comment.frame_id,
                  body: comment.body
                }
              },
              {
                headers: {
                  Authorization: `Bearer ${current_user.token}`
                }
              }
            )
            if (res.data.data.attributes.error_messages && res.data.data.attributes.error_messages.length > 0) {
              error_messages.splice(0, error_messages.length);
              for(var error_message of res.data.data.attributes.error_messages){
                error_messages.push(error_message)
              }
            } else {
              comment.body = '';
              error_messages.splice(0, error_messages.length);
              await getComments(comment.frame_id);
            }
          } catch(error) {
              error_messages.splice(0, error_messages.length);
              error_messages.push('ログインしてください。');
          }
        };
        const setComment = async () => {
          if (comment.body != '') {
            //console.log(comment.userId);
            //console.log(comment.frameId);
            //console.log(comment.body);
            await postComment();
          } else {
            error_messages.splice(0, error_messages.length);
            error_messages.push('コメントを入力してください。');
          }
        };
        const deleteComment = async (comment: any) => {
          try {
            const res: AxiosResponse<any, any> = await Axios.delete(`${constants.api_origin}/comments/${comment.id}`, {
              headers: {
                Authorization: `Bearer ${current_user.token}`
              }
            });
            comments.splice(0, comments.length);
            getComments(comment.attributes.frame_id);
          } catch(error) {
            error_messages.splice(0, error_messages.length);
            error_messages.push('ログインしてください。');
          }
        };

        onMounted(async () => {
          current_user.token = root.dataset.token;
          if (root.dataset.login == 'true') {
            logged_in.value = true;
          } else {
            logged_in.value = false;
          }
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
  };

  document.addEventListener('turbo:load', () => {
    initCommentComponent()
  });
}