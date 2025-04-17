import Axios, { AxiosError } from 'axios'

import { inject, ref } from 'vue'

import type { User } from '../interfaces/user'
import type { Comment } from '../interfaces/comment'

import { UseViewDataType } from './use_view_data'
import { useFlash } from './use_flash'

interface CommentsResource {
  comments: [CommentResource]
}

interface CommentResource {
  id: number | null
  frame_id: number
  body: string | null
  user_id: number
  user_name: string
  user_image_url: string
  updated_at: string | null
  error_messages: string
}

export function useComment(current_user: User) {
  const comment = ref<Comment>({
    id: undefined,
    frame_id: null,
    body: '',
    user_id: null,
    user_name: '',
    user_image_url: '',
    updated_at: null
  })

  const comments = ref<Comment[]>([])
  const error_messages = ref<string[]>([])

  const viewData = inject('viewData') as UseViewDataType
  const { flash, clearFlash } = useFlash()

  const getComments = async (frame_id: string) => {
    clearFlash()
    //console.log(frame_id)

    try{
      const res = await Axios.get<CommentsResource>(`${viewData.api_origin}/frames/${frame_id}/comments`)

      const comment_list: [CommentResource] = res.data.comments
      //console.log(comment_list);
      comments.value.splice(0, comments.value.length)
      for (const comment of comment_list) {
      //console.log(comment);
        comments.value.push(createCommentFromJson(comment))
      }
      //console.log(comments);
    } catch (error) {
      error_messages.value.splice(0)
      if(Axios.isAxiosError(error)){
        setErrorMessage(error as AxiosError)
      }
    }
  }

  const createCommentFromJson = (resource: CommentResource): Comment => {
    const comment: Partial<Comment> = {}
    Object.assign(comment, resource)
    return comment as Comment
  }

  const postComment = async () => {
    try {
      // const params = new URLSearchParams()
      // params.append('comment[body]', comment.body)
      const params = {
        comment: {
          body: comment.value.body
        }
      }

      const res = await Axios.post<CommentResource>(`${viewData.api_origin}/frames/${comment.value.frame_id?.toString(10) ?? ''}/comments`,
        params,
        {
          headers: {
            Authorization: `Bearer ${current_user.token ?? ''}`
          }
        }
      )

      const error_message_list = res.data.error_messages
      if ( error_message_list && error_message_list.length > 0) {
        error_messages.value.splice(0)
        for (const error_message of error_message_list) {
          error_messages.value.push(error_message)
        }
      } else {
        comment.value.body = ''
        error_messages.value.splice(0)
      }
    } catch (error) {
      error_messages.value.splice(0)
      if(Axios.isAxiosError(error)){
        setErrorMessage(error as AxiosError)
      }
    }
  }
  const setComment = async () => {
    clearFlash()
    if (comment.value.body != '') {
      //console.log(comment.user_id);
      //console.log(comment.frame_Id);
      //console.log(comment.body);
      await postComment()
    } else {
      error_messages.value.splice(0)
      error_messages.value.push('コメントを入力してください。')
    }
  }

  const deleteComment = async (comment: Comment) => {
    clearFlash()
    try {
      await Axios.delete(
        `${viewData.api_origin}/comments/${comment.id?.toString(10) ?? ''}`,
        {
          headers: {
            Authorization: `Bearer ${current_user.token ?? ''}`
          }
        })
      comments.value.splice(0)
    } catch (error) {
      error_messages.value.splice(0)
      if(Axios.isAxiosError(error)){
        setErrorMessage(error as AxiosError)
      }
    }
  }

  const setErrorMessage = (error: AxiosError) => {
    const status = error.response?.status
    switch(status){
    case 401:
      flash.value.alert = 'ページを再読み込みし、ログインしてください'
      break
    case 500:
      flash.value.alert = '不具合が発生しました'
      break
    default:
      flash.value.alert = '不具合が発生しました'
    }
  }

  return {
    comment, comments, flash, error_messages,
    getComments, setComment, deleteComment
  }
}

export type UseCommentType = ReturnType<typeof useComment>
