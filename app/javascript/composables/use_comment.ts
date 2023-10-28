import Axios, { AxiosResponse } from 'axios'
import { reactive } from 'vue'
import { useViewData } from './use_view_data'
import { User } from './use_account'

interface Comment {
  id: number | null
  frame_id: number | null,
  body: string
  user_id: number | null,
  user_name: string
  user_image_url: string
  updated_at: string | null
}

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

  const { constants } = useViewData()

  const getComments = async (frame_id: number | null) => {
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
    return {
      id: row_data.id,
      frame_id: row_data.attributes.frame_id,
      body: row_data.attributes.body,
      user_id: row_data.attributes.user_id,
      user_name: row_data.attributes.user_name,
      user_image_url: row_data.attributes.user_image_url,
      updated_at: row_data.attributes.updated_at
    }
  }

  const postComment = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

      const error_message_list = res.data.data.attributes.error_messages
      if ( error_message_list && error_message_list.length > 0) {
        error_messages.splice(0, error_messages.length)
        for (const error_message of error_message_list) {
          error_messages.push(error_message)
        }
      } else {
        comment.body = ''
        error_messages.splice(0, error_messages.length)
        await getComments(comment.frame_id)
      }
    } catch (error) {
      error_messages.splice(0, error_messages.length)
      error_messages.push('ログインしてください。')
    }
  }
  const setComment = async () => {
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
    try {
      await Axios.delete(
        `${constants.api_origin}/comments/${comment.id}`,
        {
          headers: {
            Authorization: `Bearer ${current_user.token}`
          }
        })
      comments.splice(0, comments.length)
      await getComments(comment.frame_id)
    } catch (error) {
      error_messages.splice(0, error_messages.length)
      error_messages.push('ログインしてください。')
    }
  }

  return {
    comment, comments, error_messages ,getComments, setComment, deleteComment
  }
}