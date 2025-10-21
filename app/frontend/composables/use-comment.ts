import { Ref, ref } from 'vue'
import { storeToRefs } from 'pinia'

import type { Comment , CommentResource, CommentsResource } from '../interfaces'
import type { ErrorMessages } from '../types'
import { useAccount, useEntity, useAlert, useConstants, useFlash } from './'
import { useCommentsStore } from '../stores'

type ErrorProperty = 'body' | 'base'
type ExternalErrorProperty = 'body'

export function useComment() {
  const { baseURL, headers } = useConstants()
  const { flash, clearFlash } = useFlash()
  const { create, copy } = useEntity<Comment, CommentResource>()
  const { token } = useAccount()
  const { comments } = storeToRefs(useCommentsStore())

  const comment: Ref<Comment>  = ref({
    id: undefined,
    frame_id: null,
    body: '',
    user_id: null,
    user_name: '',
    user_image_url: '',
    created_at: '',
    updated_at: null
  })

  const makeComment = ({ from }: { from: CommentResource }): Comment => {
    return create({ from })
  }

  const setComment = ({ from, to } : { from?: Comment | CommentResource | undefined, to?: Comment}) => {
    if (from) {
      copy({ from, to: comment.value })
    } else if (to) {
      copy({ from: comment.value, to })
      // globalThis.console.log(comment.value)
      // globalThis.console.log(to)
    }
  }

  const externalErrors = ref<ErrorMessages<ErrorProperty>>({
    body: [],
    base: []
  })

  const setExternalErrors = (errors: ErrorMessages<ExternalErrorProperty>) => {
    externalErrors.value.body = errors.body ?? []
  }

  const clearExternalErrors = () => {
    externalErrors.value.body = []
    externalErrors.value.base = []
  }

  const { setAlert, reload401 } = useAlert({ flash, caller: { setExternalErrors } })

  const getComments = async (frameId: string) => {
    clearFlash()
    //console.log(frameId)

    try{
      const response = await globalThis.fetch(`${baseURL}/frames/${frameId}/comments`,
        {
          method: 'GET',
          headers: headers.value
        })

      if (!response.ok) {
        await setAlert({ response })
      } else {
        const commentList: [CommentResource] = (await response.json() as CommentsResource).comments
        //console.log(comment_list);
        comments.value.splice(0, comments.value.length)
        for (const comment of commentList) {
          //console.log(comment);
          comments.value.push(makeComment({ from: comment }))
        }
      }
      //console.log(comments);
    } catch (error) {
      flash.value.alert = '不具合が発生しました'
      globalThis.console.log((error as Error).message)
    }
  }

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

      const response = await globalThis.fetch(`${baseURL}/frames/${frameId}/comments`,
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

      const response = await globalThis.fetch(`${baseURL}/frames/${comment.value.frame_id?.toString() ?? ''}/comments/${comment.value.id?.toString() ?? ''}`,
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
        setComment({ from: commentAttrs })
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
        `${baseURL}/comments/${comment.id?.toString(10) ?? ''}`,
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

  return {
    comment, comments, flash, getComments,
    createComment, updateComment, deleteComment, setComment,
    clearExternalErrors, isSuccess, externalErrors, reload401
  }
}

export type UseCommentType = ReturnType<typeof useComment>
