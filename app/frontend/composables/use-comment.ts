import Axios, { AxiosError } from 'axios'
import { ref } from 'vue'

import type { Comment , CommentResource, CommentsResource } from '../interfaces'
import { useAccount, useFlash } from './'

export function useComment() {
  const comment = ref<Comment>({
    id: undefined,
    frame_id: null,
    body: '',
    user_id: null,
    user_name: '',
    user_image_url: '',
    created_at: '',
    updated_at: null
  })

  const comments = ref<Comment[]>([])

  const { flash, clearFlash } = useFlash()

  const { token } = useAccount()

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
      if(Axios.isAxiosError(error)){
        setAlert(error as AxiosError)
      }
    }
  }

  const createCommentFromJson = (resource: CommentResource): Comment => {
    const comment: Partial<Comment> = {}
    Object.assign(comment, resource)
    return comment as Comment
  }

  const postComment = async (frameId: string) => {
    clearFlash()

    try {
      // const params = new URLSearchParams()
      // params.append('comment[body]', comment.body)
      const params = {
        comment: {
          body: comment.value.body
        }
      }

      await Axios.post<CommentResource>(`/frames/${frameId}/comments`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token.value}`
          }
        }
      )
    } catch (error) {
      if(Axios.isAxiosError(error)){
        setAlert(error as AxiosError)
      }
    }
  }

  const deleteComment = async (comment: Comment) => {
    clearFlash()
    try {
      await Axios.delete(
        `/comments/${comment.id?.toString(10) ?? ''}`,
        {
          headers: {
            Authorization: `Bearer ${token.value}`
          }
        })
    } catch (error) {
      if(Axios.isAxiosError(error)){
        setAlert(error as AxiosError)
      }
    }
  }

  const setAlert = (error: AxiosError) => {
    const status = error.response?.status
    switch(status){
    case 401:
      flash.value.alert = 'ページをリロードし、ログインしてください'
      break
    case 500:
      flash.value.alert = '不具合が発生しました'
      break
    default:
      flash.value.alert = '不具合が発生しました'
    }
  }

  return {
    comment, comments, flash,
    getComments, postComment, deleteComment
  }
}

export type UseCommentType = ReturnType<typeof useComment>
