import { storeToRefs } from 'pinia'

import { useQueryApi, useEntity, useApiError, useFlash } from '@vesperjs/vue'
import type { ErrorsResource, ErrorMessages } from '@vesperjs/vue'

import type { Comment, CommentResource, CommentsResource } from '~/types'
import { useCommentsStore } from '~/stores'

export const useComments = function () {
  const { flash, clearFlash } = useFlash()
  const { create } = useEntity<Comment, CommentResource>()
  // const { token } = useAccount()
  const { comments } = storeToRefs(useCommentsStore())

  const { setError } = useApiError({ flash })

  const makeComment = ({ from }: { from: CommentResource }): Comment => {
    return create({ from })
  }

  const getComments = async (frameId: string): Promise<void> => {
    clearFlash()
    // console.log(frameId)

    const { data, error } = await useQueryApi<
      CommentsResource,
      ErrorsResource<ErrorMessages<string>>
    >(`/frames/${frameId}/comments`)

    if (error) {
      setError(error)
    } else {
      const commentList: [CommentResource] | undefined = data?.comments
      // globalThis.console.log(commentList);
      comments.value.splice(0, comments.value.length)
      if (commentList) {
        for (const comment of commentList) {
          // globalThis.console.log(comment);
          comments.value.push(makeComment({ from: comment }))
        }
      }
    }
    // globalThis.console.log(comments.value);
  }

  return { comments, getComments, flash }
}
