import { ref } from '@vue/reactivity'

import { useApi, useApiError, useEntity, useExternalErrors, useFlash } from '@vesperjs/vue'
import type { BackendErrorResource, BackendErrorsResource } from '@vesperjs/vue'

import type { Comment, CommentResource } from '@/types'
import type { CommentErrorProperty } from '@/types'

import { useAccountStore } from '@/stores'

import { i18n } from '@/i18n'

const { t } = i18n.global

export const useComment = function () {
  const { mutationApi } = useApi()

  const { flash, clearFlash } = useFlash()
  const { copy } = useEntity<Comment, CommentResource>()
  // const { token } = useAccount()
  const { clearAccount } = useAccountStore()

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

  const { externalErrors, clearExternalErrors, success } =
    useExternalErrors<CommentErrorProperty>(flash)

  const { backendErrorInfo, reload } = useApiError(flash, {
    caller: { externalErrors, clearAccount },
  })

  const set404Alert = (): void => {
    if (backendErrorInfo.value.status == 404) {
      if ((backendErrorInfo.value.error as BackendErrorResource).source == 'Frame') {
        flash.value.alert = t('backend.error.not_found', {
          source: t('misc.page'),
        })
      } else if ((backendErrorInfo.value.error as BackendErrorResource).source == 'Comment') {
        flash.value.alert = t('backend.error.not_found', {
          source: t('models.comment'),
        })
      }
    }
  }

  const createComment = async (frameId: string): Promise<void> => {
    clearFlash()

    // const params = new FormData()
    // params.append('comment[body]', comment.value.body)
    const params = {
      comment: {
        body: comment.value.body,
      },
    }

    const { error } = await mutationApi<CommentResource, BackendErrorsResource>(
      `/frames/${frameId}/comments`,
      {
        method: 'post',
        body: params,
        // token: token.value
      },
    )

    clearExternalErrors()

    if (error) backendErrorInfo.value = error
  }

  const updateComment = async (): Promise<void> => {
    clearFlash()

    // const params = new FormData()
    // params.append('comment[body]', comment.value.body)
    const params = {
      comment: {
        body: comment.value.body,
      },
    }

    const { data, error } = await mutationApi<CommentResource, BackendErrorsResource>(
      `/frames/${comment.value.frame_id?.toString() ?? ''}/comments/${comment.value.id?.toString() ?? ''}`,
      {
        method: 'put',
        body: params,
        // token: token.value
      },
    )

    clearExternalErrors()

    if (error) {
      backendErrorInfo.value = error
    } else {
      const commentAttrs: CommentResource | undefined = data
      setComment({ from: commentAttrs })
    }
  }

  const deleteComment = async (comment: Comment): Promise<void> => {
    clearFlash()

    const { error } = await mutationApi<CommentResource, BackendErrorsResource>(
      `/frames/${comment.frame_id?.toString() ?? ''}/comments/${comment.id?.toString(10) ?? ''}`,
      {
        method: 'delete',
        // token: token.value
      },
    )

    clearExternalErrors()

    if (error) backendErrorInfo.value = error
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
    success,
    set404Alert,
    backendErrorInfo,
    reload,
  }
}

export type UseCommentType = ReturnType<typeof useComment>
