import { ref } from 'vue'

import type { ViewDataType } from '../composables'
import type { Comment , CommentResource, CommentsResource } from '../interfaces'
import { useAccount, useFlash } from './'

export function useComment(viewData: ViewDataType) {
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

  const { baseURL, headers } = viewData
  const { token } = useAccount(viewData)

  const getComments = async (frameId: string) => {
    clearFlash()
    //console.log(frame_id)

    try{
      const response = await globalThis.fetch(`${baseURL.value}/frames/${frameId}/comments`,
        {
          method: 'GET',
          headers: headers.value
        })

      if (!response.ok) {
        setAlert(response.status)
      } else {
        const commentList: [CommentResource] = (await response.json() as CommentsResource).comments
        //console.log(comment_list);
        comments.value.splice(0, comments.value.length)
        for (const comment of commentList) {
        //console.log(comment);
          comments.value.push(createCommentFromJson(comment))
        }
      }
      //console.log(comments);
    } catch (error) {
      flash.value.alert = '不具合が発生しました'
      globalThis.console.log((error as Error).message)
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
      const params = new URLSearchParams()
      params.append('comment[body]', comment.value.body)
      //const params = {
      //  comment: {
      //    body: comment.value.body
      //  }
      //}

      const response = await globalThis.fetch(`${baseURL.value}/frames/${frameId}/comments`,
        {
          method: 'POST',
          body: params,
          headers: {
            ...headers.value,
            Authorization: `Bearer ${token.value}`
          }
        }
      )

      if (!response.ok) {
        setAlert(response.status)
      }
    } catch (error) {
      flash.value.alert = '不具合が発生しました'
      globalThis.console.log((error as Error).message)
    }
  }

  const deleteComment = async (comment: Comment) => {
    clearFlash()
    try {
      const response = await globalThis.fetch(
        `${baseURL.value}/comments/${comment.id?.toString(10) ?? ''}`,
        {
          method: 'DELETE',
          headers: {
            ...headers.value,
            Authorization: `Bearer ${token.value}`
          }
        })

      if (!response.ok) {
        setAlert(response.status)
      }
    } catch (error) {
      flash.value.alert = '不具合が発生しました'
      globalThis.console.log((error as Error).message)
    }
  }

  const setAlert = (status: number) => {
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
