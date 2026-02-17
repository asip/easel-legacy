import { ref } from 'vue'

import type { Comment, CommentResource } from '~/interfaces'
import type { CommentErrorProperty } from '~/types'
import { useMutationApi, useEntity, useExternalErrors, useAlert, useFlash } from '~/composables'
import { useAccountStore } from '~/stores'

import { i18n } from '~/i18n'

export function useComment() {
  const { flash, clearFlash } = useFlash()
  const { copy } = useEntity<Comment, CommentResource>()
  // const { token } = useAccount()
  const { clearCurrentUser } = useAccountStore()

  const comment = ref<Comment>({
    id: undefined,
    frame_id: null,
    body: '',
    user_id: null,
    user_name: '',
    user_image_url: '',
    created_at: '',
    updated_at: null,
  })

  const setComment = ({
    from,
    to,
  }: {
    from?: Comment | CommentResource | undefined
    to?: Comment
  }): void => {
    if (from) {
      copy({ from, to: comment.value })
    } else if (to) {
      copy({ from: comment.value, to })
      // globalThis.console.log(comment.value)
      // globalThis.console.log(to)
    }
  }

  const { externalErrors, setExternalErrors, clearExternalErrors, isSuccess } =
    useExternalErrors<CommentErrorProperty>({ flash })

  const { backendErrorInfo, setAlert, reload } = useAlert({
    flash,
    caller: { setExternalErrors, clearLoginUser: clearCurrentUser },
  })

  const set404Alert = (): void => {
    if (backendErrorInfo.value.status == 404) {
      if (backendErrorInfo.value.source == 'Frame') {
        flash.value.alert = i18n.global.t('action.error.not_found', {
          source: i18n.global.t('misc.page'),
        })
      } else if (backendErrorInfo.value.source == 'Comment') {
        flash.value.alert = i18n.global.t('action.error.not_found', {
          source: i18n.global.t('models.comment'),
        })
      }
    }
  }

  const createComment = async (frameId: string): Promise<void> => {
    clearFlash()

    try {
      const params = new FormData()
      params.append('comment[body]', comment.value.body)
      //const params = {
      //  comment: {
      //    body: comment.value.body
      //  }
      //}

      const { response } = await useMutationApi<CommentResource>({
        url: `/frames/${frameId}/comments`,
        method: 'post',
        body: params,
        // token: token.value
      })

      clearExternalErrors()

      if (response && !response.ok) {
        await setAlert({ response })
      }
    } catch (error) {
      flash.value.alert = i18n.global.t('action.error.api', { message: (error as Error).message })
      globalThis.console.log((error as Error).message)
    }
  }

  const updateComment = async (): Promise<void> => {
    clearFlash()

    try {
      const params = new FormData()
      params.append('comment[body]', comment.value.body)
      //const params = {
      //  comment: {
      //    body: comment.value.body
      //  }
      //}

      const { data, response } = await useMutationApi<CommentResource>({
        url: `/frames/${comment.value.frame_id?.toString() ?? ''}/comments/${comment.value.id?.toString() ?? ''}`,
        method: 'put',
        body: params,
        // token: token.value
      })

      clearExternalErrors()

      if (response && !response.ok) {
        await setAlert({ response })
      } else {
        const commentAttrs: CommentResource | undefined = data
        setComment({ from: commentAttrs })
      }
    } catch (error) {
      flash.value.alert = i18n.global.t('action.error.api', { message: (error as Error).message })
      globalThis.console.log((error as Error).message)
    }
  }

  const deleteComment = async (comment: Comment): Promise<void> => {
    clearFlash()

    try {
      const { response } = await useMutationApi({
        url: `/frames/${comment.frame_id?.toString() ?? ''}/comments/${comment.id?.toString(10) ?? ''}`,
        method: 'delete',
        // token: token.value
      })

      clearExternalErrors()

      if (response && !response.ok) {
        await setAlert({ response })
      }
    } catch (error) {
      flash.value.alert = i18n.global.t('action.error.api', { message: (error as Error).message })
      globalThis.console.log((error as Error).message)
    }
  }

  return {
    comment,
    flash,
    createComment,
    updateComment,
    deleteComment,
    setComment,
    clearExternalErrors,
    externalErrors,
    isSuccess,
    set404Alert,
    backendErrorInfo,
    reload,
  }
}

export type UseCommentType = ReturnType<typeof useComment>
