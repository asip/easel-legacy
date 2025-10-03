import { ref } from 'vue'

import type { ViewDataType } from './'
import type { Comment , CommentResource } from '../interfaces'
import type { ErrorMessages } from '../types'
import { useAccount, useAlert, useFlash } from './'

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

  const externalErrors = ref<ErrorMessages<ErrorProperty>>({
    body: [],
    base: []
  })

  const { flash, clearFlash } = useFlash()

  const { baseURL, headers } = viewData
  const { token } = useAccount(viewData)

  const setExternalErrors = (errors: ErrorMessages<ExternalErrorProperty>) => {
    externalErrors.value.body = errors.body ?? []
  }

  const clearExternalErrors = () => {
    externalErrors.value.body = []
    externalErrors.value.base = []
  }

  const { setAlert, reloading401 } = useAlert({ flash, setEE: setExternalErrors })

  const createComment = async (frameId: string) => {
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
        await setAlert({ response })
      }
    } catch (error) {
      flash.value.alert = '不具合が発生しました'
      globalThis.console.log((error as Error).message)
    }
  }

  const setJson2Comment = (resource: CommentResource) => {
    Object.assign(comment.value, resource)
  }

  const setComment = ({ from, to } : { from?: Comment | undefined, to?: Comment}) => {
    if (from) {
      Object.assign(comment.value, from)
    } else if (to) {
      Object.assign(to, comment.value)
      // globalThis.console.log(comment.value)
      // globalThis.console.log(to)
    }
  }

  const updateComment = async () => {
    clearFlash()

    try {
      const params = new URLSearchParams()
      params.append('comment[body]', comment.value.body)
      //const params = {
      //  comment: {
      //    body: comment.value.body
      //  }
      //}

      const response = await globalThis.fetch(`${baseURL.value}/frames/${comment.value.frame_id?.toString() ?? ''}/comments/${comment.value.id?.toString() ?? ''}`,
        {
          method: 'PUT',
          body: params,
          headers: {
            ...headers.value,
            Authorization: `Bearer ${token.value}`
          }
        }
      )

      clearExternalErrors()

      if (!response.ok) {
        await setAlert({ response })
      } else {
        const commentAttrs: CommentResource = (await response.json() as CommentResource)
        setJson2Comment(commentAttrs)
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
        await setAlert({ response })
      }
    } catch (error) {
      flash.value.alert = '不具合が発生しました'
      globalThis.console.log((error as Error).message)
    }
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
    if(reloading401) {
      globalThis.setTimeout(() => {
        globalThis.location.href = ''
      }, 1000)
    }
  }

  return {
    comment, flash,
    createComment, updateComment, deleteComment, setComment,
    clearExternalErrors, isSuccess, externalErrors, reload401
  }
}

export type UseCommentType = ReturnType<typeof useComment>
