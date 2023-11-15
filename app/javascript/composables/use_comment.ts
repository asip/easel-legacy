import Axios, { AxiosResponse } from 'axios'

import { ref, reactive } from 'vue'

import type { User } from '../interfaces/user'
import type { Comment } from '../interfaces/comment'
import type { Flash } from '../interfaces/flash'

import { useViewData } from './use_view_data'

export function useComment(current_user: User) {
  const comment = reactive<Comment>({
    id: null,
    frame_id: null,
    body: '',
    user_id: null,
    user_name: '',
    user_image_url: '',
    updated_at: null
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const comments = reactive<any[]>([])
  const error_messages = reactive<string[]>([])
  const flash = ref<Flash> ({})

  const { constants } = useViewData()

  const getComments = async (frame_id: number | null) => {
    flash.value = {}
    //console.log(frame_id)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: AxiosResponse<any, any> = await Axios.get(`${constants.api_origin}/frames/${frame_id}/comments`)
    if (res.data) {
      const comment_list = res.data.data
      //console.log(comment_list);
      comments.splice(0, comments.length)
      for (const comment of comment_list) {
        //console.log(comment);
        comments.push(createCommentFromJson(comment))
      }
      //console.log(comments);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createCommentFromJson = (row_data: any): Comment => {
    const comment: any = {}
    comment.id = row_data.id
    Object.assign(comment, row_data.attributes)
    return comment
  }

  const postComment = async () => {
    try {
      // const params = new URLSearchParams()
      // params.append('comment[body]', comment.body)
      const params = {
        comment: {
          body: comment.body
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: AxiosResponse<any, any> = await Axios.post(`${constants.api_origin}/frames/${comment.frame_id}/comments`,
        params,
        {
          headers: {
            Authorization: `Bearer ${current_user.token}`
          }
        }
      )

      const error_message_list = res.data.data.attributes.error_messages
      if ( error_message_list && error_message_list.length > 0) {
        error_messages.splice(0, error_messages.length)
        for (const error_message of error_message_list) {
          error_messages.push(error_message)
        }
      } else {
        comment.body = ''
        error_messages.splice(0, error_messages.length)
      }
    } catch (error) {
      error_messages.splice(0, error_messages.length)
      setErrorMessage(error)
    }
  }
  const setComment = async () => {
    flash.value = {}
    if (comment.body != '') {
      //console.log(comment.userId);
      //console.log(comment.frameId);
      //console.log(comment.body);
      await postComment()
    } else {
      error_messages.splice(0, error_messages.length)
      error_messages.push('コメントを入力してください。')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deleteComment = async (comment: any) => {
    flash.value = {}
    try {
      await Axios.delete(
        `${constants.api_origin}/comments/${comment.id}`,
        {
          headers: {
            Authorization: `Bearer ${current_user.token}`
          }
        })
      comments.splice(0, comments.length)
    } catch (error) {
      error_messages.splice(0, error_messages.length)
      setErrorMessage(error)
    }
  }

  const setErrorMessage = (error: any) => {
    if(Axios.isAxiosError(error)){
      const status = error.response?.status
      switch(status){
      case 401:
        flash.value.alert = 'ページを再読み込みし、ログインしてください。'
        break
      default:
        flash.value.alert = '不具合が発生しました。'
      }
    }
  }

  return {
    comment, comments, flash, error_messages,
    getComments, setComment, deleteComment
  }
}