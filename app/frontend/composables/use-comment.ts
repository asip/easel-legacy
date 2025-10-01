import { ref } from 'vue'

import type { ViewDataType } from '../composables'
import type { Comment , CommentResource, CommentsResource, ErrorsResource } from '../interfaces'
import type { ErrorMessages } from '../types'
import { useAccount, useFlash } from './'

type ErrorProperty = 'body' | 'base'
type ExternalErrorProperty = 'body'

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

  const externalErrors = ref<ErrorMessages<ErrorProperty>>({
    body: [],
    base: []
  })

  const reloading = ref(false)

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
        await setAlert(response)
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

      clearExternalErrors()

      if (!response.ok) {
        await setAlert(response)
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

      clearExternalErrors()

      if (!response.ok) {
        await setAlert(response)
      }
    } catch (error) {
      flash.value.alert = '不具合が発生しました'
      globalThis.console.log((error as Error).message)
    }
  }

  const setAlert = async (response: Response) => {
    switch(response.status){
    case 401:
      flash.value.alert = 'ログインしなおしてください'
      reloading.value = true
      break
    case 404:
      break
    case 422:
      {
        const { errors } = (await response.json()) as ErrorsResource<ErrorMessages<ExternalErrorProperty>>
        // globalThis.console.log(errors)
        setExternalErrors(errors)
      }
      break
    case 500:
      flash.value.alert = '不具合が発生しました'
      break
    default:
      flash.value.alert = '不具合が発生しました'
    }
  }

  const setExternalErrors = (errors: ErrorMessages<ExternalErrorProperty>) => {
    externalErrors.value.body = errors.body ?? []
  }

  const clearExternalErrors = () => {
    externalErrors.value.body = []
    externalErrors.value.base = []
  }

  const isSuccess = () => {
    let result = true

    if (externalErrors.value.body && externalErrors.value.body.length > 0 || 
        externalErrors.value.base && externalErrors.value.base.length > 0) {
      result = false
    }

    if (flash.value.alert) {
      result = false
    }

    return result
  }

  const reload401= () => {
    if(reloading.value) {
      globalThis.setTimeout(() => {
        globalThis.location.href = ''
      }, 1000)
    }
  }

  return {
    comment, comments, flash,
    getComments, postComment, deleteComment,
    clearExternalErrors, isSuccess,
    externalErrors, reload401
  }
}

export type UseCommentType = ReturnType<typeof useComment>
