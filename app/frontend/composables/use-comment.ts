import { Ref, ref } from 'vue'
import { storeToRefs } from 'pinia'

import type { Comment , CommentResource, CommentsResource } from '../interfaces'
import type { ErrorMessages, Flash } from '../types'
import type { UseAlertType } from './'
import { useAccount, useAlert, useConstants, useFlash } from './'
import { useCommentsStore } from '../stores'

type ErrorProperty = 'body' | 'base'
type ExternalErrorProperty = 'body'

export function useComment() {
  const { baseURL, headers } = useConstants()
  const { flash, clearFlash } = useFlash()
  const { token } = useAccount()
  const { comments } = storeToRefs(useCommentsStore())

  const UseComment = class {
    flash: Ref<Flash>
    comments: Ref<Comment[]>

    #setAlert: UseAlertType['setAlert']
    reload401: UseAlertType['reload401']

    constructor() {
      const { setAlert, reload401 } = useAlert({ flash, caller: this })

      this.flash = flash
      this.comments = comments

      this.#setAlert = setAlert
      this.reload401 = reload401
    }

    comment: Ref<Comment>  = ref({
      id: undefined,
      frame_id: null,
      body: '',
      user_id: null,
      user_name: '',
      user_image_url: '',
      created_at: '',
      updated_at: null
    })

    externalErrors = ref<ErrorMessages<ErrorProperty>>({
      body: [],
      base: []
    })

    setExternalErrors = (errors: ErrorMessages<ExternalErrorProperty>) => {
      this.externalErrors.value.body = errors.body ?? []
    }

    clearExternalErrors = () => {
      this.externalErrors.value.body = []
      this.externalErrors.value.base = []
    }

    getComments = async (frameId: string) => {
      clearFlash()
      //console.log(frameId)

      try{
        const response = await globalThis.fetch(`${baseURL}/frames/${frameId}/comments`,
          {
            method: 'GET',
            headers: headers.value
          })

        if (!response.ok) {
          await this.#setAlert({ response })
        } else {
          const commentList: [CommentResource] = (await response.json() as CommentsResource).comments
          //console.log(comment_list);
          this.comments.value.splice(0, this.comments.value.length)
          for (const comment of commentList) {
            //console.log(comment);
            this.comments.value.push(this.#createCommentFromJson(comment))
          }
        }
      //console.log(comments);
      } catch (error) {
        this.flash.value.alert = '不具合が発生しました'
        globalThis.console.log((error as Error).message)
      }
    }

    #createCommentFromJson = (resource: CommentResource): Comment => {
      const comment: Partial<Comment> = {}
      Object.assign(comment, resource)
      return comment as Comment
    }

    createComment = async (frameId: string) => {
      clearFlash()

      try {
        const params = new URLSearchParams()
        params.append('comment[body]', this.comment.value.body)
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

        this.clearExternalErrors()

        if (!response.ok) {
          await this.#setAlert({ response })
        }
      } catch (error) {
        this.flash.value.alert = '不具合が発生しました'
        globalThis.console.log((error as Error).message)
      }
    }

    #setJson2Comment = (resource: CommentResource) => {
      Object.assign(this.comment.value, resource)
    }

    setComment = ({ from, to } : { from?: Comment | undefined, to?: Comment}) => {
      if (from) {
        Object.assign(this.comment.value, from)
      } else if (to) {
        Object.assign(to, this.comment.value)
      // globalThis.console.log(comment.value)
      // globalThis.console.log(to)
      }
    }

    updateComment = async () => {
      clearFlash()

      try {
        const params = new URLSearchParams()
        params.append('comment[body]', this.comment.value.body)
        //const params = {
        //  comment: {
        //    body: comment.value.body
        //  }
        //}

        const response = await globalThis.fetch(`${baseURL}/frames/${this.comment.value.frame_id?.toString() ?? ''}/comments/${this.comment.value.id?.toString() ?? ''}`,
          {
            method: 'PUT',
            body: params,
            headers: {
              ...headers.value,
              Authorization: `Bearer ${token.value}`
            }
          }
        )

        this.clearExternalErrors()

        if (!response.ok) {
          await this.#setAlert({ response })
        } else {
          const commentAttrs: CommentResource = (await response.json() as CommentResource)
          this.#setJson2Comment(commentAttrs)
        }
      } catch (error) {
        this.flash.value.alert = '不具合が発生しました'
        globalThis.console.log((error as Error).message)
      }
    }

    deleteComment = async (comment: Comment) => {
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

        this.clearExternalErrors()

        if (!response.ok) {
          await this.#setAlert({ response })
        }
      } catch (error) {
        this.flash.value.alert = '不具合が発生しました'
        globalThis.console.log((error as Error).message)
      }
    }

    isSuccess = () => {
      let result = true

      if (this.externalErrors.value.body && this.externalErrors.value.body.length > 0 || 
        this.externalErrors.value.base && this.externalErrors.value.base.length > 0) {
        result = false
      }

      if (this.flash.value.alert) {
        result = false
      }

      return result
    }
  }

  const self = new UseComment()

  return self

}

export type UseCommentType = ReturnType<typeof useComment>
