import Axios, { AxiosError } from 'axios'
import { ref } from 'vue'

import type { User } from '../interfaces/user'
import type { Comment } from '../interfaces/comment'
import { useFlash } from './use-flash'

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
  errorMessages: string
}

export function useComment(currentUser: User) {
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
  const errorMessages = ref<string[]>([])

  const { flash, clearFlash } = useFlash()

  const getComments = async (frameId: string) => {
    clearFlash()
    //console.log(frame_id)

    try{
      const res = await Axios.get<CommentsResource>(`/frames/${frameId}/comments`)

      const commentList: [CommentResource] = res.data.comments
      //console.log(comment_list);
      comments.value.splice(0, comments.value.length)
      for (const comment of commentList) {
      //console.log(comment);
        comments.value.push(createCommentFromJson(comment))
      }
      //console.log(comments);
    } catch (error) {
      errorMessages.value.splice(0)
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

      await Axios.post<CommentResource>(`/frames/${comment.value.frame_id?.toString(10) ?? ''}/comments`,
        params,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token ?? ''}`
          }
        }
      )

      comment.value.body = ''
      errorMessages.value.splice(0)
    } catch (error) {
      errorMessages.value.splice(0)
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
      errorMessages.value.splice(0)
      errorMessages.value.push('コメントを入力してください。')
    }
  }

  const deleteComment = async (comment: Comment) => {
    clearFlash()
    try {
      await Axios.delete(
        `/comments/${comment.id?.toString(10) ?? ''}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token ?? ''}`
          }
        })
      comments.value.splice(0)
    } catch (error) {
      errorMessages.value.splice(0)
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
    comment, comments, flash, errorMessages,
    getComments, setComment, deleteComment
  }
}

export type UseCommentType = ReturnType<typeof useComment>
