import Axios, { AxiosResponse } from 'axios'
import { ref, reactive} from 'vue/dist/vue.esm-bundler.js'
import { useViewData } from './use_view_data';
import { User } from './use_account'

interface Comment {
  frame_id: string,
  body: string
}

export function useComment(current_user: User) {
  const comment: any = reactive<Comment>({
    frame_id: '',
    body: '',
  });
  const comments: any = reactive<any[]>([]);
  const error_messages: any = reactive<string[]>([]);

  const { constants } = useViewData();

  const getComments = async (frame_id: any) => {
    //console.log(frame_id);
    const res: AxiosResponse<any, any> = await Axios.get(`${constants.api_origin}/frames/${frame_id}/comments`);
    if (res.data) {
      //console.log(res.data.data);
      comments.splice(0, comments.length);
      for (let comment of res.data.data) {
        //console.log(comment);
        comments.push(comment);
      }
      //console.log(comments);
    }
  };
  const postComment = async () => {
    try {
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
        for (let error_message of res.data.data.attributes.error_messages) {
          error_messages.push(error_message)
        }
      } else {
        comment.body = '';
        error_messages.splice(0, error_messages.length);
        await getComments(comment.frame_id);
      }
    } catch (error) {
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
      const res: AxiosResponse<any, any> = await Axios.delete(
          `${constants.api_origin}/comments/${comment.id}`,
          {
            headers: {
              Authorization: `Bearer ${current_user.token}`
            }
          });
      comments.splice(0, comments.length);
      await getComments(comment.attributes.frame_id);
    } catch (error) {
      error_messages.splice(0, error_messages.length);
      error_messages.push('ログインしてください。');
    }
  };

  return {
    comment, comments, error_messages ,getComments, postComment, setComment, deleteComment
  }
}